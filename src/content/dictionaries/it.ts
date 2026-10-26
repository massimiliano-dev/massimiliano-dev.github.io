// Testi in italiano. en.ts deve avere la stessa forma (lo controlla il tipo Dictionary).
const it = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "Costruisco software dal database all'interfaccia: gestionali, piattaforme web e app desktop come GameMode.",
  },
  skip: "Vai al contenuto",
  nav: {
    label: "Navigazione principale",
    work: "Progetti",
    about: "Chi sono",
    contact: "Contatti",
    github: "GitHub",
    switchTo: "English",
    switchShort: "EN",
  },
  hero: {
    sentence:
      "Full-stack developer. Costruisco software dal database all'interfaccia: gestionali e piattaforme web di giorno, app desktop e progetti miei la sera.",
    action: "Guarda i progetti",
    hint: "La pila è il mio lavoro: dati in basso, server in mezzo, interfaccia in cima. Trascinala per girarla.",
    sceneLabel: "Tre livelli in 3D impilati: database, server e interfaccia",
  },
  projects: {
    title: "Progetti",
    open: "Apri il progetto",
    code: "Codice",
    step: "{n} di {total}",
  },
  project: {
    back: "Tutti i progetti",
    repo: "Codice su GitHub",
    download: "Scarica per Windows",
    site: "Apri il sito",
    featuresTitle: "Cosa fa",
    figuresTitle: "Dentro il repository",
    next: "Prossimo progetto",
  },
  about: {
    title: "Chi sono",
    paragraph:
      "Scrivo software dal database all'interfaccia. Di giorno costruisco gestionali, CRM e piattaforme SaaS, quasi sempre con Next.js, TypeScript e PostgreSQL. La sera lavoro a progetti miei, come GameMode, che mi ha portato su Rust e sulle API di Windows: lì la parte difficile è capire perché un programma ruba il primo piano a un altro.",
    facts: [
      ["Ruolo", "Full-stack developer"],
      ["Base", "Italia"],
      ["GitHub", "massimiliano-dev"],
    ],
    toolsLabel: "Strumenti",
    lists: [
      {
        title: "Web",
        items: [
          ["Next.js e React", "gestionali, SaaS"],
          ["TypeScript", "ovunque"],
          ["PostgreSQL e Prisma", "dati"],
          ["Tailwind CSS", "interfacce"],
          ["Zod", "validazione"],
          ["Stripe", "pagamenti"],
          ["Vitest e Playwright", "test"],
          ["React Native", "app mobile"],
        ],
      },
      {
        title: "Desktop e sistema",
        items: [
          ["Rust", "GameMode"],
          ["Tauri 2", "app desktop"],
          ["Win32 e WinRT", "API di Windows"],
          ["axum e tokio", "server locali"],
          ["SQLite", "dati sul PC"],
          ["GitHub Actions", "build e rilasci"],
        ],
      },
    ],
  },
  contact: {
    title: "Contatti",
    sentence: "Scrivimi per un progetto o per un'offerta di lavoro.",
    place: "Italia",
  },
  footer: {
    what: "Massimiliano Polce, full-stack developer",
    note: "Nessun cookie, nessun tracciamento",
  },
  controller: {
    connected: "Controller collegato: su e giù per le sezioni, A per aprire, sinistra e destra per girare la pila.",
  },
  root: {
    choose: "Scegli la lingua",
  },
};

export default it;
export type Dictionary = typeof it;
