# Stefano Chiabrando — Portfolio

Portfolio personale sviluppato con Next.js App Router, TypeScript e Tailwind CSS 4. Il sito supporta italiano, inglese e spagnolo ed è configurato per l’esportazione statica.

## Sviluppo

```bash
npm ci
npm run dev
```

Apri `http://localhost:5173`. La radice resta in inglese se non esiste una preferenza salvata; il selettore conserva la lingua e la pagina scelta.

## Build e pubblicazione

```bash
npm run lint
npm run build
```

Next.js genera il sito statico nella cartella `out/`. Per pubblicarlo, carica il contenuto di `out/` nella cartella web del provider.

Il modulo Contatti invia le richieste a `/api/contact.php`. Per elaborarle in produzione, l’hosting deve supportare PHP 8.4, sessioni e invio email. Next.js dev server non esegue PHP.

## Struttura

- `src/app/[lang]`: pagine statiche generate per ciascuna lingua.
- `src/app/(entry)`: homepage e gestione della lingua iniziale.
- `src/components`: layout e componenti condivisi.
- `src/content`: dizionari localizzati divisi per area.
- `src/features`: componenti e contenuti specifici delle pagine.
- `src/lib/i18n.ts`: lingue supportate e preferenza della lingua.
- `public/projects`: demo statiche dei progetti.
- `scripts`: procedure per ottimizzare le immagini.
