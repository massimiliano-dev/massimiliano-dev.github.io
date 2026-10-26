import { site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";

/** "A single quiet line": cosa è, i link, l'anno. */
export function Footer({ t }: { t: Dictionary }) {
  return (
    <footer className="footer">
      <span>{t.footer.what}</span>
      <span className="footer__links">
        <a className="link" href={site.github} target="_blank" rel="noreferrer">
          GitHub
        </a>
        {site.linkedin && (
          <a className="link" href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        )}

      </span>
      <span className="footer__end">
        © {new Date().getFullYear()} · {t.footer.note}
      </span>
    </footer>
  );
}
