<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/private/bootstrap.php';

$errorMessage = '';
$loginSucceeded = isset($_GET['id']) && $_GET['id'] === '1';
$username = '';
$statusCode = 200;

try {
    sc_start_session();

    if (isset($_GET['accesscheck'])) {
        $_SESSION['sc_previous_url'] = sc_safe_local_redirect($_GET['accesscheck'], 'spese.php');
    }

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        $username = isset($_POST['username']) && is_string($_POST['username']) ? trim($_POST['username']) : '';
        $password = isset($_POST['password']) && is_string($_POST['password']) ? $_POST['password'] : '';

        if (!sc_verify_csrf(isset($_POST['csrf_token']) && is_string($_POST['csrf_token']) ? $_POST['csrf_token'] : null)) {
            $statusCode = 403;
            $errorMessage = 'La sessione del modulo è scaduta. Aggiorna la pagina e riprova.';
        } elseif ($username === '' || $password === '' || strlen($username) > 190 || strlen($password) > 1024) {
            $statusCode = 422;
            $errorMessage = 'Credenziali non valide.';
        } else {
            $rate = sc_consume_rate_limit('login', 5, 900);
            if ($rate === null) {
                throw new RuntimeException('Login rate-limit storage is unavailable.');
            }
            if (!$rate['allowed']) {
                $statusCode = 429;
                $errorMessage = 'Troppi tentativi. Attendi qualche minuto e riprova.';
            } else {
                $statement = sc_db()->prepare('SELECT username, password FROM utenti WHERE username = :username LIMIT 1');
                $statement->execute(['username' => $username]);
                $user = $statement->fetch();
                $storedPassword = is_array($user) && isset($user['password']) ? (string) $user['password'] : '';
                $passwordValid = $storedPassword !== '' && password_verify($password, $storedPassword);

                if ($passwordValid && is_array($user)) {
                    session_regenerate_id(true);
                    $_SESSION['sc_csrf_token'] = bin2hex(random_bytes(32));
                    $_SESSION['MM_Username'] = (string) $user['username'];
                    $_SESSION['MM_UserGroup'] = '';
                    $redirect = $_SESSION['sc_previous_url'] ?? 'login.php?id=1';
                    unset($_SESSION['sc_previous_url']);
                    sc_redirect(sc_safe_local_redirect($redirect, 'login.php?id=1'));
                }

                $statusCode = 401;
                $errorMessage = 'Credenziali non valide.';
            }
        }
    } elseif (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        $statusCode = 405;
        $errorMessage = 'Metodo non consentito.';
    }

    $csrfToken = sc_csrf_token();
} catch (Throwable $error) {
    error_log('Private login page failed: ' . get_class($error));
    $statusCode = 503;
    $errorMessage = 'Servizio temporaneamente non disponibile.';
    $csrfToken = '';
}

http_response_code($statusCode);
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Accesso area privata</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; color: #172033; background: #f7f8fa; }
    body { margin: 0; padding: 2rem 1rem; }
    main { max-width: 28rem; margin: 4rem auto; padding: 2rem; border: 1px solid #dce3ec; border-radius: 1rem; background: #fff; }
    form { display: grid; gap: 1rem; }
    label { display: grid; gap: .4rem; font-weight: 600; }
    input { min-height: 2.8rem; padding: .5rem .75rem; border: 1px solid #dce3ec; border-radius: .5rem; font: inherit; }
    button { min-height: 2.8rem; border: 0; border-radius: .5rem; background: #2563eb; color: #fff; font: inherit; font-weight: 700; cursor: pointer; }
    .notice { padding: .75rem; border-radius: .5rem; background: #eff6ff; }
    .error { color: #b42318; }
  </style>
</head>
<body>
<main>
  <h1>Accesso area privata</h1>
  <?php if ($loginSucceeded): ?><p class="notice" role="status">Accesso eseguito correttamente.</p><?php endif; ?>
  <?php if ($errorMessage !== ''): ?><p class="error" role="alert"><?= sc_escape($errorMessage) ?></p><?php endif; ?>
  <form method="post" action="login.php" autocomplete="on">
    <input type="hidden" name="csrf_token" value="<?= sc_escape($csrfToken) ?>">
    <label for="username">Username
      <input id="username" name="username" type="text" autocomplete="username" maxlength="190" required value="<?= sc_escape($username) ?>">
    </label>
    <label for="password">Password
      <input id="password" name="password" type="password" autocomplete="current-password" maxlength="1024" required>
    </label>
    <button type="submit">Accedi</button>
  </form>
</main>
</body>
</html>
