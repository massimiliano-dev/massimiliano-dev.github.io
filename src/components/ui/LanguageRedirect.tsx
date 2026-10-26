"use client";

import { useEffect } from "react";

import { defaultLocale, isLocale } from "@/content/site";
import { withBase } from "@/lib/paths";

export const LOCALE_KEY = "locale";

/** Porta alla lingua scelta l'ultima volta, altrimenti a quella del browser. */
export function LanguageRedirect() {
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(LOCALE_KEY);
    } catch {
      // Storage bloccato: si decide dalla lingua del browser.
    }
    const browser = navigator.language.slice(0, 2).toLowerCase();
    const lang = saved && isLocale(saved) ? saved : isLocale(browser) ? browser : defaultLocale;
    window.location.replace(withBase(`/${lang}/`) + window.location.hash);
  }, []);
  return null;
}
