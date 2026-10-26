// Dati personali e link usati in tutto il sito. Un solo posto da aggiornare.
export const site = {
  name: "Massimiliano Polce",
  firstName: "Massimiliano",
  lastName: "Polce",
  url: "https://massimiliano-dev.github.io",
  github: "https://github.com/massimiliano-dev",
  githubHandle: "massimiliano-dev",
  linkedin: "https://www.linkedin.com/in/massimiliano-polce-ba284313b",
  email: "massimiliano.p96@outlook.com",
} as const;

export const locales = ["it", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "it";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
