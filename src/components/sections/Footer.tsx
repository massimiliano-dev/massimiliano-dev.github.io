import { RomeClock } from "@/components/ui/RomeClock";
import { type Locale, site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { sectionIds } from "@/lib/sections";

/** "A footer of tiles": le ultime due righe della tavola, ogni cella usata. */
export function Footer({ t, lang }: { t: Dictionary; lang: Locale }) {
  const ids = sectionIds(lang);
  const home = withBase(`/${lang}/`);
  return (
    <footer className="footer">
      <div className="tile tile--statement">
        <p className="tile__big">{t.footer.statement}</p>
        <p className="tile__small">
          © {new Date().getFullYear()} {site.name} · {t.footer.note}
        </p>
      </div>
      <nav className="tile tile--nav" aria-label={t.nav.label}>
        <ul>
          <li>
            <a className="link" href={`${home}#${ids.work}`}>
              {t.nav.work}
            </a>
          </li>
          <li>
            <a className="link" href={`${home}#${ids.about}`}>
              {t.nav.about}
            </a>
          </li>
          <li>
            <a className="link" href={`${home}#${ids.contact}`}>
              {t.nav.contact}
            </a>
          </li>
          <li>
            <a className="link" href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
          {site.linkedin && (
            <li>
              <a className="link" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </nav>
      <div className="tile tile--time">
        <span className="tile__small">{t.footer.time}</span>
        <RomeClock lang={lang} />
      </div>
      <div className="tile tile--email">
        <span className="tile__small">Email</span>
        <a className="tile__email link" href={`mailto:${site.email}`}>
          {site.email.split("@")[0]}@
          <wbr />
          {site.email.split("@")[1]}
        </a>
      </div>
      <div className="tile tile--wordmark" aria-hidden>
        <span className="display">{site.name}</span>
      </div>
      <a className="tile tile--invite" href={`mailto:${site.email}`}>
        <span className="tile__invite">{t.footer.invite}</span>
        <svg className="tile__arrow" viewBox="0 0 48 48" aria-hidden>
          <path d="M12 36 36 12M16 12h20v20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square" />
        </svg>
      </a>
    </footer>
  );
}
