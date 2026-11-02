<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/private/bootstrap.php';

function contact_error(int $status, string $code, array $headers = []): void
{
    sc_json_response($status, ['ok' => false, 'code' => $code], $headers);
}

function contact_success(): void
{
    sc_json_response(200, ['ok' => true, 'code' => 'sent']);
}

try {
    $config = sc_config();
    sc_start_session();

    $method = $_SERVER['REQUEST_METHOD'] ?? 'GET';
    if ($method === 'GET') {
        $startedAt = $_SESSION['sc_contact_started_at'] ?? 0;
        if (!is_int($startedAt) || $startedAt < time() - 7200) {
            unset($_SESSION['sc_csrf_token']);
            $_SESSION['sc_contact_started_at'] = time();
        }

        sc_json_response(200, ['csrfToken' => sc_csrf_token()]);
    }

    if ($method !== 'POST') {
        contact_error(405, 'method_not_allowed', ['Allow' => 'GET, POST']);
    }

    if (!sc_origin_is_allowed()) {
        contact_error(403, 'origin_rejected');
    }

    $csrfToken = $_SERVER['HTTP_X_CSRF_TOKEN'] ?? null;
    if (!is_string($csrfToken) || !sc_verify_csrf($csrfToken)) {
        contact_error(403, 'csrf_invalid');
    }

    $startedAt = $_SESSION['sc_contact_started_at'] ?? 0;
    if (!is_int($startedAt) || $startedAt <= 0 || time() - $startedAt > 7200) {
        unset($_SESSION['sc_csrf_token'], $_SESSION['sc_contact_started_at']);
        contact_error(419, 'csrf_expired');
    }

    $contentType = strtolower((string) ($_SERVER['CONTENT_TYPE'] ?? ''));
    if (strpos($contentType, 'application/json') !== 0) {
        contact_error(415, 'unsupported_media_type');
    }

    $contentLength = (int) ($_SERVER['CONTENT_LENGTH'] ?? 0);
    if ($contentLength > 14000) {
        contact_error(413, 'request_too_large');
    }

    $rate = sc_consume_rate_limit('contact', 5, 900);
    if ($rate === null) {
        error_log('Contact form rate-limit storage is unavailable.');
        contact_error(503, 'service_unavailable');
    }
    if (!$rate['allowed']) {
        contact_error(429, 'rate_limited', ['Retry-After' => (string) $rate['retry_after']]);
    }

    $payload = json_decode((string) file_get_contents('php://input'), true);
    if (!is_array($payload)) {
        contact_error(400, 'invalid_json');
    }

    $name = isset($payload['name']) && is_string($payload['name']) ? trim($payload['name']) : '';
    $email = isset($payload['email']) && is_string($payload['email']) ? trim($payload['email']) : '';
    $message = isset($payload['message']) && is_string($payload['message']) ? trim($payload['message']) : '';
    $honeypot = isset($payload['website']) && is_string($payload['website']) ? trim($payload['website']) : '';

    // Return a plausible success to simple bots without sending their message.
    if ($honeypot !== '' || time() - $startedAt < 3) {
        contact_success();
    }

    $nameLength = preg_match_all('/./us', $name);
    $messageLength = preg_match_all('/./us', $message);
    if ($nameLength === false || $messageLength === false) {
        contact_error(422, 'invalid_fields');
    }
    if ($nameLength > 100 || strlen($email) > 254 || $messageLength > 10000) {
        contact_error(422, 'invalid_fields');
    }
    if ($email === '' || filter_var($email, FILTER_VALIDATE_EMAIL) === false || $message === '') {
        contact_error(422, 'invalid_fields');
    }

    $words = preg_split('/\s+/u', $message, -1, PREG_SPLIT_NO_EMPTY);
    if ($words === false) {
        contact_error(422, 'invalid_fields');
    }
    if (count($words) > 500) {
        contact_error(422, 'word_limit');
    }

    $emailConfig = $config['email'] ?? [];
    $recipient = $emailConfig['to'] ?? '';
    $sender = $emailConfig['from'] ?? '';
    if (!is_string($recipient) || filter_var($recipient, FILTER_VALIDATE_EMAIL) === false
        || !is_string($sender) || filter_var($sender, FILTER_VALIDATE_EMAIL) === false) {
        error_log('Contact form mail configuration is invalid.');
        contact_error(503, 'service_unavailable');
    }

    $subject = 'Portfolio contact request';
    $body = "Name: " . ($name !== '' ? $name : '(not provided)')
        . "\nEmail: " . $email
        . "\n\nMessage:\n" . $message;
    $headers = [
        'From: Portfolio contact <' . $sender . '>',
        'Reply-To: ' . $email,
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
    ];

    if (!mail($recipient, $subject, $body, implode("\r\n", $headers))) {
        error_log('The hosting mail transport rejected a portfolio contact message.');
        contact_error(503, 'mail_failed');
    }

    unset($_SESSION['sc_csrf_token'], $_SESSION['sc_contact_started_at']);
    contact_success();
} catch (Throwable $error) {
    error_log('Contact endpoint failed: ' . get_class($error));
    contact_error(503, 'service_unavailable');
}
