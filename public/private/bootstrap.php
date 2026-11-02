<?php
declare(strict_types=1);

date_default_timezone_set('Europe/Rome');

function sc_config(): array
{
    static $config = null;
    if ($config !== null) {
        return $config;
    }

    $serverConfigPath = __DIR__ . '/config.php';
    $localConfigPath = dirname(__DIR__, 2) . '/private/config.php';
    $configPath = is_file($serverConfigPath) ? $serverConfigPath : $localConfigPath;
    if (!is_file($configPath) || !is_readable($configPath)) {
        throw new RuntimeException('Private application configuration is unavailable.');
    }

    $loaded = require $configPath;
    if (!is_array($loaded)) {
        throw new RuntimeException('Private application configuration is invalid.');
    }
    $rateLimitSalt = $loaded['rate_limit']['salt'] ?? '';
    if (!is_string($rateLimitSalt) || strlen($rateLimitSalt) < 32 || strpos($rateLimitSalt, 'REPLACE_') === 0) {
        throw new RuntimeException('A private rate-limit salt must be configured.');
    }

    $config = $loaded;
    return $config;
}

function sc_db(): PDO
{
    static $connection = null;
    if ($connection instanceof PDO) {
        return $connection;
    }

    $database = sc_config()['database'] ?? null;
    if (!is_array($database) || empty($database['dsn']) || !isset($database['username'], $database['password'])) {
        throw new RuntimeException('Database configuration is incomplete.');
    }

    $connection = new PDO(
        (string) $database['dsn'],
        (string) $database['username'],
        (string) $database['password'],
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES => false,
        ]
    );

    return $connection;
}

function sc_start_session(): void
{
    if (session_status() === PHP_SESSION_ACTIVE) {
        return;
    }

    $session = sc_config()['session'] ?? [];
    $secure = isset($session['secure_cookie'])
        ? (bool) $session['secure_cookie']
        : (!empty($_SERVER['HTTPS']) && strtolower((string) $_SERVER['HTTPS']) !== 'off');

    ini_set('session.use_only_cookies', '1');
    ini_set('session.use_strict_mode', '1');
    session_name('SC_PORTFOLIO');
    session_set_cookie_params([
        'lifetime' => 0,
        'path' => '/',
        'secure' => $secure,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
    session_start();
}

function sc_csrf_token(): string
{
    if (empty($_SESSION['sc_csrf_token']) || !is_string($_SESSION['sc_csrf_token'])) {
        $_SESSION['sc_csrf_token'] = bin2hex(random_bytes(32));
    }

    return $_SESSION['sc_csrf_token'];
}

function sc_verify_csrf(?string $provided): bool
{
    $expected = $_SESSION['sc_csrf_token'] ?? '';
    return is_string($provided)
        && is_string($expected)
        && $expected !== ''
        && hash_equals($expected, $provided);
}

function sc_origin_is_allowed(): bool
{
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    $allowedOrigins = sc_config()['allowed_origins'] ?? [];
    if (!is_string($origin) || !is_array($allowedOrigins)) {
        return false;
    }

    foreach ($allowedOrigins as $allowedOrigin) {
        if (is_string($allowedOrigin) && hash_equals(rtrim($allowedOrigin, '/'), rtrim($origin, '/'))) {
            return true;
        }
    }

    return false;
}

function sc_json_response(int $status, array $payload, array $headers = []): void
{
    http_response_code($status);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store, private');
    header('X-Content-Type-Options: nosniff');
    foreach ($headers as $name => $value) {
        header($name . ': ' . $value);
    }
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function sc_escape($value): string
{
    return htmlspecialchars((string) $value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
}

/**
 * Adds a request to an IP-keyed rolling-window limit. Returns null if storage is unavailable.
 * The caller supplies a scope so login and contact submissions have separate counters.
 */
function sc_consume_rate_limit(string $scope, int $limit, int $windowSeconds): ?array
{
    $rateConfig = sc_config()['rate_limit'] ?? [];
    $directory = $rateConfig['directory'] ?? '';
    $secret = $rateConfig['salt'] ?? '';
    if (!is_string($directory) || $directory === '' || !is_string($secret) || strlen($secret) < 32) {
        return null;
    }

    if (!is_dir($directory) && !@mkdir($directory, 0700, true) && !is_dir($directory)) {
        return null;
    }

    $ip = $_SERVER['REMOTE_ADDR'] ?? '';
    if (!is_string($ip) || filter_var($ip, FILTER_VALIDATE_IP) === false) {
        return null;
    }

    $key = hash_hmac('sha256', $scope . '|' . $ip, $secret);
    $path = rtrim($directory, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR . 'rate-limits.json';
    $handle = @fopen($path, 'c+');
    if ($handle === false) {
        return null;
    }

    try {
        if (!flock($handle, LOCK_EX)) {
            return null;
        }

        $contents = stream_get_contents($handle);
        $records = [];
        if (is_string($contents) && trim($contents) !== '') {
            $decoded = json_decode($contents, true);
            if (!is_array($decoded)) {
                return null;
            }
            $records = $decoded;
        }

        $now = time();
        foreach ($records as $recordKey => $timestamps) {
            if (!is_array($timestamps)) {
                unset($records[$recordKey]);
                continue;
            }
            $records[$recordKey] = array_values(array_filter(
                $timestamps,
                static fn ($timestamp): bool => is_int($timestamp) && $timestamp > $now - $windowSeconds
            ));
            if ($records[$recordKey] === []) {
                unset($records[$recordKey]);
            }
        }

        $timestamps = $records[$key] ?? [];
        if (count($timestamps) >= $limit) {
            $retryAfter = max(1, $windowSeconds - ($now - min($timestamps)));
            $serialized = json_encode($records, JSON_UNESCAPED_SLASHES);
            rewind($handle);
            ftruncate($handle, 0);
            fwrite($handle, $serialized === false ? '{}' : $serialized);
            fflush($handle);
            @chmod($path, 0600);
            return ['allowed' => false, 'retry_after' => $retryAfter];
        }

        $timestamps[] = $now;
        $records[$key] = $timestamps;
        $serialized = json_encode($records, JSON_UNESCAPED_SLASHES);
        if ($serialized === false) {
            return null;
        }

        rewind($handle);
        ftruncate($handle, 0);
        if (fwrite($handle, $serialized) === false || !fflush($handle)) {
            return null;
        }
        @chmod($path, 0600);
        return ['allowed' => true, 'retry_after' => 0];
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
}

function sc_redirect(string $location, int $status = 303): void
{
    header('Location: ' . $location, true, $status);
    exit;
}

function sc_safe_local_redirect($candidate, string $fallback): string
{
    if (!is_string($candidate) || $candidate === '' || strpbrk($candidate, "\r\n\\") !== false) {
        return $fallback;
    }

    $parts = parse_url($candidate);
    if ($parts === false || isset($parts['scheme']) || isset($parts['host']) || isset($parts['user']) || isset($parts['pass'])) {
        return $fallback;
    }
    if (isset($parts['path']) && strpos((string) $parts['path'], '..') !== false) {
        return $fallback;
    }
    if (substr($candidate, 0, 2) === '//') {
        return $fallback;
    }

    return $candidate;
}
