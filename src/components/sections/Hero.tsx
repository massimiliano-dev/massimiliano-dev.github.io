import { projects } from "@/content/projects";
import { type Locale, site } from "@/content/site";
import { type Frame, framesOf } from "@/lib/frames";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath, sectionIds } from "@/lib/sections";

interface WallFrame extends Frame {
  href: string;
}

/** Tutti i fotogrammi dei progetti, alternati tra progetti e distribuiti su tre file. */
function wallRows(lang: Locale): WallFrame[][] {
  const perProject = projects.map((p) => {
    const href = p.features?.length ? withBase(projectPath(lang, p.slug)) : (p.repo ?? "#");
    return framesOf(p, lang).map((f) => ({ ...f, href }));
  });
  const longest = Math.max(...perProject.map((l) => l.length));
  const interleaved: WallFrame[] = [];
  for (let i = 0; i < longest; i++) for (const list of perProject) if (list[i]) interleaved.push(list[i]);
  const rows: WallFrame[][] = [[], [], []];
  interleaved.forEach((f, i) => rows[i % 3].push(f));
  return rows;
}

/**
 * "Contact sheet": il nome in grande, tre blocchi di testo piccolo e sotto la parete dei provini,
 * tutti i fotogrammi dei progetti su un piano inclinato, in file che scorrono piano in direzioni opposte.
 */
export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  const ids = sectionIds(lang);
  const rows = wallRows(lang);
  return (
    <section className="hero" id="top" data-hero aria-labelledby="hero-title">
      <h1 className="hero__name display" id="hero-title">
        <span className="hero__line">
          <span data-load="name">{site.firstName}</span>
        </span>{" "}
        <span className="hero__line">
          <span data-load="name">{site.lastName}</span>
        </span>
      </h1>

      <div className="hero__blocks" data-load="aside">
        <p className="hero__who">{t.hero.who}</p>
        <p className="hero__sentence">{t.hero.sentence}</p>
        <div className="hero__actions">
          <a className="btn btn--accent" href={`#${ids.work}`} data-primary>
            {t.hero.action} <span className="btn__arrow" aria-hidden>→</span>
          </a>
          <a className="link" href={`#${ids.contact}`}>
            {t.hero.contact}
          </a>
        </div>
      </div>

      <div className="wall" data-load="frame" data-wall role="region" aria-label={t.hero.stripLabel}>
        <div className="wall__tilt" data-wall-tilt>
          <div className="wall__plane" data-wall-plane>
            {rows.map((row, r) => (
              <div className={`wall__row wall__row--${r}`} key={r}>
                {/* Due copie della fila: quando la prima esce, la seconda è già al suo posto. */}
                {[0, 1].map((copy) => (
                  <ul className="wall__track" key={copy} aria-hidden={copy === 1}>
                    {row.map((f) => (
                      <li key={`${copy}-${f.src}`} style={{ "--ratio": f.ratio } as React.CSSProperties}>
                        <a
                          href={f.href}
                          data-name={f.project.name}
                          aria-label={`${t.projects.open}: ${f.project.name}`}
                          tabIndex={copy === 1 ? -1 : undefined}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={withBase(f.thumb)}
                            alt={copy === 1 ? "" : f.alt}
                            width={Math.round(540 * f.ratio)}
                            height={540}
                            loading={r === 0 ? "eager" : "lazy"}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <p className="wall__hint">{t.hero.stripHint}</p>
    </section>
  );
}
