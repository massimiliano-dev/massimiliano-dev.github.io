import type { Locale } from "./site";

// I progetti del portfolio. Per aggiungerne uno basta un altro oggetto nell'array:
// le immagini vanno in public/projects/<slug>/. In home compare nell'indice dei progetti;
// se ha `features` ottiene anche la sua pagina /<lingua>/progetti/<slug>/.
type Localized = Record<Locale, string>;

export interface ProjectFeature {
  name: Localized;
  tags: string;
  text: Localized;
  image: string;
  alt: Localized;
  /** Dove tenere il punto focale quando l'immagine viene ritagliata (object-position). */
  focus?: string;
  /** Immagine verticale (per esempio uno schermo di telefono): non viene ritagliata. */
  portrait?: boolean;
}

export interface ProjectFigure {
  value: number;
  /** Separatore delle migliaia e suffisso restano fuori dal numero che scorre. */
  suffix?: string;
  label: Localized;
}

export interface ProjectCover {
  /** Immagine 16:9, oppure il poster del video. */
  image: string;
  /** Video muto in loop (senza estensione: servono .webm e .mp4). */
  video?: string;
  alt: Localized;
  focus?: string;
}

export interface Project {
  slug: string;
  name: string;
  /** Che cosa è, in poche parole: "App desktop · open source". */
  kind: Localized;
  year: string;
  /** Una o due frasi per l'indice in home. */
  summary: Localized;
  /** La frase lunga per la pagina del progetto. */
  lead: Localized;
  stack: string;
  cover: ProjectCover;
  repo?: string;
  download?: string;
  site?: string;
  /** Didascalia del video nella pagina del progetto. */
  screenCaption?: Localized;
  features?: ProjectFeature[];
  figures?: ProjectFigure[];
}

