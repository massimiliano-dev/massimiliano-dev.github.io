// Testi in italiano. en.ts deve avere la stessa forma (lo controlla il tipo Dictionary).
const it = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "Full-stack developer: sviluppo applicazioni web e software su misura, e pubblico progetti open source.",
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
    who: "Full-stack developer in Italia.",
    sentence:
      "Sviluppo applicazioni web e software su misura, lavorando sia sul backend sia sull'interfaccia. Nel tempo libero pubblico progetti open source.",
    action: "Guarda i progetti",
    contact: "Scrivimi",
    stripLabel: "Fotogrammi dei progetti",
    stripHint: "Clic su un fotogramma per aprire il suo progetto.",
  },
  projects: {
    title: "Progetti",
    filters: { all: "Tutti", library: "Librerie", app: "App" },
    open: "Apri il progetto",
    code: "Codice",
    frames: "{n} immagini",
    step: "{n} di {total}",
  },
  project: {
    back: "Tutti i progetti",
    repo: "Codice su GitHub",
    download: "Scarica per Windows",
    site: "Apri il sito",
    problem: "Il problema",
    audience: "Per chi",
    status: "A che punto è",
    featuresTitle: "Cosa fa",
    figuresTitle: "Dentro il repository",
    next: "Prossimo progetto",
  },
  about: {
    title: "Chi sono",
    paragraph:
      "Per lavoro sviluppo gestionali, CRM e piattaforme SaaS, quasi sempre con Next.js, TypeScript e PostgreSQL, e seguo i progetti dal modello dei dati fino all'interfaccia. Fuori dal lavoro ho i miei progetti: librerie open source per NestJS e per il Fascicolo Sanitario Elettronico, un template per agenti AI e GameMode, che mi ha portato su Rust e sulle API di Windows.",
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
    title: "Scrivimi",
    sentence: "Per un progetto o un'offerta di lavoro.",
    email: "Email",
    copy: "Copia l'indirizzo",
    copied: "Indirizzo copiato",
    place: "Italia",
  },
  footer: {
    what: "Massimiliano Polce, full-stack developer",
    statement: "Applicazioni web e software su misura.",
    note: "Nessun cookie, nessun tracciamento",
    time: "Ora in Italia",
    invite: "Parliamo di un progetto",
  },
  controller: {
    connected: "Controller collegato: su e giù per le sezioni, A per aprire.",
  },
  root: {
    choose: "Scegli la lingua",
  },
};

export default it;
export type Dictionary = typeof it;
