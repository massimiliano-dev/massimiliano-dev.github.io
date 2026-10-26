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
    summary: { it: "Client non ufficiale per il gateway del Fascicolo Sanitario Elettronico 2.0. Controlla i documenti CDA2 prima dell'invio e prepara le richieste firmate, con una CLI e un modulo NestJS.", en: "An unofficial client for the gateway of Italy's electronic health record (FSE 2.0). It checks CDA2 documents before they are sent and prepares signed requests, with a CLI and a NestJS module." },
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
    slug: "fse-mcp",
    name: "fse-mcp",
    kind: { it: "Server MCP · open source", en: "MCP server · open source" },
    year: "2026",
    summary: { it: "Un server MCP che spiega perché il gateway FSE 2.0 rifiuta un documento CDA2 e cosa correggere. Si usa da Claude o dall'IDE e gira tutto in locale.", en: "An MCP server that explains why the FSE 2.0 gateway rejects a CDA2 document and what to fix. You use it from Claude or your IDE, and it runs entirely on your machine." },
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
    name: "nestjs-prisma-tenants",
    kind: { it: "Toolkit NestJS · open source", en: "NestJS toolkit · open source" },
    year: "2026",
    summary: { it: "Un database PostgreSQL per ogni cliente in un'app NestJS con Prisma 7. Manda ogni richiesta al database giusto, migra tutti i database partendo da un canary e isola il cliente il cui database smette di rispondere.", en: "One PostgreSQL database per customer in a NestJS app with Prisma 7. It sends each request to the right database, migrates every database starting from a canary and isolates a customer whose database stops responding." },
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
    name: "langgraph-nestjs-template",
    kind: { it: "Template agenti AI · open source", en: "AI agent template · open source" },
    year: "2026",
    summary: { it: "Backend per agenti AI con NestJS e LangGraph.js, pensato per agenti che compiono azioni: prima di agire chiedono l'approvazione, e dati e budget di ogni cliente restano separati.", en: "An AI agent backend with NestJS and LangGraph.js, built for agents that take actions: they ask for approval before acting, and each customer's data and budget stay separate." },
    lead: { it: "Un template per mettere in produzione agenti AI che toccano dati veri, su un'installazione condivisa da più clienti. Comprende il backend NestJS con LangGraph.js e una chat Next.js essenziale.", en: "A template for running AI agents that touch real data in production, on one deployment shared by several customers. It includes the NestJS backend with LangGraph.js and a bare-bones Next.js chat." },
    stack: "TypeScript · NestJS · LangGraph.js · Next.js · PostgreSQL · OpenTelemetry",
    features: [
      {
        name: { it: "Approvazione prima di agire", en: "Approval before acting" },
        tags: "LangGraph · interrupt",
        text: { it: "Quando l'agente vuole usare uno strumento con effetti, come l'invio di una email, il grafo si ferma e la chat mostra la chiamata. Gli argomenti si possono correggere prima di approvare, e un lock per conversazione impedisce che una doppia approvazione la esegua due volte.", en: "When the agent wants to use a tool with side effects, such as sending an email, the graph stops and the chat shows the call. The arguments can be edited before approving, and a per-conversation lock keeps a double approval from running it twice." },
        image: "/projects/langgraph-nestjs-template/approval-panel.webp",
        alt: { it: "La chat Next.js dopo la richiesta di inviare un'email a ops@example.com: un riquadro arancione 'Approval required' indica che l'agente vuole chiamare send_email e mostra gli argomenti to, subject e body in un campo modificabile, con i pulsanti Approve e Reject.", en: "The Next.js chat after asking to email ops@example.com: an orange 'Approval required' panel says the agent wants to call send_email and shows the to, subject and body arguments in an editable field, with Approve and Reject buttons." },
      },
      {
        name: { it: "Strumenti in sola lettura", en: "Read-only tools" },
        tags: "SSE · Next.js",
        text: { it: "Gli strumenti che leggono soltanto, come la ricerca nei documenti, girano senza chiedere. Il loro output arriva al modello marcato come non affidabile, e la risposta arriva al browser in streaming da un proxy che tiene la chiave API sul server.", en: "Tools that only read, such as document search, run without asking. Their output reaches the model marked as untrusted, and the answer streams to the browser through a proxy that keeps the API key on the server." },
        image: "/projects/langgraph-nestjs-template/chat-answer.webp",
        alt: { it: "La chat Next.js con la domanda 'What is the refund policy?', la riga 'Tool search_docs: success' e la risposta dell'agente: rimborso entro 30 giorni dall'acquisto, elaborato entro 5 giorni lavorativi.", en: "The Next.js chat with the question 'What is the refund policy?', the line 'Tool search_docs: success' and the agent's answer: refunds within 30 days of purchase, processed within 5 business days." },
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
        it: "Terminale: pnpm eval riproduce le risposte registrate, punteggio 1.00, e l'azione send_email si ferma in attesa di approvazione",
        en: "Terminal: pnpm eval replays recorded responses, score 1.00, and the send_email action pauses for approval",
      },
    },
    repo: "https://github.com/massimiliano-dev/langgraph-nestjs-template",
  },
];
