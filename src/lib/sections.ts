import type { Locale } from "@/content/site";

/** Gli id delle sezioni, tradotti negli URL (#chi-sono / #about). */
export function sectionIds(lang: Locale) {
  return lang === "it"
    ? { work: "progetti", about: "chi-sono", contact: "contatti" }
    : { work: "projects", about: "about", contact: "contact" };
}

/** Il percorso della pagina di un progetto, nella sua lingua. */
export function projectPath(lang: Locale, slug: string) {
  return lang === "it" ? `/it/progetti/${slug}/` : `/en/projects/${slug}/`;
}
