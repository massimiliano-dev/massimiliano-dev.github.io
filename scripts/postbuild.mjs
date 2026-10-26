// GitHub Pages serve out/404.html per ogni indirizzo che non esiste.
// Quello generato da Next mostra una pagina generica: lo sostituiamo con uno che riporta alla home nella lingua giusta.
import { copyFileSync, rmSync } from "node:fs";

copyFileSync("static/404.html", "out/404.html");
rmSync("out/404", { recursive: true, force: true });
console.log("postbuild: out/404.html sostituito");
