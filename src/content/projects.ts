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
    lead: { it: "Toolkit TypeScript non ufficiale per il gateway FSE 2.0 del Fascicolo Sanitario Elettronico: valida i CDA2 in locale sugli XSD ufficiali e prepara le richieste firmate verso il gateway, con il CDA già allegato al PDF. Non è affiliato al Ministero della Salute né a Sogei.", en: "Unofficial TypeScript toolkit for the gateway of Italy's FSE 2.0 electronic health record: it validates CDA2 documents locally against the official XSD and prepares signed requests for the gateway, with the CDA already attached to the PDF. It is not affiliated with the Ministero della Salute or Sogei." },
    stack: "TypeScript · NestJS · libxml2 WASM · pdf-lib · mTLS",
    features: [
      {
        name: { it: "Validazione CDA2 locale", en: "Local CDA2 validation" },
        tags: "XSD · libxml2 WASM · CLI",
        text: { it: "fse validate controlla un documento CDA2 sugli XSD ufficiali di it-fse-catalogs, scaricati a un commit fissato. libxml2 gira in WebAssembly, senza moduli nativi. L'exit code dice se il file è valido e i valori citati negli errori diventano [VALUE], così nei log non finiscono dati clinici.", en: "fse validate checks a CDA2 document against the official it-fse-catalogs XSD, fetched at a pinned commit. libxml2 runs as WebAssembly, with no native modules. The exit code tells whether the file is valid, and values quoted in errors become [VALUE] so clinical data stays out of logs." },
        image: "/projects/fse-client/fse-validate.webp",
        alt: { it: "Terminale con tre esecuzioni di fse validate su CDA sintetici: il primo risulta VALID con exit code 0, gli altri due INVALID con exit code 1, uno per un elemento fuori ordine e uno per un birthTime il cui valore è mostrato come [VALUE].", en: "Terminal with three fse validate runs on synthetic CDAs: the first is VALID with exit code 0, the other two are INVALID with exit code 1, one for an out-of-order element and one for a birthTime whose value is shown as [VALUE]." },
      },
      {
        name: { it: "CDA allegato al PDF", en: "CDA attached to the PDF" },
        tags: "pdf-lib · PDF attachments",
        text: { it: "injectCda() inserisce il CDA nel PDF come allegato cda.xml, nel punto in cui il gateway lo cerca, ed extractCda() lo rilegge identico. I PDF già firmati o con altri allegati vengono rifiutati, perché il CDA va inserito prima della firma PAdES.", en: "injectCda() embeds the CDA in the PDF as the cda.xml attachment, where the gateway looks for it, and extractCda() reads it back unchanged. PDFs that are already signed or carry other attachments are refused, because the CDA has to go in before the PAdES signature." },
        image: "/projects/fse-client/pdf-cda-attachment.webp",
        alt: { it: "Il visualizzatore PDF di Chrome apre un referto sintetico di test; nella barra laterale degli allegati compare il file cda.xml.", en: "Chrome's PDF viewer showing a synthetic test report, with cda.xml listed in the attachments sidebar." },
      },
      {
        name: { it: "JWT firmati in dry-run", en: "Signed JWTs, dry run" },
        tags: "RS256 · mTLS · CLI",
        text: { it: "fse send --dry-run valida il CDA, lo allega al PDF e firma i due JWT RS256, con attachment_hash legato allo SHA-256 del PDF. Stampa la richiesta senza inviarla, con token e dati personali sostituiti da [REDACTED]. Chiavi e certificati arrivano solo da file indicati nelle variabili d'ambiente.", en: "fse send --dry-run validates the CDA, attaches it to the PDF and signs the two RS256 JWTs, with attachment_hash bound to the PDF's SHA-256. It prints the request without sending it, with tokens and personal data replaced by [REDACTED]. Keys and certificates come only from files set in environment variables." },
        image: "/projects/fse-client/fse-send-dry-run.webp",
        alt: { it: "Terminale: export delle variabili con certificati di test usa e getta, poi fse send --dry-run. Nel JSON stampato authorization, fse-jwt-signature, sub, locality e person_id valgono [REDACTED], mentre attachment_hash mostra l'hash del PDF.", en: "Terminal: exports pointing to throwaway test certificates, then fse send --dry-run. In the printed JSON, authorization, fse-jwt-signature, sub, locality and person_id read [REDACTED], while attachment_hash shows the PDF hash." },
      },
      {
        name: { it: "XML e log blindati", en: "Hardened XML and logs" },
        tags: "XXE · GDPR · redaction",
        text: { it: "Ogni documento con DOCTYPE o ENTITY viene rifiutato prima del parsing, perché la libxml2 in WebAssembly espande le entità esterne anche senza --noent. Passa solo UTF-8 fino a 10 MiB. redact() maschera JWT, chiavi PEM, codici fiscali e corpi CDA in ogni messaggio d'errore.", en: "Any document with a DOCTYPE or ENTITY is refused before parsing, because the WebAssembly libxml2 expands external entities even without --noent. Only UTF-8 up to 10 MiB gets through. redact() masks JWTs, PEM keys, fiscal codes and CDA bodies in every error message." },
        image: "/projects/fse-client/fse-safe-input.webp",
        alt: { it: "Terminale: fse validate rifiuta un CDA con DOCTYPE ed entità esterna e uno codificato in UTF-16, entrambi con exit code 1; sotto, redact() trasforma codice fiscale, token Bearer, chiave PEM e corpo XML in segnaposto [REDACTED].", en: "Terminal: fse validate refuses a CDA with a DOCTYPE and external entity and one encoded as UTF-16, both with exit code 1; below, redact() turns a fiscal code, a Bearer token, a PEM key and an XML body into [REDACTED] placeholders." },
      },
    ],
    figures: [
      { value: 77, label: { it: "test superati", en: "tests passing" } },
      { value: 6, label: { it: "pacchetti nel monorepo", en: "packages in the monorepo" } },
      { value: 2875, label: { it: "righe di TypeScript nei sorgenti", en: "lines of TypeScript source" } },
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
    summary: {
      it: "Un server MCP che spiega perché il gateway FSE 2.0 rifiuta un documento CDA2 e cosa cambiare. Lo usi da Claude o dall'IDE, gira tutto in locale e non fa chiamate di rete.",
      en: "An MCP server that explains why the FSE 2.0 gateway rejects a CDA2 document and what to change. You use it from Claude or your IDE; it runs locally and makes no network calls.",
    },
    lead: { it: "Server MCP non ufficiale che aiuta a capire perché il gateway FSE 2.0 rifiuta un documento CDA2. Gira in locale, senza chiamate di rete, accanto a Claude o a un IDE.", en: "An unofficial MCP server that helps developers understand why Italy's FSE 2.0 gateway rejects a CDA2 document. It runs locally, makes no network calls and sits next to Claude or an IDE." },
    stack: "TypeScript · Model Context Protocol · Zod · HL7 CDA",
    features: [
      {
        name: { it: "Spiegazione degli errori", en: "Gateway error explanations" },
        tags: "Schematron · HL7 CDA R2 · MCP",
        text: { it: "Si incolla il messaggio del gateway, per esempio ERRORE-28 sul legalAuthenticator, e il tool restituisce il testo ufficiale della regola con una spiegazione e la modifica da fare. Oggi le regole coperte sono cinque, scritte a mano per il referto di laboratorio.", en: "Paste the gateway message, for example ERRORE-28 on legalAuthenticator, and the tool returns the official rule text with a plain explanation and the change to make. Five rules are covered today, written by hand for the laboratory report." },
        image: "/projects/fse-mcp/inspector-explain.webp",
        alt: { it: "MCP Inspector in tema scuro collegato a fse-mcp: il tool explain_schematron_error mostra in JSON la regola ERRORE-28 dello schematron LAB v27.1, la spiegazione sul codice fiscale del firmatario e la correzione.", en: "MCP Inspector in dark mode connected to fse-mcp: explain_schematron_error shows as JSON rule ERRORE-28 of the LAB v27.1 schematron, the explanation about the signer's codice fiscale and the fix." },
      },
      {
        name: { it: "Controllo XML preliminare", en: "XML pre-flight guard" },
        tags: "XXE · XML · Security",
        text: { it: "validate_cda rifiuta DOCTYPE, dichiarazioni di entità e XInclude prima che un parser legga il documento, così un payload XXE non arriva al validatore. La validazione completa XSD e schematron non è ancora collegata, e il campo validator della risposta lo dice.", en: "validate_cda refuses DOCTYPE, entity declarations and XInclude before any parser reads the document, so an XXE payload never reaches the validator. Full XSD and schematron validation is not wired yet, and the validator field in the response says so." },
        image: "/projects/fse-mcp/inspector-preflight.webp",
        alt: { it: "MCP Inspector con il risultato di validate_cda: status rejected_preflight, validator \"stub (not implemented)\" e due errori, DTD_FORBIDDEN ed ENTITY_FORBIDDEN.", en: "MCP Inspector showing the validate_cda result: status rejected_preflight, validator \"stub (not implemented)\" and two errors, DTD_FORBIDDEN and ENTITY_FORBIDDEN." },
      },
      {
        name: { it: "Ricerca dei codici", en: "Code lookup" },
        tags: "LOINC · ICD9-CM · OID",
        text: { it: "lookup_code cerca un codice o una descrizione in LOINC, ICD9-CM, ATC, AIC e AdministrativeGender e restituisce l'OID da mettere in @codeSystem. I dizionari sono un campione di 22 codici presi da it-fse-catalogs, e la risposta lo segnala con sampleData.", en: "lookup_code searches a code or a display name in LOINC, ICD9-CM, ATC, AIC and AdministrativeGender and returns the OID to put in @codeSystem. The dictionaries are a sample of 22 codes from it-fse-catalogs, and the response flags it with sampleData." },
        image: "/projects/fse-mcp/inspector-lookup.webp",
        alt: { it: "MCP Inspector con il risultato di lookup_code per il codice LOINC 11502-2: display \"Laboratory report\", OID 2.16.840.1.113883.6.1 e sampleData true.", en: "MCP Inspector showing lookup_code for LOINC code 11502-2: display \"Laboratory report\", OID 2.16.840.1.113883.6.1 and sampleData true." },
      },
      {
        name: { it: "Scheletri CDA sintetici", en: "Synthetic CDA skeletons" },
        tags: "HL7 CDA R2 · Test fixtures",
        text: { it: "generate_sample_cda produce lo scheletro di un referto di laboratorio, di una lettera di dimissione, di un referto di radiologia o di un verbale di pronto soccorso. Paziente, medico e struttura sono inventati, così si lavora con un LLM senza esporre dati sanitari reali.", en: "generate_sample_cda returns a skeleton for a lab report, a discharge letter, a radiology report or an ER report. Patient, doctor and facility are fictional, so you can work with an LLM without exposing real health data." },
        image: "/projects/fse-mcp/terminal-sample-cda.webp",
        alt: { it: "Terminale con l'output di generate_sample_cda: l'intestazione XML di un referto di laboratorio sintetico con realmCode IT, templateId nazionale, codice LOINC 11502-2 e un codice fiscale fittizio marcato come SYNTHETIC.", en: "Terminal with generate_sample_cda output: the XML header of a synthetic laboratory report with realmCode IT, the national templateId, LOINC code 11502-2 and a fictional codice fiscale marked SYNTHETIC." },
      },
      {
        name: { it: "HTTP con token", en: "HTTP with token auth" },
        tags: "Streamable HTTP · Bearer token · DNS rebinding",
        text: { it: "Oltre a stdio il server parla Streamable HTTP, solo su loopback. Senza FSE_MCP_TOKEN non si avvia, una richiesta senza token riceve 401 e un header Host estraneo riceve 403 prima ancora del controllo del token.", en: "Besides stdio, the server speaks Streamable HTTP on loopback only. It will not start without FSE_MCP_TOKEN, a request without the token gets 401, and a foreign Host header gets 403 before the token is even checked." },
        image: "/projects/fse-mcp/terminal-http-auth.webp",
        alt: { it: "Terminale: il server rifiuta di avviarsi senza FSE_MCP_TOKEN, poi con curl una richiesta senza token riceve Unauthorized, una con Host attacker.example riceve Forbidden host e una autenticata elenca i quattro tool.", en: "Terminal: the server refuses to start without FSE_MCP_TOKEN, then with curl a request without the token gets Unauthorized, one with Host attacker.example gets Forbidden host and an authenticated one lists the four tools." },
      },
    ],
    figures: [
      { value: 53, label: { it: "test passati", en: "tests passing" } },
      { value: 4, label: { it: "tool MCP", en: "MCP tools" } },
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
    summary: {
      it: "Un database PostgreSQL per ogni cliente, con NestJS e Prisma 7. Tiene il registro dei tenant, limita le connessioni con una cache dei client, isola con un circuit breaker il tenant che va giù e migra tutti i database partendo da un canary.",
      en: "One PostgreSQL database per customer, with NestJS and Prisma 7. It keeps the tenant registry, caps connections with a client cache, isolates a failing tenant with a circuit breaker and migrates every database starting from a canary.",
    },
    lead: { it: "Un toolkit per applicazioni NestJS in cui ogni cliente ha un proprio database PostgreSQL e un proprio ruolo di accesso. Gestisce il registro dei tenant, l'instradamento di ogni richiesta verso il client Prisma giusto, le migrazioni su tutti i tenant e l'isolamento quando un database si guasta.", en: "A toolkit for NestJS apps where every customer gets its own PostgreSQL database and login role. It covers the tenant registry, routing each request to the right Prisma client, migrations across all tenants and isolation when one database fails." },
    stack: "TypeScript · NestJS · Prisma 7 · PostgreSQL",
    features: [
      {
        name: { it: "Provisioning con ruoli dedicati", en: "Provisioning with dedicated roles" },
        tags: "PostgreSQL · CLI · roles",
        text: { it: "tenants create crea un ruolo con login e un database di sua proprietà, revoca l'accesso pubblico, applica migrazioni e seed e registra il tenant nel database di controllo. Il ruolo di un tenant non accede al database di un altro. L'archiviazione disabilita il login e conserva i dati.", en: "tenants create makes a login role and a database owned by it, revokes public access, runs migrations and the seed, then records the tenant in the control database. One tenant's role cannot connect to another tenant's database. Archiving disables the login and keeps the data." },
        image: "/projects/nestjs-prisma-tenants/npt-provision.webp",
        alt: { it: "Terminale: tenants create per acme e globex, tenants archive umbrella, psql come tenant_acme rifiutato su tenant_globex per mancanza del privilegio CONNECT, elenco dei ruoli con il login di tenant_umbrella disattivato.", en: "Terminal: tenants create for acme and globex, tenants archive umbrella, psql as tenant_acme refused on tenant_globex for lack of CONNECT privilege, and a role list where tenant_umbrella has login disabled." },
      },
      {
        name: { it: "Migrazioni con canary", en: "Migrations with a canary" },
        tags: "Prisma Migrate · CLI · CI",
        text: { it: "tenants status elenca i tenant rimasti indietro rispetto all'ultima migrazione. Il comando migrate può girare in dry run, applica la modifica prima a un tenant canary e poi agli altri con concorrenza limitata. Se qualcosa fallisce esce con codice 1 e la pipeline si ferma.", en: "tenants status lists the tenants behind the latest migration. The migrate command can run as a dry run, applies the change to a canary tenant first and then to the others with limited concurrency. It exits with code 1 on any failure, so the pipeline stops." },
        image: "/projects/nestjs-prisma-tenants/npt-migrate.webp",
        alt: { it: "Terminale: tenants status con quattro tenant indietro, riepilogo del dry run, migrazione reale di acme, initech e globex in circa 0,5 secondi ciascuno, e tenants list con umbrella archiviato e rimasto sulla versione iniziale.", en: "Terminal: tenants status with four tenants behind, the dry run summary, a real migration of acme, initech and globex in about half a second each, and tenants list with umbrella archived on the initial schema." },
      },
      {
        name: { it: "Un database per richiesta", en: "One database per request" },
        tags: "NestJS · AsyncLocalStorage · LRU",
        text: { it: "Un middleware legge il tenant da sottodominio, header o claim JWT verificato e lo conserva in AsyncLocalStorage, così i provider restano singleton. Ogni richiesta riceve il PrismaClient del tenant da una cache LRU che limita le connessioni aperte. I tenant sconosciuti o archiviati ricevono 404.", en: "A middleware reads the tenant from the subdomain, a header or a verified JWT claim and keeps it in AsyncLocalStorage, so providers stay singletons. Each request gets the tenant's PrismaClient from an LRU cache that caps open connections. Unknown or archived tenants get a 404." },
        image: "/projects/nestjs-prisma-tenants/npt-resolution.webp",
        alt: { it: "Terminale: chiamate curl all'app demo. Una nota creata su acme compare solo nell'elenco di acme, globex e initech restituiscono le proprie note, umbrella risponde 404 e una richiesta senza tenant risponde 400.", en: "Terminal: curl calls to the demo app. A note created on acme shows up only in acme's list, globex and initech return their own notes, umbrella answers 404 and a request with no tenant answers 400." },
      },
      {
        name: { it: "Circuit breaker per tenant", en: "Per-tenant circuit breaker" },
        tags: "resilience · Prisma · PostgreSQL",
        text: { it: "Ogni tenant ha un circuit breaker che conta solo gli errori di connessione. Nella demo, tolto il login a globex, cinque richieste sono fallite e il circuito si è aperto: le successive hanno ricevuto 503 in circa 3 ms, mentre acme e initech rispondevano ancora 200.", en: "Each tenant has its own circuit breaker, which counts only connection errors. In the demo, after login was revoked for globex, five requests failed and the circuit opened. Later requests got a 503 in about 3 ms while acme and initech kept answering 200." },
        image: "/projects/nestjs-prisma-tenants/npt-circuit.webp",
        alt: { it: "Terminale: ALTER ROLE tenant_globex NOLOGIN, poi sette richieste a globex con cinque HTTP 500 e due HTTP 503 in circa 3,5 ms. acme e initech rispondono HTTP 200 e l'endpoint di health mostra il circuito di globex aperto.", en: "Terminal: ALTER ROLE tenant_globex NOLOGIN, then seven requests to globex with five HTTP 500 and two HTTP 503 in about 3.5 ms. acme and initech answer HTTP 200 and the health endpoint shows the globex circuit open." },
      },
    ],
    figures: [
      { value: 36, label: { it: "test unitari superati", en: "unit tests passing" } },
      { value: 33, label: { it: "test di integrazione su PostgreSQL reale", en: "integration tests against real PostgreSQL" } },
      { value: 4, label: { it: "pacchetti npm", en: "npm packages" } },
      { value: 2865, label: { it: "righe di TypeScript nei sorgenti", en: "lines of TypeScript source" } },
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
    summary: {
      it: "Backend per agenti AI con NestJS e LangGraph.js, per quando l'agente fa cose vere: chiede l'approvazione prima delle azioni con effetti, tiene separati i clienti, controlla costi e budget e verifica le risposte con eval in CI.",
      en: "An AI agent backend with NestJS and LangGraph.js, for when the agent does real things: it asks for approval before side effects, keeps customers apart, tracks cost and budget and checks answers with evals in CI.",
    },
    lead: { it: "Backend per agenti in NestJS e LangGraph.js, con una chat Next.js minimale, pensato per tool che modificano dati e per un deployment condiviso da più clienti. I tool con effetti collaterali aspettano l'approvazione di una persona, e thread, limiti e tracce sono separati per tenant.", en: "A NestJS and LangGraph.js agent backend with a minimal Next.js chat, built for tools that change things and for one deployment shared by several customers. Side-effect tools wait for human approval, and threads, limits and traces are kept per tenant." },
    stack: "TypeScript · NestJS · LangGraph.js · Next.js · PostgreSQL · OpenTelemetry",
    features: [
      {
        name: { it: "Approvazione prima degli effetti", en: "Approval before side effects" },
        tags: "interrupt() · zod · LangGraph",
        text: { it: "I tool marcati sideEffects fermano il grafo con interrupt(). La chat mostra la chiamata e gli argomenti, modificabili prima di approvare o rifiutare. Gli argomenti modificati vengono validati di nuovo con zod e un lock per thread impedisce che una doppia approvazione esegua due volte.", en: "Tools marked sideEffects pause the graph with interrupt(). The chat shows the call and its arguments, which can be edited before approving or rejecting. Edited arguments are validated again with zod, and a per-thread lock stops a double approval from running the tool twice." },
        image: "/projects/langgraph-nestjs-template/approval-panel.webp",
        alt: { it: "La chat Next.js dopo la richiesta di inviare un'email a ops@example.com: un riquadro arancione 'Approval required' indica che l'agente vuole chiamare send_email e mostra gli argomenti to, subject e body in un campo modificabile, con i pulsanti Approve e Reject.", en: "The Next.js chat after asking to email ops@example.com: an orange 'Approval required' panel says the agent wants to call send_email and shows the to, subject and body arguments in an editable field, with Approve and Reject buttons." },
      },
      {
        name: { it: "Tool in sola lettura", en: "Read-only tools" },
        tags: "SSE · Next.js · proxy",
        text: { it: "I tool in sola lettura come search_docs girano senza chiedere conferma. Il loro output arriva al modello marcato come dato non affidabile. La risposta arriva al browser in streaming SSE, attraverso un proxy Next.js che tiene la chiave API sul server.", en: "Read-only tools such as search_docs run without asking. Their output reaches the model marked as untrusted data. The answer streams to the browser over SSE through a Next.js proxy that keeps the API key on the server." },
        image: "/projects/langgraph-nestjs-template/chat-answer.webp",
        alt: { it: "La chat Next.js con la domanda 'What is the refund policy?', la riga 'Tool search_docs: success' e la risposta dell'agente: rimborso entro 30 giorni dall'acquisto, elaborato entro 5 giorni lavorativi.", en: "The Next.js chat with the question 'What is the refund policy?', the line 'Tool search_docs: success' and the agent's answer: refunds within 30 days of purchase, processed within 5 business days." },
      },
      {
        name: { it: "Tenant isolati e limiti", en: "Tenant isolation and limits" },
        tags: "NestJS guards · PostgreSQL",
        text: { it: "Ogni thread appartiene a un tenant e un altro tenant riceve lo stesso 404 di un id inesistente. Ogni tenant ha il suo rate limit e un budget mensile di token, controllati prima di chiamare il modello. Oltre la soglia l'API risponde 429.", en: "Every thread belongs to a tenant, and another tenant gets the same 404 as an unknown id. Each tenant has its own rate limit and monthly token budget, checked before the model is called. Past the limit the API answers 429." },
        image: "/projects/langgraph-nestjs-template/tenancy-limits.webp",
        alt: { it: "Terminale con chiamate curl all'API: 401 senza chiave, un thread creato dal tenant acme, 404 quando lo legge il tenant globex, 429 per budget mensile esaurito, poi cinque 201 seguiti da 429 con Retry-After per il tenant initech.", en: "Terminal with curl calls to the API: 401 without a key, a thread created by tenant acme, 404 when tenant globex reads it, 429 for an exhausted monthly budget, then five 201s followed by 429 with Retry-After for tenant initech." },
      },
      {
        name: { it: "Tracce con costo", en: "Traces with cost" },
        tags: "OpenTelemetry · OTLP",
        text: { it: "Gli span OpenTelemetry di ogni run, chiamata al modello e tool riportano tenant, token e costo stimato in dollari da una tabella prezzi configurabile. Prompt e argomenti dei tool restano fuori dalle tracce, a meno di attivare la cattura dei contenuti.", en: "OpenTelemetry spans for each run, model call and tool call carry the tenant, token counts and an estimated USD cost from a configurable price table. Prompts and tool arguments stay out of traces unless content capture is turned on." },
        image: "/projects/langgraph-nestjs-template/otel-spans.webp",
        alt: { it: "Terminale con gli span ricevuti via OTLP per un invio email: agent.run interrotto con token e llm.cost.usd, tool.send_email con side_effects=true e decision=approve, poi agent.run di ripresa completato.", en: "Terminal with spans received over OTLP for one email send: an interrupted agent.run with tokens and llm.cost.usd, tool.send_email with side_effects=true and decision=approve, then a completed resume agent.run." },
      },
      {
        name: { it: "Eval ripetute in CI", en: "Evals replayed in CI" },
        tags: "Vitest · replay · CI",
        text: { it: "I casi di eval ripetono risposte del modello registrate attraverso il grafo e i tool reali, quindi ogni pull request li verifica offline e senza costi. Un job notturno usa lo stesso dataset con il modello vero. Le registrazioni vengono ripulite dalle credenziali.", en: "Eval cases replay recorded model responses through the real graph and tools, so every pull request checks them offline at no cost. A nightly job runs the same dataset against the live model. Recordings are scrubbed of credentials." },
        image: "/projects/langgraph-nestjs-template/evals-tests.webp",
        alt: { it: "Terminale con l'esecuzione delle eval in replay, punteggio 1.00 su soglia 0.8 e tre casi PASS, seguita da pnpm test con 4 file e 35 test superati.", en: "Terminal with the replay eval run, score 1.00 against a 0.8 threshold and three PASS cases, followed by pnpm test with 4 files and 35 tests passed." },
      },
    ],
    figures: [
      { value: 35, label: { it: "test superati (pnpm test)", en: "tests passing (pnpm test)" } },
      { value: 3, label: { it: "casi di eval in replay, punteggio 1.00", en: "replay eval cases, score 1.00" } },
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
