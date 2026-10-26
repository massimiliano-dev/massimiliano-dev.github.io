import en from "@/content/dictionaries/en";
import it, { type Dictionary } from "@/content/dictionaries/it";
import type { Locale } from "@/content/site";

const dictionaries: Record<Locale, Dictionary> = { it, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
