// Testi in italiano. en.ts deve avere la stessa forma (lo controlla il tipo Dictionary).
const it = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "Costruisco software dal database all'interfaccia: gestionali, piattaforme web, app desktop e librerie open source.",
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
      "Full-stack developer. Costruisco software dal database all'interfaccia: di giorno gestionali e piattaforme web, la sera librerie open source e un launcher per giocare con il controller.",
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
      "Scrivo software dal database all'interfaccia. Di giorno costruisco gestionali, CRM e piattaforme SaaS, quasi sempre con Next.js, TypeScript e PostgreSQL. La sera lavoro a progetti miei: librerie open source per NestJS e per il Fascicolo Sanitario Elettronico, un template per agenti AI e GameMode, che mi ha portato su Rust e sulle API di Windows.",
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
          ["NestJS", "API e backend"],
          ["LangGraph.js", "agenti AI"],
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
