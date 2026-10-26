import { HeroStrip, type HeroFrame } from "@/components/ui/HeroStrip";
import { projects } from "@/content/projects";
import { type Locale, site } from "@/content/site";
import { framesOf } from "@/lib/frames";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath, sectionIds } from "@/lib/sections";

/** Il fotogramma più rappresentativo di ogni progetto, poi tutti gli altri: la pellicola apre con un giro completo. */
function heroFrames(lang: Locale): HeroFrame[] {
  const perProject = projects.map((p) => {
    const href = p.features?.length ? withBase(projectPath(lang, p.slug)) : (p.repo ?? "#");
    return framesOf(p, lang).map((f) => ({ thumb: f.thumb, ratio: f.ratio, href, alt: f.alt, project: p.name, kind: p.kind[lang] }));
  });
  const first = perProject.map((list) => list[0]);
  const rest = perProject.flatMap((list) => list.slice(1));
  return [...first, ...rest];
}

/**
 * "Contact sheet": il nome in grande, tre blocchi di testo piccolo e subito sotto la striscia illuminata
 * con i fotogrammi di tutti i progetti.
 */
export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  const ids = sectionIds(lang);
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

      <div className="hero__strip" data-load="frame">
        <HeroStrip
          frames={heroFrames(lang)}
          labels={{ stripLabel: t.hero.stripLabel, stripHint: t.hero.stripHint, open: t.projects.open }}
        />
      </div>
    </section>
  );
}
