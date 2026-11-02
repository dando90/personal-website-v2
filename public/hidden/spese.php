<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/private/bootstrap.php';

try {
    sc_start_session();
    if (empty($_SESSION['MM_Username'])) {
        sc_redirect('login.php?accesscheck=' . rawurlencode('spese.php'));
    }

    $connection = sc_db();
    $errorMessage = '';
    $statusCode = 200;

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') === 'POST') {
        $token = isset($_POST['csrf_token']) && is_string($_POST['csrf_token']) ? $_POST['csrf_token'] : null;
        if (!sc_verify_csrf($token)) {
            $statusCode = 403;
            $errorMessage = 'Sessione scaduta. Aggiorna la pagina e riprova.';
        } else {
            $action = isset($_POST['action']) && is_string($_POST['action']) ? $_POST['action'] : '';
            if ($action === 'delete') {
                $id = filter_var($_POST['id'] ?? null, FILTER_VALIDATE_INT, ['options' => ['min_range' => 1]]);
                if ($id === false) {
                    $statusCode = 422;
                    $errorMessage = 'Identificativo della spesa non valido.';
                } else {
                    $statement = $connection->prepare('DELETE FROM spese WHERE id = :id');
                    $statement->execute(['id' => $id]);
                    sc_redirect('spese.php');
                }
            } elseif ($action === 'insert') {
                $name = isset($_POST['spesa']) && is_string($_POST['spesa']) ? trim($_POST['spesa']) : '';
                $dateText = isset($_POST['data']) && is_string($_POST['data']) ? trim($_POST['data']) : '';
                $amountText = isset($_POST['importo']) && is_string($_POST['importo']) ? trim($_POST['importo']) : '';
                $type = filter_var($_POST['tipo'] ?? null, FILTER_VALIDATE_INT);
                $date = DateTimeImmutable::createFromFormat('!d/m/Y', $dateText, new DateTimeZone('Europe/Rome'));
                $dateErrors = DateTimeImmutable::getLastErrors();
                $dateValid = $date !== false
                    && ($dateErrors === false || ($dateErrors['warning_count'] === 0 && $dateErrors['error_count'] === 0))
                    && $date->format('d/m/Y') === $dateText;
                $amountNormalized = str_replace(',', '.', $amountText);
                $amountValid = preg_match('/^-?(?:0|[1-9][0-9]{0,8})(?:\.[0-9]{1,2})?$/', $amountNormalized) === 1;
                $nameLength = preg_match_all('/./us', $name);

                if ($name === '' || $nameLength === false || $nameLength > 255 || !$dateValid
                    || !$amountValid || !in_array($type, [0, 1], true)) {
                    $statusCode = 422;
                    $errorMessage = 'Controlla data, descrizione, importo e tipo della spesa.';
                } else {
                    $statement = $connection->prepare(
                        'INSERT INTO spese (nome, tipo, `data`, valore) VALUES (:nome, :tipo, :data, :valore)'
                    );
                    $statement->execute([
                        'nome' => $name,
                        'tipo' => $type,
                        'data' => $date->getTimestamp(),
                        'valore' => $amountNormalized,
                    ]);
                    sc_redirect('spese.php');
                }
            } else {
                $statusCode = 400;
                $errorMessage = 'Operazione non valida.';
            }
        }
    } elseif (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        $statusCode = 405;
        $errorMessage = 'Metodo non consentito.';
    }

    $csrfToken = sc_csrf_token();
    $rows = $connection->query('SELECT id, nome, tipo, `data`, valore FROM spese ORDER BY `data` ASC')->fetchAll();
    $total = 170.25 - 292.5 - 80 - 22;
} catch (Throwable $error) {
    error_log('Private expenses page failed: ' . get_class($error));
    http_response_code(503);
    ?>
    <!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Spese non disponibili</title><body><main><h1>Spese</h1><p>Servizio temporaneamente non disponibile.</p></main></body></html>
    <?php
    exit;
}

