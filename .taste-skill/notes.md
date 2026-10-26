# Note di lavoro (tasteskill)

## Brief
Portfolio personale di Massimiliano Polce (GitHub: massimiliano-dev), full-stack developer.
Pubblico: recruiter, sviluppatori, persone che arrivano da GitHub. Bilingue IT/EN.
Cosa deve fare il visitatore: capire chi è e cosa costruisce, aprire GameMode (repo / download), contattarlo.
Stack: Next.js 16 static export su GitHub Pages. Brief utente: "super animato, anche 3D", dark neon / gaming.
Immagini che esistono davvero: nessuna foto, nessuno screenshot. Esiste l'interfaccia reale di GameMode (codice React + CSS):
la ricostruisco in HTML come frammenti `data-ui`. Esiste il logo (D-pad con braccio play).

## Inventario del soggetto (cose che appartengono solo a lui)
1. Il logo di GameMode: un D-pad la cui freccia destra è un tasto Play.
2. Il tasto Guide del controller: apre l'overlay in-game (ora, batteria, volume, pausa, chiudi gioco).
3. La "modalità console": GameMode prende il posto di Explorer come shell di Windows, con un watchdog che riporta Explorer se si ferma.
4. Una libreria sola per sette fonti: Steam, Xbox, Epic (via legendary, senza launcher Epic), GOG, EA, Ubisoft, emulatori.
5. Il telefono che diventa telecomando: QR o codice a 6 cifre, server HTTP/WebSocket in rete locale.
6. I numeri reali del repo: ~30.000 righe di Rust, ~11.400 di TypeScript, 3.500 di CSS, 57 moduli Rust, versione 0.2.6, canali stable e beta.
7. Le righe di Home di GameMode: "Continua a giocare", "Preferiti", "Aggiunti di recente" — copertine verticali 600x900.
8. La palette del launcher: fondo #07090d, menta #5ef2c8, testo #f3f5f8. Font Outfit. Leggibile da un TV dall'altra parte della stanza.
9. I pulsanti A / B / X / Y e le hint in basso: "A Dettagli · X Gioca · Y Preferito".
10. Commit in italiano, scritti come frasi: "Overlay: il gioco va in pausa finché l'overlay è aperto".
11. Gli screenshot da controller con Windows Graphics Capture.
12. Il lavoro del giorno: Keynet (SaaS, gestionali, CRM) — full-stack web.

## Argomento (una claim per sezione, con la prova)
0. Hero — Sono Massimiliano, costruisco software full-stack, e il mio progetto personale è un launcher per giocare col controller. → nome grande, D-pad 3D, bottone "Guarda GameMode".
1. Lavoro — Il progetto: GameMode trasforma un PC Windows in una console. → interfaccia ricostruita (home con copertine), feature con frammenti reali (overlay Guide, telefono, store), numeri del repo, link repo + download.
2. Chi sono — Lavoro su tutto lo stack: web di giorno, Rust e desktop la sera. → testo in prima persona + elenco degli strumenti che uso davvero, divisi per livello dello stack.
3. Contatti — Scrivimi o guarda il codice. → email grande, GitHub, LinkedIn.
(Nessuna sezione testimonial, logo clienti, statistiche inventate.)

## Direzione (draw.mjs, seed 1431651019)
Scelta: **pinned-poster** tra type-only-statement / name-as-monument / pinned-poster.
Perché: "qualcosa resta fermo mentre il resto cambia" è la modalità console: lo schermo resta, cambia la schermata.

