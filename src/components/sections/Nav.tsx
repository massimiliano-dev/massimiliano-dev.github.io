import { LangSwitch } from "@/components/ui/LangSwitch";
import { type Locale, site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { sectionIds } from "@/lib/sections";

/**
 * La barra in alto: nome, tre link, la lingua, GitHub.
 * Sulle pagine dei progetti i link puntano alle sezioni della home, e la lingua alla stessa pagina tradotta.
 */
export function Nav({ t, lang, home = true, alternate }: { t: Dictionary; lang: Locale; home?: boolean; alternate?: string }) {
  const other: Locale = lang === "it" ? "en" : "it";
  const ids = sectionIds(lang);
  const base = home ? "" : withBase(`/${lang}/`);
  return (
    <header className="nav" data-load>
      <a className="nav__mark" href={home ? "#top" : withBase(`/${lang}/`)}>
        {site.name}
      </a>
      <nav aria-label={t.nav.label}>
        <ul className="nav__links">
          <li>
            <a className="link" href={`${base}#${ids.work}`}>
              {t.nav.work}
            </a>
          </li>
          <li>
            <a className="link" href={`${base}#${ids.about}`}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a className="link" href={`${base}#${ids.contact}`}>
              {t.nav.contact}
            </a>
          </li>
        </ul>
      </nav>
      <LangSwitch to={other} href={alternate ?? withBase(`/${other}/`)} label={t.nav.switchTo} short={t.nav.switchShort} />
      <a className="btn btn--ink btn--small" href={site.github} target="_blank" rel="noreferrer">
        {t.nav.github}
      </a>
    </header>
  );
}
