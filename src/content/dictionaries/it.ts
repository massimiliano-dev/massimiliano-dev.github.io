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
    intro: "Cos'è",
    solves: "Che problemi risolve",
    audience: "Per chi",
    status: "A che punto è",
    featuresTitle: "Cosa fa",
    figuresTitle: "Dentro il repository",
    next: "Prossimo progetto",
  },
  about: {
    title: "Chi sono",
    paragraph:
      "Sono uno sviluppatore full-stack e costruisco software su misura per le aziende, soprattutto gestionali, CRM e piattaforme SaaS. Seguo i progetti per intero, dall'analisi al rilascio, e cerco soluzioni semplici da usare e facili da mantenere nel tempo. Lavoro soprattutto con TypeScript, e quando un problema lo chiede scendo più vicino al sistema con Rust.",
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
          ["Rust", "software di sistema"],
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