Redraw e scostamenti:
- section:about → about-side-facts-wide-paragraph. Il blueprint dealt vuole ritratti di persone: non ce ne sono (l'utente non vuole foto).
- section:contact → contact-email-display. Il blueprint dealt vuole la foto di un luogo fisico: non esiste.
- Palette: tenute le proporzioni (un fondo, un inchiostro, un accento), colori presi da GameMode (#07090d / #f3f5f8 / menta #5ef2c8): il soggetto ha colori suoi e il brief chiede dark neon. Oro scartato.
- Fotografie "Architecture" dealt: non usate. Immagini = screenshot reali di GameMode catturati dal suo frontend con backend simulato (npm run dev) + pagina companion reale. Copertine dei giochi: arte di Steam caricata dal mock di GameMode stesso.
- Heading aggiunto ad "about" (house rule: ogni sezione ha un titolo).
- Motion: niente cursore custom, preloader, scramble (house rules, sostituiscono il piano iniziale).

## L'idea
Su questa pagina, **il D-pad del logo di GameMode (la cui freccia destra è Play)** diventa **il frame fermo al centro dell'hero, e i tasti del pad muovono la pagina**.
Test del concorrente: "il logo di Playnite / di Steam Big Picture diventa il frame" non regge: il D-pad-con-Play è solo suo.

## La cosa viva
Il D-pad 3D nell'hero si preme: frecce della tastiera, tap sul telefono o un controller vero (Gamepad API). Play porta a GameMode.
Con un controller collegato, D-pad su/giù sposta tra le sezioni e A apre l'azione della sezione, come in GameMode.
Fallback senza script: il frame mostra il logo statico, i link restano link.

## 3D
- Hero frame 1: D-pad estruso dal path del logo, pezzi separati per premere i bracci, bloom sulla menta.
- Contatti: lo stesso D-pad in inchiostro scuro sul campo menta, ruota con lo scroll, il Play punta all'email.
- Lavoro: screenshot con tilt prospettico CSS 3D sotto il puntatore.

## Revisione dopo il feedback dell'utente (26/10/2026)
L'utente: "graficamente non mi fa impazzire", testi sovrapposti, il riquadro verde dell'hero è brutto, l'immagine di GameMode è sgranata,
e soprattutto "non incentrarti solo su GameMode, arrivano altri 4 progetti".
- Hero: niente più frame centrale (era il "quadrato verde"). Composizione presa da `name-as-monument` (dealt tra le tre opzioni):
  nome su una riga da margine a margine sul bordo basso, scena 3D a tutto schermo sopra, frase e azione in alto a sinistra.
- Oggetto 3D: non più il D-pad di GameMode ma una pila di tre livelli (database, server, interfaccia), dalla frase
  "scrivo software dal database all'interfaccia". La cosa viva: si trascina per girarla, frecce e controller la girano.
- Il neon (griglia, bloom, particelle) vive solo nel WebGL: il DOM resta senza glow e gradienti (house rules).
- Progetti: lo stage "Small index, large picture" ora indicizza i progetti (era usato per le funzioni di GameMode).
  Ogni progetto con `features` ha la sua pagina con apertura, schermo inclinato che si raddrizza, funzioni, numeri.
- Media: video e screenshot ricatturati a 1920×1080; nello stage le immagini 16:9 restano intere, mai ritagliate.
- Inspector home: resta `few-pictures` (un solo progetto = una sola copertina). Si risolve con i prossimi progetti;
  non aggiungo immagini di GameMode in home per non ricentrare tutto su di lui.

## Seconda direzione (26/10/2026): "The contact sheet"
L'utente non apprezzava la direzione "pinned poster" e ha scelto tra quattro opzioni l'archivio a colpo d'occhio,
tenendo tema scuro, 3D, molte animazioni e font. Deal: contact-sheet, seed 1388172855, --keep palette,type.
- Hero "Lit strip, four corners" adattato: nome a tutta larghezza (la direzione chiede il nome a display size in alto),
  tre blocchi di testo su griglia a 12 colonne, poi la striscia illuminata. La striscia è una pellicola 3D (R3F):
  fotogrammi reali dei progetti su una curva, quello centrale acceso con un filo menta in bloom, trascinabile.
  Fallback: striscia HTML con scroll-snap (telefono, movimento ridotto, niente script).
- Lavoro "One strip per project": colonna ferma con titolo e filtri, una striscia trascinabile per progetto.
- Contatti "Photo strip, three-cell bar": fascia di fotogrammi in marquee, tre blocchi (GitHub, LinkedIn, email).
- Footer "A footer of tiles", con l'ora italiana.
- Foto "City at night" dealt: non usate, le immagini sono tutte catture reali dei progetti (30 fotogrammi).
