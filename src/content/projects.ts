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
  /** Larghezza/altezza quando non è 16:9. */
  ratio?: number;
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
  /** Larghezza/altezza quando non è 16:9. */
  ratio?: number;
}

export interface ProjectImage {
  image: string;
  alt: Localized;
  portrait?: boolean;
}

export interface Project {
  slug: string;
  name: string;
  /** Per i filtri della sezione progetti. */
  category: "app" | "library";
  /** Che cosa è, in poche parole: "App desktop · open source". */
  kind: Localized;
  year: string;
  /** Una o due frasi per l'indice in home. */
  summary: Localized;
  /** L'introduzione della pagina: cosa fa e a cosa serve, un paragrafo per voce. */
  intro: Record<Locale, string[]>;
  /** I problemi concreti che risolve, ognuno con la risposta del progetto. */
  solves: { problem: Localized; answer: Localized }[];
  /** A chi serve. */
  audience: Localized;
  /** A che punto è: versione e cosa manca. */
  status: Localized;
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
  /** Altre immagini da mostrare nelle strisce, oltre a copertina e funzioni. */
  gallery?: ProjectImage[];
}

export const projects: Project[] = [
  {
    slug: "gamemode",
    category: "app",
    name: "GameMode",
    kind: { it: "App desktop · open source", en: "Desktop app · open source" },
    year: "2026",
    summary: { it: "Un launcher che trasforma un PC Windows in una console: i giochi di tutti gli store in una libreria, da usare dal divano con il controller.", en: "A launcher that turns a Windows PC into a console: games from every store in one library, played from the couch with a controller." },
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
    intro: {
      it: [
        "GameMode è un launcher per Windows che si usa tutto con il controller. Raccoglie in una sola libreria i giochi installati da Steam, Xbox, Epic, GOG, EA, Ubisoft e dagli emulatori, scarica copertine e dettagli e avvia ogni gioco con un tasto.",
        "Serve a usare un PC come una console: collegato alla TV o su una portatile da gioco con Windows, senza prendere mai mouse e tastiera. Durante la partita il tasto Guide apre un pannello sopra il gioco, e il telefono può fare da telecomando.",
      ],
      en: [
        "GameMode is a Windows launcher you use entirely with a controller. It gathers the games installed from Steam, Xbox, Epic, GOG, EA, Ubisoft and emulators into one library, fetches covers and details, and starts any game with one button.",
        "It lets you use a PC like a console: hooked up to a TV or on a Windows gaming handheld, without ever reaching for mouse and keyboard. During a game the Guide button opens a panel on top of it, and your phone can work as a remote.",
      ],
    },
    solves: [
      {
        problem: { it: "Ogni store ha il suo launcher e i giochi finiscono sparsi in finestre diverse.", en: "Every store has its own launcher, and games end up scattered across different windows." },
        answer: { it: "Una libreria unica legge le installazioni di tutti gli store. I giochi Epic si installano con legendary, senza aprire il launcher di Epic.", en: "One library reads the installs from every store. Epic games install through legendary, without opening Epic's launcher." },
      },
      {
        problem: { it: "Il desktop di Windows non si usa dal divano.", en: "The Windows desktop is not usable from the couch." },
        answer: { it: "Il PC può avviarsi direttamente in GameMode, che prende il posto di Explorer. Se qualcosa va storto, un watchdog riporta Explorer.", en: "The PC can boot straight into GameMode, which takes Explorer's place. If something goes wrong, a watchdog brings Explorer back." },
      },
      {
        problem: { it: "Per cambiare il volume o vedere la batteria del controller bisogna uscire dal gioco.", en: "Changing the volume or checking the controller battery means leaving the game." },
        answer: { it: "Il tasto Guide apre un pannello sopra il gioco e lo mette in pausa finché resta aperto.", en: "The Guide button opens a panel on top of the game and pauses it while the panel is open." },
      },
      {
        problem: { it: "Scrivere una password o cercare un gioco con il pad è lento.", en: "Typing a password or searching for a game with a pad is slow." },
        answer: { it: "Il telefono diventa tastiera e telecomando dal browser, senza installare app.", en: "Your phone becomes a keyboard and remote from the browser, with no app to install." },
      },
    ],
    audience: { it: "Chi gioca sul PC collegato alla TV o su una console portatile con Windows.", en: "People who play on a PC hooked up to a TV, or on a Windows handheld." },
    status: { it: "Versione 0.2.6, con installer per Windows e aggiornamenti firmati su un canale stabile e uno beta.", en: "Version 0.2.6, with a Windows installer and signed updates on a stable and a beta channel." },
    lead: { it: "Un launcher per giocare sul PC con il controller, senza mouse né tastiera. Open source, scritto in Rust e React.", en: "A launcher for playing on a PC with a controller, no mouse or keyboard needed. Open source, written in Rust and React." },
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
    gallery: [
      {
        image: "/projects/gamemode/home.webp",
        alt: {
          it: "La home di GameMode: Elden Ring in primo piano e la riga Continua a giocare con sei copertine",
          en: "The GameMode home screen: Elden Ring up front and a Continue playing row with six covers",
        },
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
    category: "library",
    name: "fse-client",
    kind: { it: "Libreria TypeScript · open source", en: "TypeScript library · open source" },
    year: "2026",
    summary: { it: "Client non ufficiale per il gateway del Fascicolo Sanitario Elettronico 2.0. Controlla i documenti CDA2 prima dell'invio e prepara le richieste firmate, con una CLI e un modulo NestJS.", en: "An unofficial client for the gateway of Italy's electronic health record (FSE 2.0). It checks CDA2 documents before they are sent and prepares signed requests, with a CLI and a NestJS module." },
    intro: {
      it: [
        "fse-client è un insieme di pacchetti TypeScript per comunicare con il gateway del Fascicolo Sanitario Elettronico 2.0, il canale con cui le strutture sanitarie inviano i documenti clinici. Valida i documenti CDA2 in locale, li inserisce nel PDF del referto, firma le richieste e chiama il gateway su TLS reciproco.",
        "Serve a chi sviluppa il software di una struttura sanitaria e deve inviare referti al FSE. Si usa come libreria Node.js, come modulo NestJS o da riga di comando con fse, che valida un file e prepara una richiesta di prova senza inviarla. Il progetto non è ufficiale.",
      ],
      en: [
        "fse-client is a set of TypeScript packages for talking to the gateway of Italy's electronic health record (FSE 2.0), the channel healthcare providers use to send clinical documents. It validates CDA2 documents locally, embeds them in the report PDF, signs the requests and calls the gateway over mutual TLS.",
        "It is for developers of healthcare software who have to send reports to the FSE. You use it as a Node.js library, as a NestJS module or from the command line with fse, which validates a file and prepares a test request without sending it. The project is unofficial.",
      ],
    },
    solves: [
      {
        problem: { it: "Un documento sbagliato si scopre solo quando il gateway lo rifiuta.", en: "A wrong document only shows up when the gateway rejects it." },
        answer: { it: "La validazione XSD gira in locale prima dell'invio, anche in CI, con un exit code.", en: "XSD validation runs locally before sending, in CI too, with an exit code." },
      },
      {
        problem: { it: "Ogni richiesta va firmata con due JWT legati al PDF, con regole precise.", en: "Every request has to be signed with two JWTs bound to the PDF, following precise rules." },
        answer: { it: "La libreria crea i due token RS256 a ogni richiesta, con l'hash SHA-256 del PDF.", en: "The library creates both RS256 tokens for every request, with the PDF's SHA-256 hash." },
      },
      {
        problem: { it: "Log e messaggi d'errore rischiano di contenere dati sanitari e credenziali.", en: "Logs and error messages risk containing health data and credentials." },
        answer: { it: "Ogni messaggio passa da un filtro che maschera token, chiavi, codici fiscali e contenuto clinico.", en: "Every message goes through a filter that masks tokens, keys, fiscal codes and clinical content." },
      },
      {
        problem: { it: "Un XML ricevuto può nascondere un attacco XXE.", en: "An incoming XML document can hide an XXE attack." },
        answer: { it: "I documenti con DOCTYPE o entità vengono rifiutati prima del parsing.", en: "Documents with a DOCTYPE or entities are refused before parsing." },
      },
    ],
    audience: { it: "Software house e sviluppatori che collegano gestionali sanitari al gateway FSE 2.0.", en: "Software houses and developers connecting healthcare software to the FSE 2.0 gateway." },
    status: { it: "Versione 0.x. Validazione, PDF, firma e chiamata di verifica funzionano. La pubblicazione del documento e il controllo dello stato non sono ancora fatti.", en: "Version 0.x. Validation, PDF, signing and the validation call work. Publishing the document and checking its status are not done yet." },
    lead: { it: "Un toolkit TypeScript per integrarsi con il gateway FSE 2.0: valida i documenti in locale, li allega al PDF del referto e firma le richieste. È un progetto non ufficiale, senza legami con il Ministero della Salute o Sogei.", en: "A TypeScript toolkit for integrating with the FSE 2.0 gateway: it validates documents locally, attaches them to the report PDF and signs the requests. It is unofficial and has no ties to the Ministero della Salute or Sogei." },
    stack: "TypeScript · NestJS · libxml2 WASM · pdf-lib · mTLS",
    features: [
      {
        name: { it: "Validazione in locale", en: "Local validation" },
        tags: "XSD · WebAssembly · CLI",
        text: { it: "Il comando fse validate controlla un CDA2 sugli schemi XSD ufficiali e risponde con un exit code, quindi si usa anche in CI. Gli errori indicano la riga ma nascondono i valori del documento dietro [VALUE].", en: "The fse validate command checks a CDA2 against the official XSD schemas and answers with an exit code, so it also works in CI. Errors point to the line but hide the document's values behind [VALUE]." },
        image: "/projects/fse-client/fse-validate.webp",
        alt: { it: "Terminale con tre esecuzioni di fse validate su CDA sintetici: il primo risulta VALID con exit code 0, gli altri due INVALID con exit code 1, uno per un elemento fuori ordine e uno per un birthTime il cui valore è mostrato come [VALUE].", en: "Terminal with three fse validate runs on synthetic CDAs: the first is VALID with exit code 0, the other two are INVALID with exit code 1, one for an out-of-order element and one for a birthTime whose value is shown as [VALUE]." },
      },
      {
        name: { it: "CDA dentro il PDF", en: "CDA inside the PDF" },
        tags: "pdf-lib · PAdES",
        text: { it: "Il gateway vuole il CDA come allegato cda.xml dentro il PDF del referto. La libreria lo inserisce e lo rilegge identico, e rifiuta i PDF già firmati o con altri allegati, perché il CDA va aggiunto prima della firma PAdES.", en: "The gateway expects the CDA as a cda.xml attachment inside the report PDF. The library embeds it and reads it back unchanged, and refuses PDFs that are already signed or carry other attachments, since the CDA must go in before the PAdES signature." },
        image: "/projects/fse-client/pdf-cda-attachment.webp",
        alt: { it: "Il visualizzatore PDF di Chrome apre un referto sintetico di test; nella barra laterale degli allegati compare il file cda.xml.", en: "Chrome's PDF viewer showing a synthetic test report, with cda.xml listed in the attachments sidebar." },
      },
      {
        name: { it: "Richieste firmate, in prova", en: "Signed requests, dry run" },
        tags: "JWT · RS256 · mTLS",
        text: { it: "Con --dry-run la CLI prepara la richiesta completa, con il PDF e i due JWT firmati legati al suo hash, e la stampa senza inviarla. Token e dati personali escono come [REDACTED], e chiavi e certificati si leggono solo da file.", en: "With --dry-run the CLI builds the full request, with the PDF and the two signed JWTs bound to its hash, and prints it without sending it. Tokens and personal data come out as [REDACTED], and keys and certificates are read only from files." },
        image: "/projects/fse-client/fse-send-dry-run.webp",
        alt: { it: "Terminale: export delle variabili con certificati di test usa e getta, poi fse send --dry-run. Nel JSON stampato authorization, fse-jwt-signature, sub, locality e person_id valgono [REDACTED], mentre attachment_hash mostra l'hash del PDF.", en: "Terminal: exports pointing to throwaway test certificates, then fse send --dry-run. In the printed JSON, authorization, fse-jwt-signature, sub, locality and person_id read [REDACTED], while attachment_hash shows the PDF hash." },
      },
      {
        name: { it: "XML e log protetti", en: "Safe XML and logs" },
        tags: "XXE · GDPR",
        text: { it: "I documenti con DOCTYPE o entità vengono rifiutati prima del parsing, perché libxml2 in WebAssembly espanderebbe le entità esterne. Ogni messaggio d'errore passa da un filtro che maschera token, chiavi, codici fiscali e contenuto clinico.", en: "Documents with a DOCTYPE or entities are refused before parsing, because libxml2 in WebAssembly would expand external entities. Every error message goes through a filter that masks tokens, keys, fiscal codes and clinical content." },
        image: "/projects/fse-client/fse-safe-input.webp",
        alt: { it: "Terminale: fse validate rifiuta un CDA con DOCTYPE ed entità esterna e uno codificato in UTF-16, entrambi con exit code 1; sotto, redact() trasforma codice fiscale, token Bearer, chiave PEM e corpo XML in segnaposto [REDACTED].", en: "Terminal: fse validate refuses a CDA with a DOCTYPE and external entity and one encoded as UTF-16, both with exit code 1; below, redact() turns a fiscal code, a Bearer token, a PEM key and an XML body into [REDACTED] placeholders." },
      },
    ],
    figures: [
      { value: 77, label: { it: "test superati", en: "tests passing" } },
      { value: 6, label: { it: "pacchetti", en: "packages" } },
      { value: 2875, label: { it: "righe di TypeScript", en: "lines of TypeScript" } },
    ],
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
    slug: "fatturapa-client",
    category: "library",
    name: "fatturapa-client",
    kind: { it: "Libreria TypeScript · open source", en: "TypeScript library · open source" },
    year: "2026",
    summary: { it: "Toolkit non ufficiale per la fattura elettronica italiana: costruisce e legge l'XML FatturaPA, lo controlla con lo schema ufficiale e le regole di scarto dello SDI e lo invia tramite sette intermediari con un'unica interfaccia.", en: "An unofficial toolkit for Italian e-invoicing: it builds and reads FatturaPA XML, checks it against the official schema and the SDI rejection rules, and sends it through seven intermediaries behind one interface." },
    intro: {
      it: [
        "fatturapa-client è un insieme di pacchetti TypeScript per la fatturazione elettronica italiana. Costruisce l'XML FatturaPA da un modello tipizzato, calcola i totali, lo controlla in locale con lo schema ufficiale e con le regole di scarto dello SDI, e legge le notifiche e i file firmati .p7m.",
        "Serve a chi sviluppa un gestionale e deve emettere o ricevere fatture elettroniche. L'invio passa da un intermediario accreditato: la libreria ne integra sette dietro un'unica interfaccia, con un modulo NestJS e la CLI fatturapa. Il progetto non è ufficiale.",
      ],
      en: [
        "fatturapa-client is a set of TypeScript packages for Italian electronic invoicing. It builds FatturaPA XML from a typed model, computes the totals, checks it locally against the official schema and the SDI rejection rules, and reads notifications and signed .p7m files.",
        "It is for developers of business software who need to issue or receive e-invoices. Sending goes through an accredited intermediary: the library integrates seven of them behind one interface, with a NestJS module and the fatturapa CLI. The project is unofficial.",
      ],
    },
    solves: [
      {
        problem: { it: "Una fattura con un totale sbagliato si scopre solo quando lo SDI la scarta.", en: "An invoice with a wrong total only shows up when the SDI rejects it." },
        answer: { it: "La validazione locale applica lo schema ufficiale e 32 controlli di contenuto dello SDI, e indica il codice di scarto e il campo esatto.", en: "Local validation applies the official schema and 32 SDI content checks, and points to the rejection code and the exact field." },
      },
      {
        problem: { it: "Ogni intermediario ha le sue API, i suoi stati e i suoi webhook.", en: "Every intermediary has its own API, statuses and webhooks." },
        answer: { it: "Sette intermediari implementano la stessa interfaccia, e i loro stati diventano un unico insieme, dalla consegna allo scarto.", en: "Seven intermediaries implement the same interface, and their statuses map to one set, from delivery to rejection." },
      },
      {
        problem: { it: "Decimali e arrotondamenti delle specifiche sono facili da sbagliare.", en: "Decimals and the specification's rounding rules are easy to get wrong." },
        answer: { it: "Gli importi usano aritmetica decimale esatta e gli arrotondamenti previsti dalle specifiche, senza virgola mobile.", en: "Amounts use exact decimal arithmetic and the rounding the specification requires, with no floating point." },
      },
      {
        problem: { it: "Fatture e token contengono dati personali e permettono di emettere fatture a nome dell'azienda.", en: "Invoices and tokens carry personal data and let anyone issue invoices in the company's name." },
        answer: { it: "Le credenziali si leggono solo da variabili d'ambiente, la produzione va confermata in modo esplicito e i riepiloghi mascherano partite IVA e codici fiscali.", en: "Credentials are read only from environment variables, production has to be confirmed explicitly and summaries mask VAT numbers and fiscal codes." },
      },
    ],
    audience: { it: "Chi sviluppa gestionali e software di fatturazione in TypeScript o Node.js.", en: "Developers of business and invoicing software in TypeScript or Node.js." },
    status: { it: "Versione 0.x. Costruzione, controllo e lettura delle fatture sono complete. Gli intermediari sono testati con mock e non ancora sulle sandbox reali; firma locale e fattura semplificata non sono supportate.", en: "Version 0.x. Building, checking and reading invoices are complete. The intermediaries are tested with mocks, not yet against the real sandboxes; local signing and simplified invoices are not supported." },
    lead: { it: "Toolkit TypeScript non ufficiale per FatturaPA e lo SDI.", en: "An unofficial TypeScript toolkit for FatturaPA and the SDI." },
    stack: "TypeScript · Node.js · NestJS · libxml2 WASM",
    cover: {
      image: "/projects/fatturapa-client/validate.webp",
      alt: { it: "Terminale: fatturapa validate accetta una fattura sintetica e ne scarta un'altra con i codici SDI 00423 e 00422", en: "Terminal: fatturapa validate accepts a synthetic invoice and rejects another with SDI codes 00423 and 00422" },
    },
    repo: "https://github.com/massimiliano-dev/fatturapa-client",
    features: [
      {
        name: { it: "Controllo prima dell'invio", en: "Checked before sending" },
        tags: "XSD · Regole SDI · CLI",
        text: { it: "Il comando fatturapa validate controlla un file con lo schema ufficiale e con le regole di scarto dello SDI. Una fattura con un prezzo di riga sbagliato viene fermata con i codici 00423 e 00422 e il valore che ci si aspettava.", en: "The fatturapa validate command checks a file against the official schema and the SDI rejection rules. An invoice with a wrong line price is stopped with codes 00423 and 00422 and the expected value." },
        image: "/projects/fatturapa-client/validate.webp",
        alt: { it: "Terminale: fatturapa validate accetta una fattura sintetica e ne scarta un'altra con i codici SDI 00423 e 00422", en: "Terminal: fatturapa validate accepts a synthetic invoice and rejects another with SDI codes 00423 and 00422" },
      },
      {
        name: { it: "Fatture dal modello tipizzato", en: "Invoices from a typed model" },
        tags: "TypeScript · Decimal",
        text: { it: "La fattura si scrive come oggetto TypeScript con i nomi dello schema. La libreria calcola totali di riga, riepiloghi IVA e totale documento con decimali esatti, e genera l'XML nell'ordine richiesto.", en: "The invoice is written as a TypeScript object using the schema's names. The library computes line totals, VAT summaries and the document total with exact decimals, and generates the XML in the required order." },
        image: "/projects/fatturapa-client/build.webp",
        alt: { it: "Terminale: una fattura sintetica costruita dal modello, con i totali calcolati, nessun problema dalle regole SDI e l'inizio dell'XML generato", en: "Terminal: a synthetic invoice built from the model, with computed totals, no issues from the SDI rules and the start of the generated XML" },
      },
      {
        name: { it: "File firmati e notifiche", en: "Signed files and notifications" },
        tags: "CAdES · Notifiche SDI",
        text: { it: "Apre i file .p7m firmati, anche quelli ricevuti, e mostra un riepilogo con gli identificativi mascherati; la firma non viene verificata. Legge le notifiche dello SDI e affianca a ogni codice di scarto la descrizione ufficiale.", en: "It opens signed .p7m files, received ones included, and shows a summary with masked identifiers; the signature is not verified. It reads SDI notifications and puts the official description next to every rejection code." },
        image: "/projects/fatturapa-client/inspect.webp",
        alt: { it: "Terminale: il riepilogo di un file .p7m sintetico con le partite IVA mascherate e una notifica di scarto con due codici spiegati", en: "Terminal: the summary of a synthetic .p7m file with masked VAT numbers and a rejection notice with two explained codes" },
      },
      {
        name: { it: "Sette intermediari, un'interfaccia", en: "Seven intermediaries, one interface" },
        tags: "SdiProvider · Webhook",
        text: { it: "Openapi.it, Fatture in Cloud, Invoicetronic, A-Cube, Fattura Elettronica API, Aruba e Keliweb usano la stessa interfaccia. Per ognuno ci sono autenticazione, mappatura degli stati e verifica dei webhook, testate con mock.", en: "Openapi.it, Fatture in Cloud, Invoicetronic, A-Cube, Fattura Elettronica API, Aruba and Keliweb share one interface. Each one has authentication, status mapping and webhook verification, tested with mocks." },
        image: "/projects/fatturapa-client/providers.webp",
        alt: { it: "Terminale: i test degli intermediari A-Cube, Fattura Elettronica API e Openapi.it, con 124 test superati", en: "Terminal: the tests for the A-Cube, Fattura Elettronica API and Openapi.it intermediaries, with 124 tests passing" },
      },
    ],
    figures: [
      { value: 124, label: { it: "test superati", en: "tests passing" } },
      { value: 11, label: { it: "pacchetti", en: "packages" } },
      { value: 7, label: { it: "intermediari SDI", en: "SDI intermediaries" } },
      { value: 32, label: { it: "controlli SDI in locale", en: "SDI checks run locally" } },
    ],
  },
  {
    slug: "fse-mcp",
    category: "library",
    name: "fse-mcp",
    kind: { it: "Server MCP · open source", en: "MCP server · open source" },
    year: "2026",
    summary: { it: "Un server MCP che spiega perché il gateway FSE 2.0 rifiuta un documento CDA2 e cosa correggere. Si usa da Claude o dall'IDE e gira tutto in locale.", en: "An MCP server that explains why the FSE 2.0 gateway rejects a CDA2 document and what to fix. You use it from Claude or your IDE, and it runs entirely on your machine." },
    intro: {
      it: [
        "fse-mcp è un server Model Context Protocol: un componente che si collega ad assistenti come Claude Desktop, Claude Code o un IDE e offre loro quattro strumenti dedicati al Fascicolo Sanitario Elettronico 2.0.",
        "Serve mentre si integra il FSE. Quando il gateway rifiuta un documento si incolla l'errore nella chat e l'assistente risponde con la regola ufficiale e la correzione. Può anche cercare codici LOINC o ICD9-CM e generare documenti di prova con dati inventati. Il progetto non è ufficiale.",
      ],
      en: [
        "fse-mcp is a Model Context Protocol server: a component that plugs into assistants such as Claude Desktop, Claude Code or an IDE and gives them four tools for Italy's electronic health record (FSE 2.0).",
        "It helps while you integrate with the FSE. When the gateway rejects a document, you paste the error into the chat and the assistant answers with the official rule and the fix. It can also look up LOINC or ICD9-CM codes and generate test documents with made-up data. The project is unofficial.",
      ],
    },
    solves: [
      {
        problem: { it: "Gli errori del gateway sono codici come ERRORE-28 con un messaggio tecnico.", en: "Gateway errors are codes such as ERRORE-28 with a terse technical message." },
        answer: { it: "Lo strumento restituisce la regola ufficiale, una spiegazione e la modifica da fare.", en: "The tool returns the official rule, an explanation and the change to make." },
      },
      {
        problem: { it: "Trovare il codice e l'OID giusti nei dizionari richiede tempo.", en: "Finding the right code and OID in the dictionaries takes time." },
        answer: { it: "Una ricerca per codice o descrizione restituisce anche l'OID del sistema di codifica.", en: "A search by code or description also returns the code system OID." },
      },
      {
        problem: { it: "Per provare un'integrazione servono documenti realistici, ma senza dati veri.", en: "Testing an integration needs realistic documents, but no real data." },
        answer: { it: "Gli scheletri CDA hanno paziente, medico e struttura inventati.", en: "The CDA skeletons have a made-up patient, doctor and facility." },
      },
      {
        problem: { it: "Dati sanitari e assistenti AI non devono incontrarsi per sbaglio.", en: "Health data and AI assistants must not meet by accident." },
        answer: { it: "Il server gira in locale, non fa chiamate di rete e rifiuta gli XML pericolosi.", en: "The server runs locally, makes no network calls and refuses dangerous XML." },
      },
    ],
    audience: { it: "Sviluppatori che integrano il Fascicolo Sanitario Elettronico e usano un assistente come Claude nell'editor.", en: "Developers integrating with Italy's electronic health record who use an assistant such as Claude in their editor." },
    status: { it: "Versione 0.x. Trasporti e controlli di sicurezza sono completi. Le spiegazioni coprono cinque regole e i dizionari sono un campione.", en: "Version 0.x. Transports and security checks are complete. Explanations cover five rules and the dictionaries are a sample." },
    lead: { it: "Un server MCP non ufficiale per chi integra il Fascicolo Sanitario Elettronico. Porta le regole del gateway dentro l'assistente, così si chiede direttamente perché un documento è stato rifiutato. Non fa chiamate di rete.", en: "An unofficial MCP server for developers integrating with Italy's electronic health record. It brings the gateway's rules into your assistant, so you can ask directly why a document was rejected. It makes no network calls." },
    stack: "TypeScript · Model Context Protocol · Zod · HL7 CDA",
    features: [
      {
        name: { it: "Errori spiegati", en: "Errors explained" },
        tags: "Schematron · HL7 CDA",
        text: { it: "Si incolla l'errore del gateway, per esempio ERRORE-28, e si ricevono il testo ufficiale della regola, una spiegazione e la correzione. Per ora le regole coperte sono cinque, scritte a mano per il referto di laboratorio.", en: "Paste the gateway error, for example ERRORE-28, and get the official rule text, an explanation and the fix. Five rules are covered so far, written by hand for the laboratory report." },
        image: "/projects/fse-mcp/inspector-explain.webp",
        alt: { it: "MCP Inspector in tema scuro collegato a fse-mcp: il tool explain_schematron_error mostra in JSON la regola ERRORE-28 dello schematron LAB v27.1, la spiegazione sul codice fiscale del firmatario e la correzione.", en: "MCP Inspector in dark mode connected to fse-mcp: explain_schematron_error shows as JSON rule ERRORE-28 of the LAB v27.1 schematron, the explanation about the signer's codice fiscale and the fix." },
      },
      {
        name: { it: "Controllo prima del parsing", en: "Checks before parsing" },
        tags: "XML · XXE",
        text: { it: "Prima di leggere un documento il server rifiuta DOCTYPE, entità e XInclude, così un attacco XXE non arriva al parser. La validazione completa su XSD e schematron non è ancora collegata, e la risposta lo dichiara.", en: "Before reading a document, the server refuses DOCTYPE, entities and XInclude, so an XXE attack never reaches the parser. Full XSD and schematron validation is not wired in yet, and the response says so." },
        image: "/projects/fse-mcp/inspector-preflight.webp",
        alt: { it: "MCP Inspector con il risultato di validate_cda: status rejected_preflight, validator \"stub (not implemented)\" e due errori, DTD_FORBIDDEN ed ENTITY_FORBIDDEN.", en: "MCP Inspector showing the validate_cda result: status rejected_preflight, validator \"stub (not implemented)\" and two errors, DTD_FORBIDDEN and ENTITY_FORBIDDEN." },
      },
      {
        name: { it: "Codici e OID", en: "Codes and OIDs" },
        tags: "LOINC · ICD9-CM · ATC",
        text: { it: "Cerca un codice in LOINC, ICD9-CM, ATC, AIC o AdministrativeGender e restituisce l'OID del sistema di codifica da scrivere nel documento. I dizionari sono ancora un campione di 22 codici, e la risposta lo segnala.", en: "It looks up a code in LOINC, ICD9-CM, ATC, AIC or AdministrativeGender and returns the code system OID to write in the document. The dictionaries are still a 22-code sample, and the response says so." },
        image: "/projects/fse-mcp/inspector-lookup.webp",
        alt: { it: "MCP Inspector con il risultato di lookup_code per il codice LOINC 11502-2: display \"Laboratory report\", OID 2.16.840.1.113883.6.1 e sampleData true.", en: "MCP Inspector showing lookup_code for LOINC code 11502-2: display \"Laboratory report\", OID 2.16.840.1.113883.6.1 and sampleData true." },
      },
      {
        name: { it: "Documenti di prova", en: "Test documents" },
        tags: "HL7 CDA",
        text: { it: "Genera lo scheletro di un referto di laboratorio, una lettera di dimissione, un referto di radiologia o un verbale di pronto soccorso. Paziente, medico e struttura sono inventati, quindi si lavora con un LLM senza dati sanitari veri.", en: "It generates the skeleton of a lab report, a discharge letter, a radiology report or an emergency room report. Patient, doctor and facility are made up, so you can work with an LLM without real health data." },
        image: "/projects/fse-mcp/terminal-sample-cda.webp",
        alt: { it: "Terminale con l'output di generate_sample_cda: l'intestazione XML di un referto di laboratorio sintetico con realmCode IT, templateId nazionale, codice LOINC 11502-2 e un codice fiscale fittizio marcato come SYNTHETIC.", en: "Terminal with generate_sample_cda output: the XML header of a synthetic laboratory report with realmCode IT, the national templateId, LOINC code 11502-2 and a fictional codice fiscale marked SYNTHETIC." },
      },
      {
        name: { it: "HTTP protetto", en: "Protected HTTP" },
        tags: "Streamable HTTP · Bearer",
        text: { it: "Oltre a stdio il server risponde in HTTP, solo su localhost e solo con un token: senza token non parte nemmeno. Una richiesta senza token riceve 401, una con un header Host estraneo riceve 403.", en: "Besides stdio, the server answers over HTTP, on localhost only and only with a token: without one it does not start. A request without the token gets 401, and one with a foreign Host header gets 403." },
        image: "/projects/fse-mcp/terminal-http-auth.webp",
        alt: { it: "Terminale: il server rifiuta di avviarsi senza FSE_MCP_TOKEN, poi con curl una richiesta senza token riceve Unauthorized, una con Host attacker.example riceve Forbidden host e una autenticata elenca i quattro tool.", en: "Terminal: the server refuses to start without FSE_MCP_TOKEN, then with curl a request without the token gets Unauthorized, one with Host attacker.example gets Forbidden host and an authenticated one lists the four tools." },
      },
    ],
    figures: [
      { value: 53, label: { it: "test superati", en: "tests passing" } },
      { value: 4, label: { it: "strumenti MCP", en: "MCP tools" } },
      { value: 22, label: { it: "codici di esempio in 5 sistemi di codifica", en: "sample codes across 5 code systems" } },
      { value: 2222, label: { it: "righe di TypeScript", en: "lines of TypeScript" } },
    ],
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
    category: "library",
    name: "nestjs-prisma-tenants",
    kind: { it: "Toolkit NestJS · open source", en: "NestJS toolkit · open source" },
    year: "2026",
    summary: { it: "Un database PostgreSQL per ogni cliente in un'app NestJS con Prisma 7. Manda ogni richiesta al database giusto, migra tutti i database partendo da un canary e isola il cliente il cui database smette di rispondere.", en: "One PostgreSQL database per customer in a NestJS app with Prisma 7. It sends each request to the right database, migrates every database starting from a canary and isolates a customer whose database stops responding." },
    intro: {
      it: [
        "nestjs-prisma-tenants è un toolkit per applicazioni NestJS in cui ogni cliente, o tenant, ha il proprio database PostgreSQL e il proprio ruolo di accesso. È diviso in quattro pacchetti: il modulo NestJS, un nucleo indipendente dal framework, l'adattatore per Prisma 7 e la CLI tenants.",
        "Serve ai SaaS che vogliono l'isolamento più forte tra clienti senza riscrivere ogni volta la stessa infrastruttura: creare i database, capire a quale cliente appartiene una richiesta, aprire la connessione giusta e migrare tutto in sicurezza.",
      ],
      en: [
        "nestjs-prisma-tenants is a toolkit for NestJS apps where every customer, or tenant, has its own PostgreSQL database and login role. It comes in four packages: the NestJS module, a framework-independent core, the Prisma 7 adapter and the tenants CLI.",
        "It is for SaaS products that want the strongest isolation between customers without rewriting the same infrastructure every time: creating the databases, working out which customer a request belongs to, opening the right connection and migrating everything safely.",
      ],
    },
    solves: [
      {
        problem: { it: "Creare un cliente richiede database, ruolo, permessi, migrazioni e dati iniziali.", en: "Adding a customer takes a database, a role, permissions, migrations and seed data." },
        answer: { it: "Un solo comando, tenants create, fa tutto e registra il cliente nel database di controllo.", en: "One command, tenants create, does all of it and records the customer in the control database." },
      },
      {
        problem: { it: "Un pool di connessioni per ogni cliente esaurisce PostgreSQL.", en: "One connection pool per customer exhausts PostgreSQL." },
        answer: { it: "Una cache tiene aperti solo i client usati di recente, con un limite di connessioni per cliente.", en: "A cache keeps only recently used clients open, with a connection limit per customer." },
      },
      {
        problem: { it: "Se il database di un cliente cade, rischia di rallentare tutti.", en: "If one customer's database goes down, it can slow everyone down." },
        answer: { it: "Un circuit breaker per cliente risponde subito 503 per quel cliente e lascia lavorare gli altri.", en: "A per-customer circuit breaker answers 503 straight away for that customer and lets the others work." },
      },
      {
        problem: { it: "Migrare decine di database a mano è lento e rischioso.", en: "Migrating dozens of databases by hand is slow and risky." },
        answer: { it: "La CLI mostra chi è indietro, simula la migrazione, parte da un canary e si ferma al primo errore.", en: "The CLI shows who is behind, simulates the migration, starts with a canary and stops at the first error." },
      },
    ],
    audience: { it: "Team che costruiscono un SaaS con NestJS e Prisma e vogliono un database per cliente.", en: "Teams building a SaaS with NestJS and Prisma who want a database per customer." },
    status: { it: "Versione 0.x: prima dell'1.0 l'API può cambiare. C'è l'adattatore per Prisma, quello per Drizzle è in programma.", en: "Version 0.x: the API may change before 1.0. The Prisma adapter is there, a Drizzle one is planned." },
    lead: { it: "Un toolkit per le applicazioni NestJS in cui ogni cliente ha il suo database PostgreSQL e il suo ruolo di accesso. Raccoglie le parti che ogni team finisce per riscrivere, dal registro dei tenant alle migrazioni.", en: "A toolkit for NestJS apps where every customer has its own PostgreSQL database and login role. It collects the parts every team ends up rewriting, from the tenant registry to migrations." },
    stack: "TypeScript · NestJS · Prisma 7 · PostgreSQL",
    features: [
      {
        name: { it: "Un database per cliente", en: "A database per customer" },
        tags: "PostgreSQL · CLI",
        text: { it: "Il comando tenants create crea il database e un ruolo dedicato, toglie l'accesso pubblico, applica migrazioni e dati iniziali e registra il cliente. Un ruolo non può entrare nel database di un altro, e archiviare un cliente blocca il login senza cancellare i dati.", en: "The tenants create command makes the database and a dedicated role, removes public access, applies migrations and seed data and registers the customer. One role cannot get into another customer's database, and archiving a customer blocks its login without deleting the data." },
        image: "/projects/nestjs-prisma-tenants/npt-provision.webp",
        alt: { it: "Terminale: tenants create per acme e globex, tenants archive umbrella, psql come tenant_acme rifiutato su tenant_globex per mancanza del privilegio CONNECT, elenco dei ruoli con il login di tenant_umbrella disattivato.", en: "Terminal: tenants create for acme and globex, tenants archive umbrella, psql as tenant_acme refused on tenant_globex for lack of CONNECT privilege, and a role list where tenant_umbrella has login disabled." },
      },
      {
        name: { it: "Migrazioni con canary", en: "Migrations with a canary" },
        tags: "Prisma Migrate · CI",
        text: { it: "Lo stato mostra quali database sono indietro. La migrazione si può simulare, parte da un database canary e prosegue sugli altri pochi alla volta. Se qualcosa va storto il comando esce con errore e ferma la pipeline.", en: "The status command shows which databases are behind. A migration can be simulated first, starts on a canary database and then moves to the others a few at a time. If anything fails, the command exits with an error and stops the pipeline." },
        image: "/projects/nestjs-prisma-tenants/npt-migrate.webp",
        alt: { it: "Terminale: tenants status con quattro tenant indietro, riepilogo del dry run, migrazione reale di acme, initech e globex in circa 0,5 secondi ciascuno, e tenants list con umbrella archiviato e rimasto sulla versione iniziale.", en: "Terminal: tenants status with four tenants behind, the dry run summary, a real migration of acme, initech and globex in about half a second each, and tenants list with umbrella archived on the initial schema." },
      },
      {
        name: { it: "Il tenant giusto a ogni richiesta", en: "The right tenant on every request" },
        tags: "NestJS · AsyncLocalStorage",
        text: { it: "Il tenant si ricava dal sottodominio, da un header o da un claim JWT verificato e accompagna la richiesta senza provider request-scoped. Ogni richiesta usa il client Prisma del suo tenant, preso da una cache che limita le connessioni aperte.", en: "The tenant comes from the subdomain, a header or a verified JWT claim and travels with the request without request-scoped providers. Each request uses its tenant's Prisma client, taken from a cache that caps open connections." },
        image: "/projects/nestjs-prisma-tenants/npt-resolution.webp",
        alt: { it: "Terminale: chiamate curl all'app demo. Una nota creata su acme compare solo nell'elenco di acme, globex e initech restituiscono le proprie note, umbrella risponde 404 e una richiesta senza tenant risponde 400.", en: "Terminal: curl calls to the demo app. A note created on acme shows up only in acme's list, globex and initech return their own notes, umbrella answers 404 and a request with no tenant answers 400." },
      },
      {
        name: { it: "Un guasto resta isolato", en: "One failure stays contained" },
        tags: "Circuit breaker · PostgreSQL",
        text: { it: "Ogni cliente ha un circuit breaker che conta solo gli errori di connessione. Nella demo, con il database di globex irraggiungibile, dopo cinque errori le richieste hanno ricevuto 503 in circa 3 ms, mentre acme e initech rispondevano normalmente.", en: "Each customer has a circuit breaker that counts only connection errors. In the demo, with globex's database unreachable, requests got a 503 in about 3 ms after five failures, while acme and initech kept answering normally." },
        image: "/projects/nestjs-prisma-tenants/npt-circuit.webp",
        alt: { it: "Terminale: ALTER ROLE tenant_globex NOLOGIN, poi sette richieste a globex con cinque HTTP 500 e due HTTP 503 in circa 3,5 ms. acme e initech rispondono HTTP 200 e l'endpoint di health mostra il circuito di globex aperto.", en: "Terminal: ALTER ROLE tenant_globex NOLOGIN, then seven requests to globex with five HTTP 500 and two HTTP 503 in about 3.5 ms. acme and initech answer HTTP 200 and the health endpoint shows the globex circuit open." },
      },
    ],
    figures: [
      { value: 36, label: { it: "test unitari", en: "unit tests" } },
      { value: 33, label: { it: "test di integrazione su PostgreSQL", en: "integration tests on PostgreSQL" } },
      { value: 4, label: { it: "pacchetti npm", en: "npm packages" } },
      { value: 2865, label: { it: "righe di TypeScript", en: "lines of TypeScript" } },
    ],
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
    category: "library",
    name: "langgraph-nestjs-template",
    kind: { it: "Template agenti AI · open source", en: "AI agent template · open source" },
    year: "2026",
    summary: { it: "Backend per agenti AI con NestJS e LangGraph.js, pensato per agenti che compiono azioni: prima di agire chiedono l'approvazione, e dati e budget di ogni cliente restano separati.", en: "An AI agent backend with NestJS and LangGraph.js, built for agents that take actions: they ask for approval before acting, and each customer's data and budget stay separate." },
    intro: {
      it: [
        "langgraph-nestjs-template è un punto di partenza per il backend di un agente AI: un'API NestJS che esegue un agente LangGraph.js, con PostgreSQL per la memoria delle conversazioni e una chat Next.js essenziale per provarlo.",
        "Serve quando l'agente deve fare cose con conseguenze, come inviare email o modificare dati, e quando la stessa installazione serve più clienti. Il template mette già insieme le parti di produzione e lascia volutamente minima la logica di business, da riempire con la propria.",
      ],
      en: [
        "langgraph-nestjs-template is a starting point for an AI agent backend: a NestJS API that runs a LangGraph.js agent, with PostgreSQL for conversation memory and a bare-bones Next.js chat to try it out.",
        "It is for when the agent has to do things with consequences, such as sending emails or changing data, and one deployment serves several customers. The template wires up the production parts and keeps the business logic deliberately minimal, ready for your own.",
      ],
    },
    solves: [
      {
        problem: { it: "Un agente può eseguire un'azione sbagliata senza che nessuno la veda.", en: "An agent can carry out a wrong action without anyone seeing it." },
        answer: { it: "Gli strumenti con effetti fermano l'agente finché una persona approva, anche correggendo gli argomenti.", en: "Tools with side effects stop the agent until a person approves, editing the arguments if needed." },
      },
      {
        problem: { it: "Con più clienti sullo stesso sistema, le conversazioni non devono mescolarsi.", en: "With several customers on one system, conversations must not mix." },
        answer: { it: "Ogni conversazione appartiene a un cliente, e per tutti gli altri non esiste.", en: "Every conversation belongs to one customer, and for everyone else it does not exist." },
      },
      {
        problem: { it: "I costi dei modelli crescono senza che nessuno li controlli.", en: "Model costs grow without anyone keeping track." },
        answer: { it: "Ogni cliente ha un limite di richieste e un budget mensile di token, e ogni traccia riporta il costo stimato.", en: "Each customer has a request limit and a monthly token budget, and every trace carries the estimated cost." },
      },
      {
        problem: { it: "È difficile sapere se una modifica peggiora le risposte dell'agente.", en: "It is hard to tell whether a change makes the agent's answers worse." },
        answer: { it: "Le eval girano su risposte registrate a ogni pull request, e ogni notte con il modello vero.", en: "Evals run on recorded responses on every pull request, and every night against the live model." },
      },
    ],
    audience: { it: "Team che vogliono portare un agente AI in produzione in un'app usata da più clienti.", en: "Teams who want to put an AI agent into production in an app shared by several customers." },
    status: { it: "Template in versione 0.x: compila, è tipizzato da capo a fondo e ha i test. Gli strumenti di esempio, una ricerca in un corpus finto e un'email che viene solo registrata, vanno sostituiti con i propri.", en: "Template at version 0.x: it compiles, is typed end to end and is tested. The example tools, a search over a fake corpus and an email that is only logged, are meant to be replaced with your own." },
    lead: { it: "Un template per mettere in produzione agenti AI che toccano dati veri, su un'installazione condivisa da più clienti. Comprende il backend NestJS con LangGraph.js e una chat Next.js essenziale.", en: "A template for running AI agents that touch real data in production, on one deployment shared by several customers. It includes the NestJS backend with LangGraph.js and a bare-bones Next.js chat." },
    stack: "TypeScript · NestJS · LangGraph.js · Next.js · PostgreSQL · OpenTelemetry",
    features: [
      {
        name: { it: "Approvazione prima di agire", en: "Approval before acting" },
        tags: "LangGraph · interrupt",
        text: { it: "Quando l'agente vuole usare uno strumento con effetti, come l'invio di una email, il grafo si ferma e la chiamata compare nel pannello laterale della chat. Gli argomenti si possono correggere prima di approvare, e un lock per conversazione impedisce che una doppia approvazione la esegua due volte.", en: "When the agent wants to use a tool with side effects, such as sending an email, the graph stops and the call appears in the chat's side panel. The arguments can be edited before approving, and a per-conversation lock keeps a double approval from running it twice." },
        image: "/projects/langgraph-nestjs-template/approval-panel.webp",
        alt: { it: "La chat dopo la richiesta di inviare un'email a ops@example.com: nel pannello laterale la scheda gialla \"Send an email\" mostra destinatario, oggetto e testo, con i pulsanti per approvare o rifiutare.", en: "The chat after asking to email ops@example.com: in the side panel, the yellow \"Send an email\" card shows recipient, subject and body, with buttons to approve or reject." },
      },
      {
        name: { it: "Strumenti in sola lettura", en: "Read-only tools" },
        tags: "SSE · Next.js",
        text: { it: "Gli strumenti che leggono soltanto, come la ricerca nei documenti, girano senza chiedere. Il loro output arriva al modello marcato come non affidabile, e la risposta arriva al browser in streaming da un proxy che tiene la chiave API sul server.", en: "Tools that only read, such as document search, run without asking. Their output reaches the model marked as untrusted, and the answer streams to the browser through a proxy that keeps the API key on the server." },
        image: "/projects/langgraph-nestjs-template/chat-answer.webp",
        alt: { it: "La chat con la domanda sulla politica di rimborso: l'agente ha cercato nei documenti senza chiedere conferma, la ricerca compare nel registro a destra e la risposta indica 30 giorni per chiedere il rimborso.", en: "The chat answering a question about the refund policy: the agent searched the documents without asking, the search shows up in the log on the right and the answer gives 30 days to request a refund." },
      },
      {
        name: { it: "Clienti separati, con limiti", en: "Separate customers, with limits" },
        tags: "NestJS · PostgreSQL",
        text: { it: "Ogni conversazione appartiene a un cliente: chi prova a leggerne una di un altro riceve 404, come per un id inesistente. Ogni cliente ha un limite di richieste e un budget mensile di token, controllati prima di chiamare il modello.", en: "Every conversation belongs to a customer: anyone reading another customer's conversation gets a 404, the same as for an unknown id. Each customer has a request limit and a monthly token budget, checked before the model is called." },
        image: "/projects/langgraph-nestjs-template/tenancy-limits.webp",
        alt: { it: "Terminale con chiamate curl all'API: 401 senza chiave, un thread creato dal tenant acme, 404 quando lo legge il tenant globex, 429 per budget mensile esaurito, poi cinque 201 seguiti da 429 con Retry-After per il tenant initech.", en: "Terminal with curl calls to the API: 401 without a key, a thread created by tenant acme, 404 when tenant globex reads it, 429 for an exhausted monthly budget, then five 201s followed by 429 with Retry-After for tenant initech." },
      },
      {
        name: { it: "Costi nelle tracce", en: "Cost in the traces" },
        tags: "OpenTelemetry",
        text: { it: "Ogni esecuzione produce span OpenTelemetry con cliente, token e costo stimato da una tabella di prezzi configurabile. Prompt e argomenti degli strumenti restano fuori dalle tracce, a meno di attivarne la cattura.", en: "Every run produces OpenTelemetry spans with the customer, token counts and an estimated cost from a configurable price table. Prompts and tool arguments stay out of the traces unless you turn content capture on." },
        image: "/projects/langgraph-nestjs-template/otel-spans.webp",
        alt: { it: "Terminale con gli span ricevuti via OTLP per un invio email: agent.run interrotto con token e llm.cost.usd, tool.send_email con side_effects=true e decision=approve, poi agent.run di ripresa completato.", en: "Terminal with spans received over OTLP for one email send: an interrupted agent.run with tokens and llm.cost.usd, tool.send_email with side_effects=true and decision=approve, then a completed resume agent.run." },
      },
      {
        name: { it: "Eval in ogni pull request", en: "Evals on every pull request" },
        tags: "Vitest · CI",
        text: { it: "Le eval riproducono risposte registrate del modello sul grafo e sugli strumenti veri, quindi girano in CI senza rete e senza costi. Ogni notte lo stesso dataset gira anche contro il modello vero.", en: "The evals replay recorded model responses through the real graph and tools, so they run in CI offline and for free. Every night the same dataset also runs against the live model." },
        image: "/projects/langgraph-nestjs-template/evals-tests.webp",
        alt: { it: "Terminale con l'esecuzione delle eval in replay, punteggio 1.00 su soglia 0.8 e tre casi PASS, seguita da pnpm test con 4 file e 35 test superati.", en: "Terminal with the replay eval run, score 1.00 against a 0.8 threshold and three PASS cases, followed by pnpm test with 4 files and 35 tests passed." },
      },
    ],
    figures: [
      { value: 35, label: { it: "test superati", en: "tests passing" } },
      { value: 3, label: { it: "casi di eval, punteggio 1.00", en: "eval cases, score 1.00" } },
      { value: 3649, label: { it: "righe di TypeScript", en: "lines of TypeScript" } },
    ],
    cover: {
      image: "/projects/langgraph-nestjs-template/cover.webp",
      alt: {
        it: "La chat dell'agente con un'email in attesa di approvazione nel pannello laterale.",
        en: "The agent chat with an email waiting for approval in the side panel.",
      },
    },
    repo: "https://github.com/massimiliano-dev/langgraph-nestjs-template",
  },
  {
    slug: "ita-rag-bench",
    category: "library",
    name: "ita-rag-bench",
    kind: { it: "Benchmark RAG · open source", en: "RAG benchmark · open source" },
    year: "2026",
    summary: { it: "Un banco di prova che misura tutta la catena di un sistema RAG su leggi e decreti italiani: estrazione del testo dal PDF, divisione in chunk, embedding e ricerca.", en: "A test bench that measures the whole chain of a RAG system on Italian laws and decrees: text extraction from the PDF, chunking, embeddings and search." },
    intro: {
      it: [
        "ita-rag-bench è un benchmark per i sistemi RAG, quelli che rispondono alle domande cercando prima i passaggi giusti in una raccolta di documenti. Parte dai PDF originali di 20 atti della Gazzetta Ufficiale e prova ogni combinazione di parser, chunker, modello di embedding e metodo di ricerca.",
        "Serve a capire dove si perde davvero la qualità. I benchmark esistenti valutano gli embedding o i modelli linguistici su testo già pulito, qui si misura anche quello che succede prima, quando il PDF diventa testo. I risultati sono pubblicati in una pagina in italiano e in inglese.",
      ],
      en: [
        "ita-rag-bench is a benchmark for RAG systems, the ones that answer questions by first finding the right passages in a collection of documents. It starts from the original PDFs of 20 acts of the Italian Official Gazette and tries every combination of parser, chunker, embedding model and search method.",
        "It shows where quality is really lost. Existing benchmarks evaluate embeddings or language models on clean text, while this one also measures what happens before, when the PDF turns into text. The results are published on a page in Italian and English.",
      ],
    },
    solves: [
      {
        problem: { it: "I benchmark noti partono da testo già pulito e ignorano il PDF.", en: "Well-known benchmarks start from clean text and ignore the PDF." },
        answer: { it: "Ogni configurazione parte dai PDF ufficiali della Gazzetta, quindi anche l'estrazione del testo entra nella misura.", en: "Every configuration starts from the official PDFs, so text extraction is part of the measurement too." },
      },
      {
        problem: { it: "Non si sa se conviene cambiare parser, chunker o modello di embedding.", en: "It is unclear whether to change the parser, the chunker or the embedding model." },
        answer: { it: "La griglia prova 3 parser, 3 chunker e 5 metodi di ricerca, e mostra quanto pesa ogni scelta.", en: "The grid tries 3 parsers, 3 chunkers and 5 search methods, and shows how much each choice matters." },
      },
      {
        problem: { it: "Le risposte di riferimento legate a un chunker favoriscono quel chunker.", en: "Reference answers tied to one chunker favour that chunker." },
        answer: { it: "Ogni risposta è ancorata al testo ufficiale, con atto, articolo, comma e passaggio, qualunque sia il modo in cui il documento viene diviso.", en: "Every answer is anchored to the official text, with act, article, clause and passage, however the document is split." },
      },
      {
        problem: { it: "Un PDF letto male rovina la ricerca senza dare errori.", en: "A badly read PDF ruins search without raising any error." },
        answer: { it: "Il benchmark mostra il tetto dopo parsing e chunking: su un atto, due parser restituiscono codici di glifi invece del testo e il recall scende a zero.", en: "The benchmark shows the ceiling after parsing and chunking: on one act, two parsers return glyph codes instead of text and recall drops to zero." },
      },
    ],
    audience: { it: "Chi costruisce sistemi RAG su documenti italiani e deve scegliere parser, chunker e modello di embedding.", en: "People building RAG systems on Italian documents who have to choose a parser, a chunker and an embedding model." },
    status: { it: "Prima versione: un solo dominio, 20 atti e 150 domande ancora in bozza, scritte con l'aiuto di un LLM e non ancora validate da persone.", en: "First version: one domain, 20 acts and 150 questions still in draft, written with the help of an LLM and not yet validated by people." },
    lead: { it: "Benchmark RAG end-to-end su documenti normativi italiani.", en: "An end-to-end RAG benchmark on Italian legal documents." },
    stack: "Python · PyMuPDF · Docling · bge-m3 · BM25",
    cover: {
      image: "/projects/ita-rag-bench/cover.webp",
      alt: { it: "La pagina dei risultati di ita-rag-bench con le conclusioni e le tre configurazioni più alte", en: "The ita-rag-bench results page with the conclusions and the three best configurations" },
    },
    repo: "https://github.com/massimiliano-dev/ita-rag-bench",
    site: "https://massimiliano-dev.github.io/ita-rag-bench/",
    features: [
      {
        name: { it: "Il risultato in breve", en: "The result at a glance" },
        tags: "RAG · recall@5",
        text: { it: "La pagina dei risultati apre con le tre configurazioni migliori. La prima, PyMuPDF con chunk fissi e ricerca ibrida bge-m3, arriva a 0,836 di recall@5, ma le prime tre restano dentro l'intervallo di confidenza.", en: "The results page opens with the three best configurations. The top one, PyMuPDF with fixed chunks and hybrid bge-m3 search, reaches 0.836 recall@5, but the top three stay within the confidence interval." },
        image: "/projects/ita-rag-bench/cover.webp",
        alt: { it: "La pagina dei risultati di ita-rag-bench: il titolo, le quattro conclusioni e la tabella delle tre configurazioni più alte", en: "The ita-rag-bench results page: the title, the four conclusions and the table of the three best configurations" },
      },
      {
        name: { it: "Conclusioni verificabili", en: "Checkable conclusions" },
        tags: "Analisi · Statistica",
        text: { it: "Ogni conclusione rimanda alle righe della tabella che la sostengono. Per esempio, passare da e5-base a bge-m3 vale circa 9 punti di recall@5, quanto passare dal chunker ricorsivo a quello per articoli e commi.", en: "Every conclusion links to the table rows behind it. For example, switching from e5-base to bge-m3 is worth about 9 points of recall@5, as much as switching from the recursive chunker to the one that splits by articles and clauses." },
        image: "/projects/ita-rag-bench/conclusions.webp",
        alt: { it: "Le conclusioni della pagina dei risultati, ognuna con i codici delle configurazioni da verificare nell'orario", en: "The conclusions on the results page, each with the codes of the configurations to check in the timetable" },
      },
      {
        name: { it: "L'orario delle configurazioni", en: "The configuration timetable" },
        tags: "Parser · Chunker · Retrieval",
        text: { it: "Una tabella in stile orario ferroviario: ogni colonna è una coppia di parser e chunker. La prima fermata dice quanti passaggi di riferimento restano interi in un chunk, la seconda il recall di ogni metodo di ricerca.", en: "A railway-style timetable: every column is a parser and chunker pair. The first stop shows how many reference passages stay whole in a chunk, the second the recall of each search method." },
        image: "/projects/ita-rag-bench/timetable.webp",
        alt: { it: "La tabella Orario: nove colonne parser e chunker, il tetto dopo il chunking e il recall@5 di BM25, ricerca densa e ibrida", en: "The Timetable table: nine parser and chunker columns, the ceiling after chunking and the recall@5 of BM25, dense and hybrid search" },
      },
      {
        name: { it: "Per tipo di domanda", en: "By question type" },
        tags: "BM25 · Embedding",
        text: { it: "Le domande sono fattuali, multi-hop, tabellari o temporali, e i risultati cambiano molto tra un tipo e l'altro. Sulle domande tabellari BM25 arriva a 0,657, mentre la ricerca densa con e5-base si ferma a 0,379.", en: "Questions are factual, multi-hop, table-based or temporal, and results change a lot between types. On table questions BM25 reaches 0.657, while dense search with e5-base stops at 0.379." },
        image: "/projects/ita-rag-bench/by-type.webp",
        alt: { it: "Il recall@5 per tipo di domanda e per metodo di ricerca, con il numero di domande di ogni tipo", en: "Recall@5 by question type and search method, with the number of questions of each type" },
      },
      {
        name: { it: "Costi misurati", en: "Measured costs" },
        tags: "Docling · PyMuPDF",
        text: { it: "Accanto alla qualità ci sono i tempi, misurati su 700 pagine. Estrarre il testo richiede 7,9 secondi con pypdf e 513 con Docling, che usa un modello per il layout e le tabelle.", en: "Next to quality there are the timings, measured on 700 pages. Extracting the text takes 7.9 seconds with pypdf and 513 with Docling, which uses a model for layout and tables." },
        image: "/projects/ita-rag-bench/costs.webp",
        alt: { it: "La tabella dei costi: tempi di estrazione del testo per parser e di indicizzazione e ricerca per modello", en: "The costs table: text extraction time per parser, indexing and search time per model" },
      },
      {
        name: { it: "Una CLI per tutto", en: "One CLI for everything" },
        tags: "Python · CLI",
        text: { it: "La CLI itarag scarica i PDF e ne verifica l'impronta SHA-256, estrae il testo in un processo isolato, esegue la griglia e costruisce la pagina dei risultati. Ha anche un'interfaccia da terminale per rivedere le domande.", en: "The itarag CLI downloads the PDFs and checks their SHA-256 fingerprint, extracts the text in an isolated process, runs the grid and builds the results page. It also has a terminal interface for reviewing the questions." },
        image: "/projects/ita-rag-bench/cli.webp",
        alt: { it: "Terminale: itarag dataset stats con 150 domande in bozza divise per tipo, e itarag corpus info con gli atti del corpus", en: "Terminal: itarag dataset stats with 150 draft questions split by type, and itarag corpus info with the acts in the corpus" },
      },
    ],
    figures: [
      { value: 20, label: { it: "atti della Gazzetta Ufficiale", en: "acts of the Official Gazette" } },
      { value: 700, label: { it: "pagine di PDF", en: "PDF pages" } },
      { value: 150, label: { it: "domande, ancora in bozza", en: "questions, still in draft" } },
      { value: 45, label: { it: "configurazioni misurate", en: "configurations measured" } },
    ],
  },
  {
    slug: "cobalto",
    category: "app",
    name: "Cobalto",
    kind: { it: "App desktop di posta", en: "Desktop email app" },
    year: "2026",
    summary: { it: "Client di posta desktop per macOS, Windows e Linux, scritto in Rust e Svelte. Accanto a ogni email c'è un assistente AI che può usare Claude, GPT o un modello locale con Ollama.", en: "A desktop email client for macOS, Windows and Linux, written in Rust and Svelte. Next to every email there is an AI assistant that can use Claude, GPT or a local model through Ollama." },
    intro: {
      it: [
        "Cobalto è un client di posta IMAP/SMTP costruito con Tauri 2: il backend in Rust gestisce connessioni, cache, OAuth e chiamate AI, l'interfaccia è in Svelte 5. Il pacchetto pesa pochi megabyte e si apre subito, perché la prima pagina di ogni cartella è in cache e viene mostrata prima della sincronizzazione.",
        "Serve a chi vuole leggere più caselle in un posto solo, con il calendario Microsoft e Google affiancato e un assistente che riassume le mail lunghe e indica cosa c'è da fare. L'assistente può usare Claude, GPT oppure un modello locale con Ollama, e in quel caso il testo delle email non esce dal computer.",
      ],
      en: [
        "Cobalto is an IMAP/SMTP email client built with Tauri 2: the Rust backend handles connections, cache, OAuth and AI calls, and the interface is Svelte 5. The package is a few megabytes and opens right away, because the first page of every folder is cached and shown before syncing.",
        "It is for people who want several mailboxes in one place, with Microsoft and Google calendars alongside and an assistant that summarises long emails and points out what needs doing. The assistant can use Claude, GPT or a local model through Ollama, and in that case the email text never leaves the computer.",
      ],
    },
    solves: [
      {
        problem: { it: "Le newsletter e molte mail commerciali contengono pixel traccianti: basta aprirle per far sapere al mittente quando e dove le hai lette.", en: "Newsletters and many sales emails contain tracking pixels: opening them is enough to tell the sender when and where you read them." },
        answer: { it: "Le immagini remote sono bloccate di default. Si sbloccano una volta o sempre per quel mittente, e l'HTML viene ripulito con DOMPurify dentro un iframe senza script.", en: "Remote images are blocked by default. You can load them once or always for that sender, and the HTML is cleaned with DOMPurify inside an iframe with no scripts." },
      },
      {
        problem: { it: "Microsoft ha disattivato l'accesso IMAP/SMTP con password, sia per gli account personali sia per quelli aziendali. Molti client semplici non si collegano più.", en: "Microsoft turned off password-based IMAP/SMTP access for both personal and business accounts. Many simple clients can no longer connect." },
        answer: { it: "Cobalto fa OAuth con PKCE e redirect su localhost per Microsoft 365, Outlook.com e Google, e salva i token nel portachiavi di sistema.", en: "Cobalto does OAuth with PKCE and a localhost redirect for Microsoft 365, Outlook.com and Google, and keeps the tokens in the system keychain." },
      },
      {
        problem: { it: "Con un client lento si aspetta la sincronizzazione prima di vedere la lista, e aprire una mail resta in coda dietro il download delle altre.", en: "With a slow client you wait for sync before the list appears, and opening an email queues behind the download of the others." },
        answer: { it: "La lista arriva dalla cache e ogni account usa due connessioni, una per sincronizzare e una per aprire i messaggi. Archivia ed elimina sono immediati, con 4,5 secondi per annullare.", en: "The list comes from the cache and each account uses two connections, one for syncing and one for opening messages. Archive and delete are instant, with 4.5 seconds to undo." },
      },
      {
        problem: { it: "Un riassunto fatto da un servizio AI esterno vuol dire mandare fuori il contenuto delle email, spesso con dati di clienti e fornitori.", en: "Getting a summary from an external AI service means sending the content of your emails out, often with customer and supplier data." },
        answer: { it: "Si può scegliere un modello locale con Ollama: Cobalto mostra i modelli installati e scarica quelli consigliati. Con Claude o GPT le chiamate partono dal backend Rust e la chiave API resta nel portachiavi.", en: "You can pick a local model through Ollama: Cobalto lists the installed models and downloads the recommended ones. With Claude or GPT the calls go out from the Rust backend and the API key stays in the keychain." },
      },
    ],
    audience: { it: "Chi gestisce più caselle (lavoro su Microsoft 365, personale su Gmail o iCloud) e vuole un client leggero con tastiera, calendario e un assistente AI che può restare in locale.", en: "People who handle several mailboxes (work on Microsoft 365, personal on Gmail or iCloud) and want a light client with keyboard shortcuts, a calendar and an AI assistant that can stay local." },
    status: { it: "Versione 0.1.0. Mancano ancora un backend Microsoft Graph per i tenant che bloccano IMAP/SMTP, le notifiche istantanee con IMAP IDLE (oggi il controllo è ogni minuto), la posta in arrivo unificata, le bozze sul server e il raggruppamento in conversazioni. Le credenziali OAuth di Google in modalità test scadono ogni 7 giorni.", en: "Version 0.1.0. Still missing: a Microsoft Graph backend for tenants that block IMAP/SMTP, instant notifications with IMAP IDLE (today it checks every minute), a unified inbox, server-side drafts and threaded conversations. Google OAuth credentials in test mode expire every 7 days." },
    lead: { it: "Un client di posta piccolo, con l'AI accanto alla mail.", en: "A small email client with the AI next to the email." },
    stack: "Tauri 2 · Rust · Svelte 5 · TypeScript · Ollama",
    cover: {
      image: "/projects/cobalto/inbox.webp",
      alt: { it: "Cobalto con la posta in arrivo: sidebar blu con cartelle e prossima riunione, lista dei messaggi e una mail aperta con due allegati, l'avviso di immagini remote bloccate e a destra la nota dell'AI locale con il pulsante Riassumi e le risposte rapide.", en: "Cobalto showing the inbox: blue sidebar with folders and the next meeting, the message list and an open email with two attachments, the blocked remote images notice and, on the right, the local AI note with the Summarize button and quick replies." },
      ratio: 1.6,
    },
    repo: "https://github.com/massimiliano-dev/cobalto",
    features: [
      {
        name: { it: "Nota a margine", en: "Side note" },
        tags: "Ollama · streaming · Markdown",
        text: { it: "Accanto a ogni email c'è una nota dell'AI. Riassumi produce pochi punti e una sezione \"Da fare\" con le scadenze. Sotto ci sono le risposte in un clic (Accetta, Declina, Chiedi dettagli, Grazie) e un campo per fare domande sulla mail.", en: "Next to every email there is an AI note. Summarize gives a few bullet points and a \"Da fare\" (to do) section with the deadlines. Below are one-click replies (Accept, Decline, Ask for details, Thanks) and a field to ask questions about the email." },
        image: "/projects/cobalto/ai-note.webp",
        alt: { it: "Mail \"Preventivo rinnovo infrastruttura 2027\" aperta; a destra la nota dell'AI locale con tre punti di riassunto, la sezione Da fare \"Confermare il preventivo entro venerdì\" e i pulsanti di risposta rapida.", en: "The email \"Preventivo rinnovo infrastruttura 2027\" open; on the right the local AI note with three summary bullets, a Da fare section saying \"Confermare il preventivo entro venerdì\" and the quick reply buttons." },
        ratio: 1.6,
      },
      {
        name: { it: "Risposte e riscritture", en: "Replies and rewrites" },
        tags: "Svelte 5 · prompt · undo",
        text: { it: "Dal pulsante Accetta l'AI scrive la bozza di risposta nella lingua della mail, senza firma perché la aggiunge Cobalto. Poi il testo si può riscrivere più professionale, più cordiale, più breve, corretto o in inglese, e Ripristina torna alla versione prima.", en: "From the Accept button the AI drafts the reply in the email's language, without a signature since Cobalto adds it. Then the text can be rewritten more formal, warmer, shorter, corrected or in English, and Ripristina (restore) goes back to the previous version." },
        image: "/projects/cobalto/composer.webp",
        alt: { it: "Finestra Risposta sopra la mail: bozza breve \"confermo il preventivo allegato\", firma di Mario Rossi, la fila di pulsanti Più professionale, Più cordiale, Più breve, Correggi, In inglese, Ripristina e il campo per dare istruzioni all'AI locale.", en: "Reply window over the email: a short draft \"confermo il preventivo allegato\", Mario Rossi's signature, the row of buttons Più professionale, Più cordiale, Più breve, Correggi, In inglese, Ripristina and the field to give instructions to the local AI." },
        ratio: 1.6,
      },
      {
        name: { it: "Assistente ⌘J", en: "Assistant ⌘J" },
        tags: "chat · contesto · citazioni",
        text: { it: "Con ⌘J si apre una chat che vede la cartella aperta, la mail che stai leggendo e gli appuntamenti dei prossimi sette giorni. Le risposte citano le email con numeri cliccabili e, se sembrano una mail, diventano una bozza.", en: "⌘J opens a chat that sees the current folder, the email you are reading and the next seven days of appointments. Answers cite emails with clickable numbers and, when they look like an email, can become a draft." },
        image: "/projects/cobalto/assistant.webp",
        alt: { it: "Pannello Assistente a destra con la domanda \"Chi aspetta una mia risposta?\" e una risposta in quattro punti: Giulia Bianchi, Elena Conti, Aruba e Davide Esposito, ciascuno con il numero della mail citata.", en: "Assistant panel on the right with the question \"Chi aspetta una mia risposta?\" and a four-point answer: Giulia Bianchi, Elena Conti, Aruba and Davide Esposito, each with the number of the cited email." },
        ratio: 1.6,
      },
      {
        name: { it: "Calendario multi-account", en: "Multi-account calendar" },
        tags: "Microsoft Graph · Google Calendar · Rust",
        text: { it: "Con ⌘2 si passa al calendario, in vista settimana o agenda, con gli eventi di tutti gli account Microsoft e Google, ognuno con la sua sfumatura di blu. Le chiamate Teams, Meet, Zoom e Webex hanno il pulsante Partecipa e la sidebar avvisa cinque minuti prima.", en: "⌘2 switches to the calendar, in week or agenda view, with events from every Microsoft and Google account, each in its own shade of blue. Teams, Meet, Zoom and Webex calls get a Join button and the sidebar warns five minutes before." },
        image: "/projects/cobalto/calendar.webp",
        alt: { it: "Vista settimanale di fine ottobre 2026 con eventi di due account, una riga dell'ora attuale, due eventi di tutto il giorno e nella sidebar il riquadro \"Tra 8 minuti\" con il pulsante Partecipa.", en: "Week view of late October 2026 with events from two accounts, a current-time line, two all-day events and, in the sidebar, the \"Tra 8 minuti\" box with the Join button." },
        ratio: 1.6,
      },
      {
        name: { it: "AI in locale", en: "Local AI" },
        tags: "Ollama · Keychain · Tauri",
        text: { it: "Nelle impostazioni si sceglie Claude, GPT o Locale. Con Locale Cobalto controlla che Ollama sia attivo, mostra i modelli installati e scarica quelli consigliati con un clic. Il ragionamento dei modelli è spento, perché per la posta servono risposte rapide.", en: "In settings you pick Claude, GPT or Local. With Local, Cobalto checks that Ollama is running, lists the installed models and downloads the recommended ones in one click. Model reasoning is turned off, because email needs quick answers." },
        image: "/projects/cobalto/settings.webp",
        alt: { it: "Pannello Impostazioni, sezione Assistente: tre schede Claude, GPT e Locale con Locale selezionato, \"Ollama attivo · 2 modelli installati\", Gemma 4 26B in uso, Qwen 3.8 27B e Gemma 4 12B con il pulsante Scarica.", en: "Settings panel, Assistant section: three cards Claude, GPT and Locale with Locale selected, \"Ollama attivo · 2 modelli installati\", Gemma 4 26B in use, Qwen 3.8 27B and Gemma 4 12B with a Download button." },
        ratio: 1.6,
      },
      {
        name: { it: "Immagini bloccate", en: "Blocked images" },
        tags: "DOMPurify · iframe · privacy",
        text: { it: "Le immagini remote non vengono caricate finché non lo chiedi, così i pixel traccianti non partono. Una barra sopra il testo permette di mostrarle una volta o sempre per quel mittente. Al posto dell'immagine resta un riquadro vuoto.", en: "Remote images are not loaded until you ask, so tracking pixels never fire. A bar above the text lets you show them once or always for that sender. An empty box stays where the image would be." },
        image: "/projects/cobalto/privacy.webp",
        alt: { it: "Dettaglio della mail aperta: due allegati, la barra \"Immagini remote bloccate per proteggerti dal tracciamento\" con i link Mostra e Sempre da Giulia Bianchi, il testo della mail e in fondo il riquadro vuoto del logo non caricato.", en: "Detail of the open email: two attachments, the bar \"Immagini remote bloccate per proteggerti dal tracciamento\" with the links Mostra and Sempre da Giulia Bianchi, the email text and, at the bottom, the empty box of the logo that was not loaded." },
        ratio: 1.0,
      },
    ],
    figures: [
      { value: 3172, label: { it: "righe di Rust nel backend", en: "lines of Rust in the backend" } },
      { value: 7858, label: { it: "righe di Svelte e TypeScript nell'interfaccia", en: "lines of Svelte and TypeScript in the interface" } },
      { value: 26, label: { it: "comandi Tauri tra interfaccia e backend", en: "Tauri commands between interface and backend" } },
      { value: 6, label: { it: "provider di posta preconfigurati", en: "preconfigured mail providers" } },
    ],
  },
  {
    slug: "azzurro",
    category: "app",
    name: "Azzurro",
    kind: { it: "Emulatore Azure e portale", en: "Azure emulator and portal" },
    year: "2026",
    summary: { it: "Un emulatore locale di Azure che risponde con le API di Resource Manager, Microsoft Graph ed Entra ID, con un portale web più semplice di quello ufficiale.", en: "A local Azure emulator that answers with the Resource Manager, Microsoft Graph and Entra ID APIs, with a web portal simpler than the official one." },
    intro: {
      it: [
        "Azzurro è un server Node.js che espone le stesse API di Azure Resource Manager, Microsoft Graph e Microsoft Entra ID, con i dati in PostgreSQL. Azure CLI, gli SDK, Terraform e le applicazioni ci si collegano senza cambiare codice, usando gli endpoint token emulati. Sopra c'è un portale in Next.js 16, in italiano e inglese.",
        "Serve a chi sviluppa o prova codice che parla con Azure e non vuole usare una sottoscrizione vera per ogni test, e a chi vuole capire come funzionano risorse, ruoli, app registration e costi senza rischi. Dal portale si può anche passare a una directory Azure reale con il proprio account.",
      ],
      en: [
        "Azzurro is a Node.js server that exposes the same APIs as Azure Resource Manager, Microsoft Graph and Microsoft Entra ID, with data stored in PostgreSQL. Azure CLI, the SDKs, Terraform and your own applications connect to it without code changes, through the emulated token endpoints. On top sits a Next.js 16 portal in Italian and English.",
        "It is for people who write or test code that talks to Azure and do not want to use a real subscription for every test, and for people who want to understand resources, roles, app registrations and costs without risk. From the portal you can also switch to a real Azure directory with your own account.",
      ],
    },
    solves: [
      {
        problem: { it: "Provare codice che crea risorse Azure richiede una sottoscrizione, credenziali e costa soldi a ogni errore.", en: "Testing code that creates Azure resources needs a subscription and credentials, and every mistake costs money." },
        answer: { it: "Azzurro risponde in locale con le stesse API ARM e Graph e con gli endpoint token di Entra ID. CLI, SDK e Terraform puntano a localhost e nessuno fattura nulla.", en: "Azzurro answers locally with the same ARM and Graph APIs and the Entra ID token endpoints. CLI, SDKs and Terraform point to localhost and nothing gets billed." },
      },
      {
        problem: { it: "Il portale di Azure è pesante e ha molti livelli di menu anche per operazioni semplici.", en: "The Azure portal is heavy and has many menu levels even for simple tasks." },
        answer: { it: "Il portale di Azzurro tiene in due sezioni, Risorse e Identità, quello che serve di più: creazione da catalogo, distribuzioni, IAM, utenti, gruppi e app registration.", en: "Azzurro's portal keeps what is used most in two sections, Resources and Identity: catalog creation, deployments, IAM, users, groups and app registrations." },
      },
      {
        problem: { it: "Quando si clicca in un portale non si vede quali chiamate API partono, quindi è difficile rifare la stessa cosa da script.", en: "When you click around a portal you cannot see which API calls it makes, so it is hard to repeat the same thing from a script." },
        answer: { it: "Il nastro «Richieste» in fondo a ogni pagina mostra le chiamate ARM e Graph con metodo, esito e tempi. Aperto, mostra richiesta e risposta JSON e copia il comando curl.", en: "The \"Requests\" ribbon at the bottom of every page lists the ARM and Graph calls with method, status and timing. Opened, it shows request and response JSON and copies the curl command." },
      },
      {
        problem: { it: "Costi, ruoli RBAC e consensi delle app si imparano di solito sbagliando su un ambiente vero.", en: "Costs, RBAC roles and app consents are usually learned by making mistakes on a real environment." },
        answer: { it: "Azzurro applica RBAC con i ruoli predefiniti e i loro GUID reali, i blocchi e il consenso amministratore. I costi sono stime calcolate da un listino indicativo in euro.", en: "Azzurro enforces RBAC with the built-in roles and their real GUIDs, locks and admin consent. Costs are estimates computed from an indicative price list in euro." },
      },
    ],
    audience: { it: "Sviluppatori che scrivono codice o infrastruttura per Azure e vogliono provarlo in locale, e chi studia Azure e vuole un ambiente dove sbagliare non costa nulla.", en: "Developers who write code or infrastructure for Azure and want to try it locally, and people learning Azure who want an environment where mistakes cost nothing." },
    status: { it: "Versione 0.1.0. Emula solo il piano di controllo: BLOB, segreti via data plane, code e database non sono emulati (per lo storage si può affiancare Azurite). I file Bicep vanno compilati in JSON prima della distribuzione, i gruppi di gestione non sono supportati, uniqueString() e guid() non danno gli stessi valori di Azure, il consenso utente alle autorizzazioni delegate è automatico e i modelli di Azure AI Foundry non vengono eseguiti.", en: "Version 0.1.0. It emulates the control plane only: blobs, data plane Key Vault secrets, queues and databases are not emulated (Azurite can be added for storage). Bicep files must be compiled to JSON before deployment, management groups are not supported, uniqueString() and guid() do not return the same values as Azure, user consent to delegated permissions is granted automatically, and Azure AI Foundry models are not executed." },
    lead: { it: "Azure in locale, con le sue API e un portale più leggibile.", en: "Azure on your machine, with its APIs and a more readable portal." },
    stack: "Node.js · Hono · PostgreSQL · Next.js 16 · Ollama",
    cover: {
      image: "/projects/azzurro/overview.webp",
      alt: { it: "Home del portale Azzurro in tema scuro: contatori di sottoscrizioni, gruppi di risorse, risorse, registrazioni app, utenti e gruppi, e il riquadro dei costi del mese con spesa di 305,18 € e previsione di 358,86 €.", en: "Azzurro portal home in dark theme: counters for subscriptions, resource groups, resources, app registrations, users and groups, and the monthly cost panel with 305.18 € spent and a 358.86 € forecast." },
    },
    repo: "https://github.com/massimiliano-dev/azzurro",
    features: [
      {
        name: { it: "Creazione con stima", en: "Creation with estimate" },
        tags: "ARM · catalogo · listino",
        text: { it: "Si sceglie un tipo dal catalogo e si compila un modulo con i campi principali. A destra compaiono la stima mensile, calcolata sul piano scelto, e il corpo esatto della PUT che il portale manderà ad ARM.", en: "You pick a type from the catalog and fill in a form with the main fields. On the right you see the monthly estimate for the chosen plan and the exact PUT body the portal will send to ARM." },
        image: "/projects/azzurro/create-estimate.webp",
        alt: { it: "Modulo di creazione di una macchina virtuale vm-api-dev02 in rg-shop-dev, dimensione Standard_D4s_v5, con stima indicativa di 129,94 € al mese e il JSON della richiesta PUT.", en: "Creation form for a virtual machine vm-api-dev02 in rg-shop-dev, size Standard_D4s_v5, with an indicative estimate of 129.94 € per month and the JSON of the PUT request." },
      },
      {
        name: { it: "Nastro Richieste", en: "Requests ribbon" },
        tags: "ARM · Microsoft Graph · curl",
        text: { it: "Ogni chiamata del portale finisce in un nastro in fondo alla pagina. Qui, dopo il consenso amministratore su un'app registration, si vede la POST a Graph su appRoleAssignments con corpo e risposta JSON, pronta da copiare come curl.", en: "Every portal call lands in a ribbon at the bottom of the page. Here, after granting admin consent on an app registration, you see the Graph POST to appRoleAssignments with request and response JSON, ready to copy as curl." },
        image: "/projects/azzurro/requests-ribbon.webp",
        alt: { it: "Pannello Richieste aperto sopra la pagina dell'app github-actions-deploy: elenco di chiamate GET e POST a /v1.0/servicePrincipals e dettaglio di una POST con stato 201, corpo con principalId, resourceId e appRoleId, e risposta JSON.", en: "Requests panel open over the github-actions-deploy app page: list of GET and POST calls to /v1.0/servicePrincipals and detail of a POST with status 201, body with principalId, resourceId and appRoleId, and the JSON response." },
      },
      {
        name: { it: "Anteprima what-if", en: "What-if preview" },
        tags: "ARM template · what-if",
        text: { it: "Prima di distribuire un modello ARM si chiede l'anteprima delle modifiche. Azzurro confronta il modello con le risorse del gruppo e mostra cosa verrebbe creato, modificato o ignorato, con i valori prima e dopo.", en: "Before deploying an ARM template you ask for a preview of the changes. Azzurro compares the template with the resources in the group and shows what would be created, modified or ignored, with before and after values." },
        image: "/projects/azzurro/deploy-whatif.webp",
        alt: { it: "Tabella «Modifiche previste» per la distribuzione shop-dev-infra: kv-shop-dev da creare, stshopdev01 da Standard_LRS a Standard_ZRS, asp-shop-dev da B1 a P1v3, app-shop-dev con nuovi tag, altre risorse ignorate.", en: "\"Planned changes\" table for the shop-dev-infra deployment: kv-shop-dev to be created, stshopdev01 from Standard_LRS to Standard_ZRS, asp-shop-dev from B1 to P1v3, app-shop-dev with new tags, other resources ignored." },
      },
      {
        name: { it: "Gestione costi", en: "Cost management" },
        tags: "Cost Management · Consumption",
        text: { it: "La pagina legge le API Microsoft.CostManagement/query e /forecast emulate con le stesse forme di Azure. Mostra il costo giornaliero con la previsione fino a fine mese e la ripartizione per servizio e per gruppo di risorse.", en: "The page reads the emulated Microsoft.CostManagement/query and /forecast APIs, shaped like Azure's. It shows daily cost with the forecast to month end and the split by service and by resource group." },
        image: "/projects/azzurro/cost-management.webp",
        alt: { it: "Grafico a barre del costo giornaliero di ottobre con i giorni futuri tratteggiati come previsione, e sotto le ripartizioni per servizio (App Service 99,60 €, Redis 86,75 €) e per gruppo di risorse (rg-shop-prod 207,16 €).", en: "Bar chart of daily cost for October with future days hatched as forecast, and below the split by service (App Service 99.60 €, Redis 86.75 €) and by resource group (rg-shop-prod 207.16 €)." },
      },
      {
        name: { it: "Assistente con modello locale", en: "Assistant on a local model" },
        tags: "Ollama · tool calling",
        text: { it: "Se Ollama è attivo, l'assistente usa un modello locale e nessun dato esce dal computer. Chiama le API ARM e Graph con i permessi dell'utente: qui interroga Cost Management e risponde con una tabella dei costi del gruppo.", en: "When Ollama is running, the assistant uses a local model and no data leaves the machine. It calls the ARM and Graph APIs with the user's permissions: here it queries Cost Management and answers with a table of the group's costs." },
        image: "/projects/azzurro/assistant-local.webp",
        alt: { it: "Pagina Assistente con il modello locale qwen3.8:27b: la domanda sui costi di rg-shop-prod, la chiamata POST a Microsoft.CostManagement/query con esito 200 e l'inizio della risposta con una tabella di risorse e costi.", en: "Assistant page with the local model qwen3.8:27b: the question about rg-shop-prod costs, the POST call to Microsoft.CostManagement/query with status 200, and the start of the answer with a table of resources and costs." },
      },
      {
        name: { it: "Azure CLI e RBAC", en: "Azure CLI and RBAC" },
        tags: "Azure CLI · OAuth 2.0 · RBAC",
        text: { it: "Un service principal ottiene un token dall'endpoint emulato e lo usa con curl e con Azure CLI. Ha il ruolo Contributor solo su rg-shop-dev: vede quel gruppo e le sue risorse, e la creazione di un nuovo gruppo viene rifiutata.", en: "A service principal gets a token from the emulated endpoint and uses it with curl and Azure CLI. It has the Contributor role on rg-shop-dev only: it sees that group and its resources, and creating a new group is refused." },
        image: "/projects/azzurro/terminal-azcli.webp",
        alt: { it: "Terminale con token ottenuto via client credentials (mascherato), elenco dei gruppi di risorse via curl, az login come service principal, az vm list e az webapp list su rg-shop-dev, e az group create che fallisce con AuthorizationFailed.", en: "Terminal with a token obtained via client credentials (masked), resource group list via curl, az login as a service principal, az vm list and az webapp list on rg-shop-dev, and az group create failing with AuthorizationFailed." },
        ratio: 1.5802,
      },
    ],
    figures: [
      { value: 165, label: { it: "tipi di risorsa ARM nel catalogo", en: "ARM resource types in the catalog" } },
      { value: 69, label: { it: "voci nel catalogo di creazione del portale", en: "entries in the portal's creation catalog" } },
      { value: 29, label: { it: "test unitari e di integrazione che passano", en: "unit and integration tests passing" } },
      { value: 24791, label: { it: "righe di TypeScript", en: "lines of TypeScript" } },
    ],
  },
];