export const projects: Project[] = [
  {
    slug: "gamemode",
    name: "GameMode",
    kind: { it: "App desktop · open source", en: "Desktop app · open source" },
    year: "2026",
    summary: {
      it: "Un launcher che trasforma un PC Windows in una console: tutti i giochi in una libreria, si usa dal divano con il controller.",
      en: "A launcher that turns a Windows PC into a console: every game in one library, used from the couch with a controller.",
    },
    cover: {
      image: "/projects/gamemode/tour-poster.webp",
      video: "/projects/gamemode/tour",
      alt: {
        it: "Video: si scorre la home di GameMode, si apre la libreria e poi il menu del tasto Guide",
        en: "Video: scrolling the GameMode home, opening the library, then the Guide button menu",
      },
    },
    screenCaption: {
      it: "GameMode guidato dalla tastiera come da un pad: la home, la libreria, il menu del tasto Guide.",
      en: "GameMode driven from the keyboard as if from a pad: the home screen, the library, the Guide button menu.",
    },
    lead: {
      it: "Un launcher per giocare su PC con il controller, senza toccare mouse e tastiera. Open source, scritto in Rust e React.",
      en: "A launcher for playing on a PC with a controller, no mouse or keyboard needed. Open source, written in Rust and React.",
    },
    stack: "Tauri 2 · Rust · React 19 · TypeScript",
    repo: "https://github.com/massimiliano-dev/GameMode",
    download: "https://github.com/massimiliano-dev/GameMode/releases/latest",
    features: [
      {
        name: { it: "Una libreria sola", en: "One library" },
        tags: "Steam · Xbox · Epic · GOG",
        text: {
          it: "Legge i giochi installati da sette fonti, emulatori compresi, e prende copertine e dettagli da Steam, SteamGridDB e IGDB. I giochi Epic si installano con legendary, senza aprire il launcher di Epic.",
          en: "It reads installed games from seven sources, emulators included, and pulls covers and details from Steam, SteamGridDB and IGDB. Epic games install through legendary, without opening Epic's launcher.",
        },
        image: "/projects/gamemode/library.webp",
        alt: {
          it: "La libreria di GameMode: una griglia di copertine con i filtri per Steam, Xbox, Epic Games, GOG, EA e Ubisoft",
          en: "The GameMode library: a grid of covers with filters for Steam, Xbox, Epic Games, GOG, EA and Ubisoft",
        },
        focus: "0% 50%",
      },
      {
        name: { it: "Il tasto Guide", en: "The Guide button" },
        tags: "Overlay · Win32",
        text: {
          it: "Durante una partita il tasto Guide apre un pannello sopra il gioco con ora, batteria del controller, volume e i comandi per tornare al launcher o chiudere il gioco. Finché il pannello è aperto il gioco resta in pausa.",
          en: "During a game the Guide button opens a panel on top of it with the time, controller battery, volume and the controls to go back to the launcher or close the game. The game stays paused while the panel is open.",
        },
        image: "/projects/gamemode/overlay-game.webp",
        alt: {
          it: "Il pannello del tasto Guide aperto sopra Elden Ring, con ora, volume e la voce Torna al gioco",
          en: "The Guide panel open on top of Elden Ring, with the time, volume and the Back to game option",
        },
        focus: "100% 50%",
      },
      {
        name: { it: "Modalità console", en: "Console mode" },
        tags: "Shell · Watchdog",
        text: {
          it: "GameMode può prendere il posto di Explorer come shell di Windows: il PC si accende già nel launcher. Se GameMode si ferma, un watchdog rimette in piedi Explorer, e dal menu rapido si torna al desktop quando serve.",
          en: "GameMode can replace Explorer as the Windows shell, so the PC boots straight into the launcher. If GameMode stops, a watchdog brings Explorer back, and the quick menu takes you to the desktop when you need it.",
        },
        image: "/projects/gamemode/guide-home.webp",
        alt: {
          it: "Il menu rapido di GameMode sopra la home: volume, musica in riproduzione, Wi-Fi e Bluetooth, Vai al desktop, Sospendi",
          en: "The GameMode quick menu over the home screen: volume, music playing, Wi-Fi and Bluetooth, Go to desktop, Sleep",
        },
        focus: "100% 50%",
      },
      {
        name: { it: "Il telefono come pad", en: "Your phone as a pad" },
        tags: "axum · WebSocket",
        text: {
          it: "Inquadri un QR code e il telefono diventa telecomando, tastiera e lista dei giochi. Gira sulla rete di casa e non c'è nessuna app da installare: basta il browser.",
          en: "Scan a QR code and your phone becomes a remote, a keyboard and a game list. It runs on your home network and there is no app to install: the browser is enough.",
        },
        image: "/projects/gamemode/phone.webp",
        alt: {
          it: "Il telecomando di GameMode nel browser del telefono: D-pad, tasti A B X Y, dorsali e il tasto Xbox",
          en: "The GameMode remote in a phone browser: D-pad, A B X Y buttons, shoulder buttons and the Xbox button",
        },
        portrait: true,
      },
    ],
    figures: [
      { value: 30000, label: { it: "righe di Rust, più o meno", en: "lines of Rust, give or take" } },
      { value: 11400, label: { it: "righe di TypeScript e React", en: "lines of TypeScript and React" } },
      { value: 7, label: { it: "fonti di giochi in una libreria", en: "game sources in one library" } },
      { value: 2, label: { it: "canali di rilascio, stabile e beta", en: "release channels, stable and beta" } },
    ],
  },
  {
    slug: "fse-client",
    name: "fse-client",
    kind: { it: "Libreria TypeScript · open source", en: "TypeScript library · open source" },
    year: "2026",
    summary: {
      it: "Client non ufficiale per il gateway del Fascicolo Sanitario Elettronico 2.0. Valida i documenti CDA2 in locale, li inserisce nel PDF e firma le richieste con JWT su TLS reciproco; c'è anche un modulo NestJS e la CLI fse.",
      en: "An unofficial client for Italy's Fascicolo Sanitario Elettronico 2.0 gateway. It validates CDA2 documents locally, embeds them in the PDF and signs requests with JWTs over mutual TLS; it also ships a NestJS module and the fse CLI.",
    },
    lead: {
      it: "Toolkit TypeScript non ufficiale per il gateway FSE 2.0: validazione XSD locale, CDA nel PDF, JWT firmati su mTLS, modulo NestJS e CLI.",
      en: "An unofficial TypeScript toolkit for the FSE 2.0 gateway: local XSD validation, CDA in the PDF, signed JWTs over mTLS, a NestJS module and a CLI.",
    },
    stack: "TypeScript · NestJS · XSD · mTLS",
    cover: {
      image: "/projects/fse-client/cover.webp",
      alt: {
        it: "Terminale: fse validate accetta un CDA sintetico, ne rifiuta uno con gli elementi in ordine sbagliato indicando la riga, e i 77 test passano",
        en: "Terminal: fse validate accepts a synthetic CDA, rejects one with elements in the wrong order pointing at the line, and all 77 tests pass",
      },
    },
    repo: "https://github.com/massimiliano-dev/fse-client",
  },
  {
    slug: "fse-mcp",
    name: "fse-mcp",
    kind: { it: "Server MCP · open source", en: "MCP server · open source" },
    year: "2026",
    summary: {
      it: "Un server MCP che spiega perché il gateway FSE 2.0 rifiuta un documento CDA2 e cosa cambiare. Lo usi da Claude o dall'IDE, gira tutto in locale e non fa chiamate di rete.",
      en: "An MCP server that explains why the FSE 2.0 gateway rejects a CDA2 document and what to change. You use it from Claude or your IDE; it runs locally and makes no network calls.",
    },
    lead: {
      it: "Server MCP che traduce gli errori del gateway FSE 2.0 in spiegazioni e correzioni.",
      en: "An MCP server that turns FSE 2.0 gateway errors into explanations and fixes.",
    },
    stack: "TypeScript · Model Context Protocol · HL7 CDA",
    cover: {
      image: "/projects/fse-mcp/cover.webp",
      alt: {
        it: "Risposta dello strumento explain_schematron_error all'errore ERRORE-2: la regola del referto di laboratorio, la spiegazione e la correzione",
        en: "The explain_schematron_error tool answering ERRORE-2: the laboratory report rule, the explanation and the fix",
      },
    },
    repo: "https://github.com/massimiliano-dev/fse-mcp",
  },
  {
    slug: "nestjs-prisma-tenants",
    name: "nestjs-prisma-tenants",
    kind: { it: "Toolkit NestJS · open source", en: "NestJS toolkit · open source" },
    year: "2026",
    summary: {
      it: "Un database PostgreSQL per ogni cliente, con NestJS e Prisma 7. Tiene il registro dei tenant, limita le connessioni con una cache dei client, isola con un circuit breaker il tenant che va giù e migra tutti i database partendo da un canary.",
      en: "One PostgreSQL database per customer, with NestJS and Prisma 7. It keeps the tenant registry, caps connections with a client cache, isolates a failing tenant with a circuit breaker and migrates every database starting from a canary.",
    },
    lead: {
      it: "Toolkit database-per-tenant per NestJS, Prisma 7 e PostgreSQL.",
      en: "A database-per-tenant toolkit for NestJS, Prisma 7 and PostgreSQL.",
    },
    stack: "TypeScript · NestJS · Prisma 7 · PostgreSQL",
    cover: {
      image: "/projects/nestjs-prisma-tenants/cover.webp",
      alt: {
        it: "Terminale: i comandi della CLI tenants (list, create, archive, migrate, status) e alcuni dei 36 test che passano",
        en: "Terminal: the tenants CLI commands (list, create, archive, migrate, status) and some of the 36 passing tests",
      },
    },
    repo: "https://github.com/massimiliano-dev/nestjs-prisma-tenants",
  },
  {
    slug: "langgraph-nestjs-template",
    name: "langgraph-nestjs-template",
    kind: { it: "Template agenti AI · open source", en: "AI agent template · open source" },
    year: "2026",
    summary: {
      it: "Backend per agenti AI con NestJS e LangGraph.js, per quando l'agente fa cose vere: chiede l'approvazione prima delle azioni con effetti, tiene separati i clienti, controlla costi e budget e verifica le risposte con eval in CI.",
      en: "An AI agent backend with NestJS and LangGraph.js, for when the agent does real things: it asks for approval before side effects, keeps customers apart, tracks cost and budget and checks answers with evals in CI.",
    },
    lead: {
      it: "Template NestJS + LangGraph.js per agenti AI in produzione, con una chat Next.js.",
      en: "A NestJS + LangGraph.js template for production AI agents, with a Next.js chat.",
    },
    stack: "TypeScript · NestJS · LangGraph.js · Next.js · OpenTelemetry",
    cover: {
      image: "/projects/langgraph-nestjs-template/cover.webp",
      alt: {
        it: "Terminale: pnpm eval riproduce le risposte registrate, punteggio 1.00, e l'azione send_email si ferma in attesa di approvazione",
        en: "Terminal: pnpm eval replays recorded responses, score 1.00, and the send_email action pauses for approval",
      },
    },
    repo: "https://github.com/massimiliano-dev/langgraph-nestjs-template",
  },
];
