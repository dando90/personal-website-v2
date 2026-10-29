# Stefano Chiabrando — Portfolio

Portfolio personale sviluppato con Next.js App Router, TypeScript e Tailwind CSS 4. Il sito supporta italiano, inglese e spagnolo ed è configurato per l’esportazione statica.

## Sviluppo locale

```bash
npm ci
npm run dev
```

Apri `http://localhost:5173`. La radice sceglie la lingua del browser, mentre puoi cambiare lingua dal selettore nell’intestazione. La scelta manuale viene salvata nel browser.

## Build statico

```bash
npm run build
```

Next.js genera il sito statico nella cartella `out/`, pronto per un hosting statico o Apache/PHP. Le pagine localizzate sono generate a `/en/`, `/it/` e `/es/`.

## Struttura

- `src/app/[lang]`: layout e pagina generati per ogni lingua.
- `src/app/(entry)`: homepage inglese con rilevamento iniziale della lingua.
- `src/components`: composizione della pagina, intestazione e selettore lingua.
- `src/lib/i18n.ts`: lingue supportate, dizionari e scelta della lingua.
- `src/app/globals.css`: token visivi e stili globali.