http_response_code($statusCode);
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Spese di Stefano</title>
  <style>
    :root { color-scheme: light; font-family: Arial, sans-serif; color: #172033; background: #f7f8fa; }
    body { margin: 0; padding: 2rem 1rem; }
    main { max-width: 58rem; margin: 2rem auto; padding: 1.5rem; border: 1px solid #dce3ec; border-radius: 1rem; background: #fff; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0 2rem; }
    th, td { padding: .7rem; border-bottom: 1px solid #dce3ec; text-align: left; }
    .sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    .number { text-align: right; white-space: nowrap; }
    form.entry { display: flex; flex-wrap: wrap; align-items: end; gap: 1rem; }
    label { display: grid; gap: .35rem; font-weight: 600; }
    input, select, button { min-height: 2.6rem; padding: .45rem .65rem; border: 1px solid #dce3ec; border-radius: .45rem; font: inherit; }
    button { background: #2563eb; color: #fff; border: 0; font-weight: 700; cursor: pointer; }
    .delete-button { min-height: auto; padding: .3rem .6rem; background: #fff; color: #b42318; border: 1px solid #dce3ec; }
    .error { color: #b42318; }
  </style>
</head>
<body>
<main>
  <h1>Spese</h1>
  <p>(“+” = soldi dati a Ste, “−” = spese)</p>
  <?php if ($errorMessage !== ''): ?><p class="error" role="alert"><?= sc_escape($errorMessage) ?></p><?php endif; ?>
  <div class="table-wrap">
    <table>
      <thead><tr><th>Data</th><th>Spesa</th><th class="number">Importo</th><th><span class="sr-only">Azioni</span></th></tr></thead>
      <tbody>
      <?php foreach ($rows as $row): ?>
        <?php $amount = (float) $row['valore']; $total += $amount; ?>
        <tr>
          <td><?= sc_escape(date('d-m-Y', (int) $row['data'])) ?></td>
          <td><?= sc_escape($row['nome']) ?></td>
          <td class="number"><?= sc_escape(number_format($amount, 2, ',', '.')) ?> €</td>
          <td>
            <form method="post" action="spese.php">
              <input type="hidden" name="csrf_token" value="<?= sc_escape($csrfToken) ?>">
              <input type="hidden" name="action" value="delete">
              <input type="hidden" name="id" value="<?= sc_escape($row['id']) ?>">
              <button class="delete-button" type="submit" aria-label="Elimina <?= sc_escape($row['nome']) ?>">Elimina</button>
            </form>
          </td>
        </tr>
      <?php endforeach; ?>
      </tbody>
      <tfoot><tr><th colspan="2">Totale</th><th class="number"><?= sc_escape(number_format($total, 2, ',', '.')) ?> €</th><td></td></tr></tfoot>
    </table>
  </div>
  <h2>Inserisci nuova spesa</h2>
  <form class="entry" method="post" action="spese.php">
    <input type="hidden" name="csrf_token" value="<?= sc_escape($csrfToken) ?>">
    <input type="hidden" name="action" value="insert">
    <label for="data">Data (gg/mm/aaaa)
      <input id="data" name="data" type="text" inputmode="numeric" placeholder="gg/mm/aaaa" value="<?= sc_escape(date('d/m/Y')) ?>" required>
    </label>
    <label for="spesa">Spesa
      <input id="spesa" name="spesa" type="text" maxlength="255" required>
    </label>
    <label for="importo">Importo
      <input id="importo" name="importo" type="text" inputmode="decimal" placeholder="-12,50" required>
    </label>
    <label for="tipo">Tipo
      <select id="tipo" name="tipo">
        <option value="1">di Stefano</option>
        <option value="0" selected>di casa</option>
      </select>
    </label>
    <button type="submit">Invia</button>
  </form>
</main>
</body>
</html>
