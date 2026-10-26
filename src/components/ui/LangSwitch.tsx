"use client";

import type { Locale } from "@/content/site";

import { LOCALE_KEY } from "./LanguageRedirect";

/** Link all'altra lingua: ricorda la scelta per le visite successive alla radice. */
export function LangSwitch({ to, href, label, short }: { to: Locale; href: string; label: string; short: string }) {
  return (
    <a
      className="nav__lang"
      href={href}
      hrefLang={to}
      lang={to}
      aria-label={label}
      onClick={() => {
        try {
          localStorage.setItem(LOCALE_KEY, to);
        } catch {
          // Storage bloccato: la scelta vale solo per questa visita.
        }
      }}
    >
      {short}
    </a>
  );
}
