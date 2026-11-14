<?php
declare(strict_types=1);

require_once dirname(__DIR__) . '/private/bootstrap.php';

function eye_json_response(int $status, array $payload): void
{
    sc_json_response($status, $payload);
}

try {
    sc_start_session();
    header('Cache-Control: private, no-store');
    header('X-Content-Type-Options: nosniff');
    if (empty($_SESSION['MM_Username'])) {
        $accessCheck = 'analisi-host-ia.php';
        if (($_GET['ajax'] ?? '') === 'detail') {
            eye_json_response(401, ['error' => 'Sessione non autenticata.']);
        }
        sc_redirect('login.php?accesscheck=' . rawurlencode($accessCheck));
    }

    if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'GET') {
        eye_json_response(405, ['error' => 'Metodo non consentito.']);
    }

    $connection = sc_db();
    if (($_GET['ajax'] ?? '') === 'detail') {
        $hostId = $_GET['id'] ?? '';
        if (!is_string($hostId) || preg_match('/^[0-9]{1,20}$/D', $hostId) !== 1) {
            eye_json_response(422, ['error' => 'ID host non valido.']);
        }

        $fetchTable = static function (PDO $connection, string $table, string $column, string $id): ?array {
            $statement = $connection->prepare("SELECT * FROM `{$table}` WHERE `{$column}` = :id LIMIT 1");
            $statement->execute(['id' => $id]);
            $row = $statement->fetch();
            if (!is_array($row)) {
                return null;
            }
            unset($row['raw_json']);
            return $row;
        };

        $host = $fetchTable($connection, 'eye_site_hosts', 'id', $hostId);
        $detail = $fetchTable($connection, 'eye_site_host_details', 'host_id', $hostId);
        $analysis = $fetchTable($connection, 'eye_site_host_ai_analyses', 'host_id', $hostId);
        if ($host === null || $analysis === null) {
            eye_json_response(404, ['error' => 'Host o analisi IA non trovati.']);
        }
        eye_json_response(200, ['synthetic' => $host, 'detail' => $detail, 'analysis' => $analysis]);
    }

    $query = <<<'SQL'
SELECT
    h.id,
    h.fullname,
    h.company,
    h.country,
    h.city,
    h.is_favorite,
    COALESCE(NULLIF(d.email, ''), NULLIF(h.email, '')) AS email,
    d.phone,
    d.address,
    d.zipcode,
    d.website,
    a.software_project_score,
    a.ai_llm_score,
    a.mentoring_score,
    a.technology_score,
    a.contribution_score,
    a.networking_score,
    a.strengths_json,
    a.weaknesses_json,
    a.learning_potential,
    a.rationale,
    a.confidence,
    a.analyzed_at,
    a.prompt_version,
    a.model_id
FROM eye_site_hosts AS h
INNER JOIN eye_site_host_ai_analyses AS a ON a.host_id = h.id
LEFT JOIN eye_site_host_details AS d ON d.host_id = h.id
ORDER BY h.id ASC
SQL;
    $rows = $connection->query($query)->fetchAll();
    foreach ($rows as &$row) {
        foreach (['strengths_json' => 'strengths', 'weaknesses_json' => 'weaknesses'] as $source => $target) {
            $decoded = json_decode((string) ($row[$source] ?? ''), true);
            $row[$target] = is_array($decoded) ? $decoded : [];
            unset($row[$source]);
        }
        $row['is_favorite'] = (bool) ($row['is_favorite'] ?? false);
    }
    unset($row);
} catch (Throwable $error) {
    error_log('Private host AI page failed: ' . get_class($error));
    if (($_GET['ajax'] ?? '') === 'detail') {
        eye_json_response(503, ['error' => 'Dettaglio host temporaneamente non disponibile.']);
    }
    http_response_code(503);
    ?>
    <!doctype html><html lang="it"><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Analisi host non disponibili</title><body><main><h1>Analisi host IA</h1><p>Dati temporaneamente non disponibili. Verifica che lo snapshot ErasmusEye sia stato importato nel database.</p></main></body></html>
    <?php
    exit;
}

