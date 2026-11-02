# Stefano Chiabrando — Portfolio

Portfolio personale sviluppato con Next.js App Router, TypeScript e Tailwind CSS 4. Il sito supporta italiano, inglese e spagnolo ed è configurato per l’esportazione statica.

## Sviluppo locale

```bash
npm ci
npm run dev
```

Apri `http://localhost:5173`. La radice resta in inglese se non esiste una preferenza salvata; il selettore permette di scegliere la lingua e conserva la pagina corrente.

## Build statico

```bash
npm run build
```

Next.js genera il sito statico nella cartella `out/`. Le pagine localizzate sono generate a `/en/`, `/it/` e `/es/`. I file PHP in `public/` vengono copiati nell’export; il server che pubblica `out/` deve avere un gestore PHP attivo per eseguire l’API e le pagine riservate. Next `dev` non esegue PHP: il form di contatto si può provare solo su un ambiente con PHP configurato.

## Struttura

- `src/app/[lang]`: route statiche generate per ciascuna lingua.
- `src/app/(entry)`: pagina radice in inglese e comportamento iniziale della lingua.
- `src/components`: layout e componenti condivisi.
- `src/content`: dizionari localizzati divisi per area del sito.
- `src/features`: contenuti e componenti specifici delle pagine.
- `src/lib/i18n.ts`: lingue supportate e preferenza della lingua.
- `src/app/globals.css`: token visivi e stili globali.

## Endpoint contatti e pagine PHP riservate

Il form localizzato invia richieste JSON a `/api/contact.php`. L’API richiede PHP 8.4, `PDO` con il driver MySQL, sessioni e la funzione `mail()` configurata dal provider. Usa token CSRF, controllo dell’origine, honeypot, tempo minimo e un limite di cinque richieste per IP in 15 minuti. In sviluppo Next.js, senza un server PHP, l’endpoint non risponde: il messaggio di servizio non disponibile è previsto.

`public/hidden/` è una cartella pubblica, non una cartella protetta dal nome. Le pagine `login.php` e `spese.php` richiedono l’accesso, ma Apache deve eseguire i file PHP. Il codice condiviso si trova in `public/private/bootstrap.php`; il login verifica le password hashate con `password_verify()`.

La configurazione locale reale sta in `private/config.php`, fuori da `public/` e ignorata da Git. Per crearla, usa `public/private/config.example.php` come modello: imposta connessione MySQL, mittente e destinatario email, origini consentite, salt casuale e cartella di storage. Non inserire mai le credenziali in `public/` o nel repository.

Per pubblicare, carica il contenuto di `out/` in `htdocs/`: include `private/bootstrap.php` e `private/.htaccess`. Carica poi la configurazione reale separatamente in `htdocs/private/config.php` e assicurati che `htdocs/private/storage/` sia scrivibile dal processo PHP. I tre script PHP usano solo `htdocs/private/bootstrap.php`; il bootstrap cerca la configurazione accanto a sé sul server e in `private/config.php` nel workspace locale. Verifica che `https://www.stefanochiabrando.com/private/config.php` risponda 403 e che login, spese e API funzionino. La regola `Require all denied` richiede Apache con autorizzazioni `.htaccess` abilitate.
