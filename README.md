# Portfolio di Massimiliano Polce

Sito personale statico, in italiano e inglese: https://massimiliano-dev.github.io

Next.js 16 (export statico), React 19, Tailwind 4, React Three Fiber per il 3D, GSAP e Lenis per il movimento.

## Comandi

```bash
npm install
npm run dev      # sviluppo su http://localhost:3000/it/
npm run build    # sito statico in out/
npm start        # serve out/ in locale
npm run lint
```

## Aggiungere un progetto

1. Metti le immagini in `public/projects/<slug>/`: una copertina 16:9 (1920×1080, `.webp`) e, se vuoi, un video muto in loop in `.webm` e `.mp4` con lo stesso nome.
2. Aggiungi un oggetto all'array in `src/content/projects.ts` con nome, tipo, anno, riassunto, copertina e link.
3. Se il progetto ha `features`, ottiene anche la sua pagina: `/it/progetti/<slug>/` e `/en/projects/<slug>/`. Senza `features` in home porta direttamente al codice o al sito.

In home l'indice dei progetti cresce da solo: ogni progetto è un passaggio dello stage.

## Da completare

- `src/content/site.ts`: email pubblica (ora è un indirizzo segnaposto su example.com) e URL di LinkedIn (vuoto, il link non compare finché manca).

## Pubblicazione

Il workflow `.github/workflows/deploy.yml` pubblica su GitHub Pages a ogni push su `main`.
Nel repository GitHub va attivato una volta: Settings → Pages → Source: GitHub Actions.

## Note di design

La direzione visiva viene da tasteskill (`.taste-skill/notes.md`), verificata con UI UX Pro Max; i testi sono passati da Humanizer.
