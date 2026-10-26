// Dati personali e link usati in tutto il sito. Un solo posto da aggiornare.
export const site = {
  name: "Massimiliano Polce",
  firstName: "Massimiliano",
  lastName: "Polce",
  url: "https://massimiliano-dev.github.io",
  github: "https://github.com/massimiliano-dev",
  githubHandle: "massimiliano-dev",
  // TODO: inserire l'URL del profilo LinkedIn. Finché è vuoto il link non compare.
  linkedin: "",
  // TODO: sostituire con l'indirizzo email pubblico. example.com è un dominio riservato:
  // non recapita a nessuno, quindi il sito non manda posta a sconosciuti nel frattempo.
  email: "massimiliano@example.com",
} as const;

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
