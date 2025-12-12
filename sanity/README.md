# Sanity setup (headless CMS)

Questa cartella contiene la configurazione e gli schemi già pronti per collegare il sito a Sanity.

## 1) Installa il progetto Sanity
```bash
cd "ATIO Studio Dropbox/Project/Francesca Mirabile/Website"
npm create sanity@latest -- --template clean --output-path cms
```
- Quando te lo chiede, seleziona dataset `production` (o quello che preferisci).
- Scegli TypeScript o JavaScript a piacere: noi forniamo file .ts, ma puoi anche tenerli .js.

## 2) Copia gli schemi e la config
Sovrascrivi i file creati dal wizard con quelli in questa cartella:
- `cms/sanity.config.ts`
- `cms/schemas/project.ts`
- `cms/schemas/pageAbout.ts`
- `cms/schemas/siteSettings.ts`

## 3) Imposta le variabili ambiente
Crea `cms/.env` partendo da questo esempio:
```
SANITY_PROJECT_ID=tuoProjectId
SANITY_DATASET=production
SANITY_API_VERSION=2024-01-01
SANITY_READ_TOKEN= # opzionale, solo se fai build server-side protetta
```

## 4) Avvia lo Studio locale
```bash
cd cms
npm install
npm run dev
```
Apri l’URL indicato (es. http://localhost:3333) per inserire i contenuti.

## 5) Collegamento al frontend
- Home/Archive/Project/About: fai una fetch lato client con `@sanity/client` usando `projectId`, `dataset` e `useCdn: true`.
- Per immagini usa `@sanity/image-url` per generare le varianti (`auto=format`, `w=1200` etc.).
- Mappa i campi Sanity ai componenti già esistenti (titoli, numeri, didascalie, gallery) seguendo gli schemi.

Se vuoi, posso anche aggiungere nel frontend uno script di fetch che popola le colonne direttamente dai dati del CMS (serve `projectId` e `dataset`).***