$safeRows = json_encode(
    $rows,
    JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
);
if (!is_string($safeRows)) {
    $safeRows = '[]';
}
$hostCount = count($rows);
?>
<!doctype html>
<html lang="it">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow, noarchive">
  <title>Analisi host IA · ErasmusEye</title>
  <style>
    :root { color-scheme: light; font: 16px/1.5 system-ui, sans-serif; color: #132b2a; background: #f3f7f5; }
    * { box-sizing: border-box; }
    body { margin: 0; min-width: 0; }
    header { padding: 1.6rem max(1rem, calc((100vw - 1500px) / 2)); color: #fff; background: #103d35; }
    header h1 { margin: 0; font-size: clamp(1.35rem, 5vw, 1.7rem); overflow-wrap: anywhere; }
    header p { margin: .35rem 0 0; color: #d8e9e4; }
    main { width: min(1500px, calc(100% - 2rem)); min-width: 0; margin: 1.5rem auto 4rem; }
    .panel, .stat { border: 1px solid #d9e4df; border-radius: .85rem; background: #fff; }
    .stat { display: inline-flex; gap: .55rem; align-items: baseline; padding: .8rem 1rem; margin: 0 .5rem .8rem 0; }
    .stat strong { font-size: 1.25rem; }
    .controls { min-width: 0; padding: 1rem; margin-bottom: 1rem; }
    .filters, .weights { display: flex; flex-wrap: wrap; gap: .75rem; align-items: end; }
    .weights { margin-top: 1rem; padding-top: 1rem; border-top: 1px solid #e5ece8; }
    label { display: grid; min-width: 0; gap: .25rem; color: #425753; font-size: .85rem; }
    input, select, button { max-width: 100%; min-height: 2.6rem; padding: .45rem .65rem; border: 1px solid #cbd9d3; border-radius: .45rem; color: inherit; font: inherit; background: #fff; }
    input[type="search"] { width: min(18rem, 80vw); min-width: 0; }
    input[type="number"] { width: 5.5rem; }
    input[type="checkbox"] { min-height: auto; }
    label.checkbox { display: flex; align-items: center; min-height: 2.6rem; }
    button { cursor: pointer; }
    button:hover { background: #eef6f2; }
    button:disabled { cursor: not-allowed; opacity: .55; }
    :focus-visible { outline: 3px solid #13866f; outline-offset: 2px; }
    .weights-status { min-height: 1.5rem; color: #425753; }
    .weights-status.invalid { color: #b42318; font-weight: 650; }
    .table-wrap { overflow-x: auto; }
    table { width: 100%; border-collapse: collapse; }
    th, td { padding: .7rem .8rem; border-bottom: 1px solid #e5ece8; vertical-align: top; text-align: left; }
    th { color: #516761; font-size: .78rem; font-weight: 700; text-transform: uppercase; }
    td.score, th.score { text-align: right; white-space: nowrap; }
    td.contact { min-width: 12rem; overflow-wrap: anywhere; }
    .company { display: block; color: #657a73; font-size: .9rem; }
    .city { white-space: nowrap; }
    .favorite { color: #b77900; font-size: 1.1rem; }
    .row-actions { white-space: nowrap; }
    .detail-row > td { padding: 0; background: #f7faf8; }
    .detail-panel { min-width: 0; padding: 1rem; }
    .detail-panel h3 { margin: 0 0 .6rem; }
    .detail-tabs { display: flex; flex-wrap: wrap; gap: .5rem; margin: 0 0 1rem; }
    .detail-tab[aria-selected="true"] { color: #fff; border-color: #103d35; background: #103d35; }
    .detail-section { min-width: 0; padding: .9rem; border: 1px solid #dce7e2; border-radius: .6rem; background: #fff; }
    .detail-section h4 { margin: 0 0 .75rem; }
    dl { display: grid; grid-template-columns: minmax(8rem, 35%) minmax(0, 1fr); gap: .45rem .75rem; margin: 0; }
    dt { color: #60756e; font-size: .86rem; overflow-wrap: anywhere; }
    dd { min-width: 0; margin: 0; white-space: pre-wrap; overflow-wrap: anywhere; }
    dd a { overflow-wrap: anywhere; }
    .host-cards { display: none; }
    .host-card { min-width: 0; padding: 1rem; border: 1px solid #d9e4df; border-radius: .75rem; background: #fff; }
    .host-card + .host-card { margin-top: .75rem; }
    .host-card-top { display: flex; align-items: start; justify-content: space-between; gap: .75rem; }
    .host-card-name { min-width: 0; overflow-wrap: anywhere; }
    .host-card-score { flex: 0 0 auto; color: #103d35; font-size: 1.2rem; font-weight: 750; }
    .host-card-meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; margin: .85rem 0; }
    .host-card-meta > div { min-width: 0; overflow-wrap: anywhere; }
    .host-card-label { display: block; color: #60756e; font-size: .78rem; }
    .host-card .company { overflow-wrap: anywhere; }
    .host-card button { width: 100%; }
    .pagination { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .75rem; padding: .9rem 1rem; }
    .pagination-controls { display: flex; gap: .5rem; }
    .empty { padding: 2rem; text-align: center; color: #60756e; }
    .error { color: #b42318; }
    a { color: #087a66; }
    @media (max-width: 700px) {
      header { padding: 1.2rem 1rem; }
      main { width: min(100% - 1rem, 1500px); margin-top: 1rem; }
      .stats { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .5rem; }
      .stat { min-width: 0; gap: .35rem; margin: 0; padding: .65rem; }
      .stat strong { overflow-wrap: anywhere; }
      .controls { padding: .75rem; }
      .filters { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; }
      .filters label:first-child { grid-column: 1 / -1; }
      .filters input, .filters select { width: 100%; }
      .filters .checkbox { grid-column: 1 / -1; }
      .weights { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .65rem; }
      input[type="number"] { width: 100%; }
      .weights-status { grid-column: 1 / -1; }
      .table-wrap { display: none; }
      .host-cards { display: block; padding: .65rem; }
      .detail-panel { padding: .85rem 0 0; }
      .detail-tab { flex: 1 1 8rem; }
      dl { grid-template-columns: minmax(0, 1fr); gap: .1rem; }
      dd { margin-bottom: .55rem; }
      .pagination { padding: .75rem; }
      .pagination > span { flex: 1 1 100%; }
      .pagination-controls { width: 100%; }
      .pagination-controls button { flex: 1; }
    }
  </style>
</head>
<body>
<header>
  <h1>ErasmusEye · Analisi host IA</h1>
  <p>Classifica basata sulle analisi IA importate nel database · <?= sc_escape($hostCount) ?> host</p>
</header>
<main>
  <section class="stats" aria-label="Riepilogo">
    <div class="stat"><span>Host con analisi IA</span><strong><?= sc_escape($hostCount) ?></strong></div>
    <div class="stat"><span>Risultati mostrati</span><strong id="visible-count">0</strong></div>
  </section>

  <section class="panel controls" aria-label="Filtri e pesi">
    <div class="filters">
      <label>Ricerca
        <input id="search" type="search" placeholder="Nome, azienda, email o ID">
      </label>
      <label>Paese
        <select id="country"><option value="">Tutti i paesi</option></select>
      </label>
      <label>Città
        <select id="city"><option value="">Tutte le città</option></select>
      </label>
      <label class="checkbox"><input id="favorites" type="checkbox"> Solo preferiti</label>
    </div>
    <div class="weights" aria-label="Pesi dei criteri">
      <label>Software / progetti (%)<input type="number" min="0" max="100" step="1" data-weight="software_project_score" value="25"></label>
      <label>AI / LLM (%)<input type="number" min="0" max="100" step="1" data-weight="ai_llm_score" value="20"></label>
      <label>Mentoring (%)<input type="number" min="0" max="100" step="1" data-weight="mentoring_score" value="25"></label>
      <label>Tecnologie (%)<input type="number" min="0" max="100" step="1" data-weight="technology_score" value="10"></label>
      <label>Contributo pratico (%)<input type="number" min="0" max="100" step="1" data-weight="contribution_score" value="15"></label>
      <label>Networking (%)<input type="number" min="0" max="100" step="1" data-weight="networking_score" value="5"></label>
      <div id="weights-status" class="weights-status" role="status">Totale pesi: 100%</div>
    </div>
  </section>

  <section class="panel">
    <div id="host-cards" class="host-cards" aria-label="Elenco host"><p class="empty">Caricamento…</p></div>
    <div class="table-wrap">
      <table>
        <thead><tr>
          <th class="score">Punteggio</th><th>Host / azienda</th><th>Paese / città</th>
          <th>Email</th><th>Telefono</th><th>Indirizzo</th><th>Confidenza</th><th>Dettagli</th>
        </tr></thead>
        <tbody id="host-rows"><tr><td colspan="8" class="empty">Caricamento…</td></tr></tbody>
      </table>
    </div>
    <div class="pagination">
      <span id="page-status">Pagina 1</span>
      <div class="pagination-controls"><button id="previous" type="button">Precedente</button><button id="next" type="button">Successiva</button></div>
    </div>
  </section>
</main>
<script id="host-data" type="application/json"><?= $safeRows ?></script>
<script>
(() => {
  'use strict';
  const allRows = JSON.parse(document.getElementById('host-data').textContent || '[]');
  const weightKey = 'erasmuseye.ai-analysis-weights.v1';
  const scoreKeys = ['software_project_score', 'ai_llm_score', 'mentoring_score', 'technology_score', 'contribution_score', 'networking_score'];
  const pageSize = 50;
  const state = { page: 1, weightsValid: true, expanded: new Set(), detailCache: new Map(), loading: new Set(), activeDetailTab: new Map() };
  const $ = (selector) => document.querySelector(selector);
  const tbody = $('#host-rows');
  const hostCards = $('#host-cards');
  const country = $('#country');
  const city = $('#city');
  const numberFormat = new Intl.NumberFormat('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  function clean(value) { return String(value ?? '').trim(); }
  function uniqueValues(key) {
    return [...new Set(allRows.map(row => clean(row[key])).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'it'));
  }
  function fillSelect(select, values, label) {
    for (const value of values) {
      const option = document.createElement('option'); option.value = value; option.textContent = value; select.append(option);
    }
    select.setAttribute('aria-label', label);
  }
  fillSelect(country, uniqueValues('country'), 'Paese');
  fillSelect(city, uniqueValues('city'), 'Città');

  function readWeights() {
    const inputs = [...document.querySelectorAll('[data-weight]')];
    const weights = Object.fromEntries(inputs.map(input => [input.dataset.weight, Number(input.value)]));
    const valid = inputs.every(input => input.value !== '' && Number.isInteger(Number(input.value)) && Number(input.value) >= 0 && Number(input.value) <= 100) && Object.values(weights).reduce((sum, value) => sum + value, 0) === 100;
    state.weightsValid = valid;
    const status = $('#weights-status');
    const sum = Object.values(weights).reduce((total, value) => total + (Number.isFinite(value) ? value : 0), 0);
    status.textContent = valid ? 'Totale pesi: 100%' : `I pesi devono essere interi e sommare a 100% (ora: ${sum}%).`;
    status.classList.toggle('invalid', !valid);
    try { localStorage.setItem(weightKey, JSON.stringify(weights)); } catch (_) {}
    return weights;
  }
  function restoreWeights() {
    try {
      const stored = JSON.parse(localStorage.getItem(weightKey) || 'null');
      if (stored && scoreKeys.every(key => Number.isInteger(stored[key]) && stored[key] >= 0 && stored[key] <= 100)) {
        document.querySelectorAll('[data-weight]').forEach(input => { input.value = String(stored[input.dataset.weight]); });
      }
    } catch (_) {}
  }
  restoreWeights();

  function weightedScore(row, weights) {
    if (!state.weightsValid) return null;
    const sum = scoreKeys.reduce((total, key) => total + Number(row[key] || 0) * weights[key], 0);
    return Math.round((sum / 100 + Number.EPSILON) * 100) / 100;
  }
  function filteredRows() {
    const term = clean($('#search').value).toLocaleLowerCase('it');
    const selectedCountry = country.value;
    const selectedCity = city.value;
    const favoriteOnly = $('#favorites').checked;
    return allRows.map(row => ({ ...row, overall_score: weightedScore(row, readCurrentWeights()) }))
      .filter(row => (!selectedCountry || clean(row.country) === selectedCountry)
        && (!selectedCity || clean(row.city) === selectedCity)
        && (!favoriteOnly || row.is_favorite)
        && (!term || [row.id, row.fullname, row.company, row.email, row.city, row.country].some(value => clean(value).toLocaleLowerCase('it').includes(term))))
      .sort((a, b) => (b.overall_score ?? -1) - (a.overall_score ?? -1) || String(a.id).localeCompare(String(b.id), 'en', { numeric: true }));
  }
  let currentWeights = readWeights();
  function readCurrentWeights() { return currentWeights; }

  function appendCell(row, value, className = '') {
    const cell = document.createElement('td');
    if (className) cell.className = className;
    cell.textContent = clean(value) || '—'; row.append(cell); return cell;
  }
  function scoreRow(row) {
    const tr = document.createElement('tr'); tr.dataset.hostId = row.id;
    appendCell(tr, row.overall_score === null ? '—' : numberFormat.format(row.overall_score), 'score');
    const name = document.createElement('td');
    const main = document.createElement('strong'); main.textContent = clean(row.fullname) || `Host ${row.id}`; name.append(main);
    if (row.is_favorite) { const star = document.createElement('span'); star.className = 'favorite'; star.setAttribute('aria-label', 'Preferito'); star.textContent = ' ★'; name.append(star); }
    if (clean(row.company)) { const company = document.createElement('span'); company.className = 'company'; company.textContent = row.company; name.append(company); }
    const id = document.createElement('span'); id.className = 'company'; id.textContent = `ID ${row.id}`; name.append(id); tr.append(name);
    appendCell(tr, [row.country, row.city].filter(Boolean).join(' · '), 'city');
    appendCell(tr, row.email, 'contact'); appendCell(tr, row.phone, 'contact');
    appendCell(tr, [row.address, row.zipcode].filter(Boolean).join(' '), 'contact');
    appendCell(tr, row.confidence);
    const actionCell = document.createElement('td'); actionCell.className = 'row-actions';
    const button = document.createElement('button'); button.type = 'button'; button.textContent = state.expanded.has(String(row.id)) ? 'Chiudi' : 'Scheda host';
    button.setAttribute('aria-expanded', state.expanded.has(String(row.id)) ? 'true' : 'false');
    button.setAttribute('aria-controls', `host-detail-desktop-${row.id}`);
    button.addEventListener('click', () => toggleDetails(String(row.id))); actionCell.append(button); tr.append(actionCell);
    return tr;
  }
  function makeDetailPanel(hostId, presentation) {
    const panel = document.createElement('div'); panel.className = 'detail-panel'; panel.id = `host-detail-${presentation}-${hostId}`;
    panel.setAttribute('aria-live', 'polite');
    if (state.loading.has(hostId)) panel.textContent = 'Caricamento scheda…';
    else if (state.detailCache.has(hostId)) renderDetails(panel, state.detailCache.get(hostId), hostId, presentation);
    return panel;
  }
  function addDetailRow(hostId) {
    const row = document.createElement('tr'); row.className = 'detail-row'; row.dataset.detailFor = hostId;
    const cell = document.createElement('td'); cell.colSpan = 8;
    const panel = makeDetailPanel(hostId, 'desktop');
    row.append(cell); cell.append(panel); return row;
  }
  function hostCard(row) {
    const hostId = String(row.id);
    const card = document.createElement('article'); card.className = 'host-card';
    const top = document.createElement('div'); top.className = 'host-card-top';
    const identity = document.createElement('div'); identity.className = 'host-card-name';
    const name = document.createElement('strong'); name.textContent = clean(row.fullname) || `Host ${hostId}`; identity.append(name);
    if (row.is_favorite) { const star = document.createElement('span'); star.className = 'favorite'; star.setAttribute('aria-label', 'Preferito'); star.textContent = ' ★'; identity.append(star); }
    if (clean(row.company)) { const company = document.createElement('span'); company.className = 'company'; company.textContent = row.company; identity.append(company); }
    const id = document.createElement('span'); id.className = 'company'; id.textContent = `ID ${hostId}`; identity.append(id);
    const score = document.createElement('strong'); score.className = 'host-card-score'; score.textContent = row.overall_score === null ? '—' : numberFormat.format(row.overall_score);
    score.setAttribute('aria-label', `Punteggio ${score.textContent}`); top.append(identity, score); card.append(top);

    const meta = document.createElement('div'); meta.className = 'host-card-meta';
    for (const [label, value] of [['Paese / città', [row.country, row.city].filter(Boolean).join(' · ')], ['Confidenza', row.confidence]]) {
      const item = document.createElement('div');
      const fieldLabel = document.createElement('span'); fieldLabel.className = 'host-card-label'; fieldLabel.textContent = label;
      const fieldValue = document.createElement('span'); fieldValue.textContent = clean(value) || '—'; item.append(fieldLabel, fieldValue); meta.append(item);
    }
    card.append(meta);

    const expanded = state.expanded.has(hostId);
    const button = document.createElement('button'); button.type = 'button';
    button.textContent = expanded ? 'Chiudi scheda' : 'Scheda host';
    button.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    button.setAttribute('aria-controls', `host-detail-mobile-${hostId}`);
    button.addEventListener('click', () => toggleDetails(hostId)); card.append(button);
    if (expanded) card.append(makeDetailPanel(hostId, 'mobile'));
    return card;
  }
  async function toggleDetails(hostId) {
    if (state.expanded.has(hostId)) { state.expanded.delete(hostId); render(); return; }
    if (!state.activeDetailTab.has(hostId)) state.activeDetailTab.set(hostId, 'synthetic');
    state.expanded.add(hostId); state.loading.add(hostId); render();
    try {
      const response = await fetch(`?ajax=detail&id=${encodeURIComponent(hostId)}`, { credentials: 'same-origin', headers: { Accept: 'application/json' }, cache: 'no-store' });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || 'Dettaglio non disponibile.');
      state.detailCache.set(hostId, payload); state.loading.delete(hostId); render();
    } catch (error) {
      state.loading.delete(hostId); state.expanded.delete(hostId); render();
      window.alert(error instanceof Error ? error.message : 'Errore nel caricamento del dettaglio.');
    }
  }
  function renderDetails(panel, payload, hostId, presentation) {
    panel.replaceChildren();
    const tabs = [
      ['synthetic', 'Profilo sintetico'],
      ['detail', 'Dettaglio Erasmus'],
      ['analysis', 'Analisi IA'],
    ];
    const activeTab = state.activeDetailTab.get(hostId) || 'synthetic';
    const tabList = document.createElement('div'); tabList.className = 'detail-tabs'; tabList.setAttribute('role', 'tablist'); tabList.setAttribute('aria-label', 'Sezioni del dettaglio host');
    const panelId = `host-detail-content-${presentation}-${hostId}`;
    for (const [key, label] of tabs) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'detail-tab';
      button.id = `host-tab-${presentation}-${hostId}-${key}`; button.textContent = label; button.setAttribute('role', 'tab');
      button.setAttribute('aria-selected', activeTab === key ? 'true' : 'false'); button.setAttribute('aria-controls', panelId); button.tabIndex = activeTab === key ? 0 : -1;
      button.addEventListener('click', () => {
        state.activeDetailTab.set(hostId, key); refreshDetailPanels(hostId, payload);
        panel.querySelector(`[role="tab"][aria-selected="true"]`)?.focus();
      });
      button.addEventListener('keydown', event => {
        const currentIndex = tabs.findIndex(tab => tab[0] === key);
        let nextIndex = currentIndex;
        if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabs.length;
        else if (event.key === 'ArrowLeft') nextIndex = (currentIndex + tabs.length - 1) % tabs.length;
        else if (event.key === 'Home') nextIndex = 0;
        else if (event.key === 'End') nextIndex = tabs.length - 1;
        else return;
        event.preventDefault(); state.activeDetailTab.set(hostId, tabs[nextIndex][0]);
        refreshDetailPanels(hostId, payload); panel.querySelector(`[role="tab"][aria-selected="true"]`)?.focus();
      });
      tabList.append(button);
    }
    panel.append(tabList);

    const activeDefinition = tabs.find(tab => tab[0] === activeTab) || tabs[0];
    const data = payload[activeDefinition[0]];
    const content = document.createElement('section'); content.className = 'detail-section'; content.id = panelId;
    content.setAttribute('role', 'tabpanel'); content.setAttribute('tabindex', '0'); content.setAttribute('aria-labelledby', `host-tab-${presentation}-${hostId}-${activeDefinition[0]}`);
    const heading = document.createElement('h4'); heading.textContent = activeDefinition[1]; content.append(heading);
    if (!data || typeof data !== 'object') {
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'Nessun dato disponibile per questa sezione.'; content.append(empty);
    } else {
      const list = document.createElement('dl');
      for (const [key, rawValue] of Object.entries(data)) {
        if (key === 'raw_json' || rawValue === null || rawValue === '') continue;
        const term = document.createElement('dt'); term.textContent = key.replaceAll('_', ' ');
        const description = document.createElement('dd');
        let displayValue = rawValue;
        if (typeof rawValue === 'object') displayValue = JSON.stringify(rawValue, null, 2);
        description.textContent = String(displayValue);
        if (key === 'website' && typeof rawValue === 'string') {
          try {
            const url = new URL(rawValue.startsWith('http') ? rawValue : `https://${rawValue}`);
            if (url.protocol === 'http:' || url.protocol === 'https:') {
              const link = document.createElement('a'); link.href = url.href; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = String(rawValue); description.replaceChildren(link);
            }
          } catch (_) {}
        }
        list.append(term, description);
      }
      if (!list.children.length) { const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = 'Nessun dato disponibile per questa sezione.'; content.append(empty); }
      else content.append(list);
    }
    panel.append(content);
  }
  function refreshDetailPanels(hostId, payload) {
    for (const presentation of ['desktop', 'mobile']) {
      const panel = document.getElementById(`host-detail-${presentation}-${hostId}`);
      if (panel) renderDetails(panel, payload, hostId, presentation);
    }
  }
  function render() {
    const rows = filteredRows();
    $('#visible-count').textContent = String(rows.length);
    const pages = Math.max(1, Math.ceil(rows.length / pageSize));
    state.page = Math.min(state.page, pages);
    $('#page-status').textContent = `Pagina ${state.page} di ${pages} · ${rows.length} risultati`;
    $('#previous').disabled = state.page <= 1;
    $('#next').disabled = state.page >= pages;
    tbody.replaceChildren(); hostCards.replaceChildren();
    const shown = rows.slice((state.page - 1) * pageSize, state.page * pageSize);
    if (!shown.length) {
      const message = state.weightsValid ? 'Nessun host corrisponde ai filtri.' : 'Imposta pesi che sommano a 100% per visualizzare la classifica.';
      const tr = document.createElement('tr'); const td = document.createElement('td'); td.colSpan = 8; td.className = 'empty'; td.textContent = message; tr.append(td); tbody.append(tr);
      const empty = document.createElement('p'); empty.className = 'empty'; empty.textContent = message; hostCards.append(empty); return;
    }
    for (const item of shown) {
      tbody.append(scoreRow(item));
      if (state.expanded.has(String(item.id))) tbody.append(addDetailRow(String(item.id)));
      hostCards.append(hostCard(item));
    }
  }

  document.querySelectorAll('[data-weight]').forEach(input => input.addEventListener('input', () => { currentWeights = readWeights(); state.page = 1; render(); }));
  $('#search').addEventListener('input', () => { state.page = 1; render(); });
  country.addEventListener('change', () => { state.page = 1; render(); });
  city.addEventListener('change', () => { state.page = 1; render(); });
  $('#favorites').addEventListener('change', () => { state.page = 1; render(); });
  $('#previous').addEventListener('click', () => { state.page--; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  $('#next').addEventListener('click', () => { state.page++; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
  window.addEventListener('storage', event => {
    if (event.key !== weightKey) return;
    restoreWeights(); currentWeights = readWeights(); render();
  });
  render();
})();
</script>
</body>
</html>
