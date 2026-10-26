import { Lightbox } from "@/components/ui/Lightbox";
import { LoopVideo } from "@/components/ui/LoopVideo";
import { type Project, projects } from "@/content/projects";
import type { Locale } from "@/content/site";
import { framesOf } from "@/lib/frames";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath, sectionIds } from "@/lib/sections";

const numberFormat: Record<Locale, Intl.NumberFormat> = {
  it: new Intl.NumberFormat("it-IT"),
  en: new Intl.NumberFormat("en-US"),
};

/** La pagina di un progetto nello stesso linguaggio della home: testi piccoli, una striscia grande, righe ordinate. */
export function ProjectDetail({ project, t, lang }: { project: Project; t: Dictionary; lang: Locale }) {
  const frames = framesOf(project, lang);
  const withPage = projects.filter((p) => p.features?.length);
  const next = withPage.length > 1 ? withPage[(withPage.indexOf(project) + 1) % withPage.length] : null;
  const nextName = next ? next.name : t.projects.title;
  const nextHref = withBase(next ? projectPath(lang, next.slug) : `/${lang}/#${sectionIds(lang).work}`);

  return (
    <>
      <section className="pd-head" aria-labelledby="project-title">
        <h1 className="pd-head__name display" id="project-title" style={{ "--chars": project.name.length } as React.CSSProperties}>
          <span className="hero__line">
            <span data-load="name">{project.name}</span>
          </span>
        </h1>
        <div className="pd-head__blocks" data-load="aside">
          <dl className="pd-head__facts">
            <div>
              <dt>{lang === "it" ? "Tipo" : "Type"}</dt>
              <dd>{project.kind[lang]}</dd>
            </div>
            <div>
              <dt>{lang === "it" ? "Anno" : "Year"}</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Stack</dt>
              <dd>{project.stack}</dd>
            </div>
          </dl>
          <div className="pd-head__actions">
            {project.repo && (
              <a className="btn btn--accent" href={project.repo} target="_blank" rel="noreferrer" data-primary>
                {t.project.repo} <span className="btn__arrow" aria-hidden>→</span>
              </a>
            )}
            {project.download && (
              <a className="btn btn--quiet" href={project.download} target="_blank" rel="noreferrer">
                {t.project.download}
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="intro" aria-labelledby="intro-title">
        <h2 className="intro__title display" id="intro-title" data-reveal="rise">
          {t.project.intro}
        </h2>
        <div className="intro__text">
          {project.intro[lang].map((para) => (
            <p key={para.slice(0, 24)} data-reveal="rise">
              {para}
            </p>
          ))}
        </div>
        <dl className="intro__facts" data-reveal="list">
          <div>
            <dt>{t.project.audience}</dt>
            <dd>{project.audience[lang]}</dd>
          </div>
          <div>
            <dt>{t.project.status}</dt>
            <dd>{project.status[lang]}</dd>
          </div>
        </dl>
      </section>

      {/* La striscia grande: tutte le immagini del progetto, da trascinare di lato. */}
      <section className="pd-strip" aria-label={project.name}>
        <ul className="strip strip--big" data-drag data-frames>
          {project.cover.video && (
            <li style={{ "--ratio": 16 / 9 } as React.CSSProperties}>
              <LoopVideo base={project.cover.video} poster={project.cover.image} label={project.cover.alt[lang]} />
            </li>
          )}
          {frames
            .filter((f) => !(project.cover.video && f.src === project.cover.image))
            .map((f) => (
              <li key={f.src} style={{ "--ratio": f.ratio } as React.CSSProperties}>
                <button type="button" className="zoom" data-zoom={withBase(f.src)} data-alt={f.alt} aria-label={f.alt}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={withBase(f.thumb)} alt="" width={Math.round(540 * f.ratio)} height={540} loading="lazy" />
                </button>
              </li>
            ))}
        </ul>
        {project.screenCaption && <p className="pd-strip__caption">{project.screenCaption[lang]}</p>}
      </section>

      <section className="solves" aria-labelledby="solves-title">
        <h2 className="solves__title display" id="solves-title" data-reveal="rise">
          {t.project.solves}
        </h2>
        <ul className="solves__list">
          {project.solves.map((item) => (
            <li className="solve" key={item.problem.en} data-reveal="rise">
              <p className="solve__problem">{item.problem[lang]}</p>
              <p className="solve__answer">{item.answer[lang]}</p>
            </li>
          ))}
        </ul>
      </section>

      {project.features && project.features.length > 0 && (
        <section className="pd-features" aria-labelledby="features-title">
          <h2 className="pd-features__title display" id="features-title" data-reveal="rise">
            {t.project.featuresTitle}
          </h2>
          <ul className="pd-features__list">
            {project.features.map((f) => (
              <li className="feat" key={f.image} data-reveal="rise">
                <div className="feat__head">
                  <h3 className="feat__name">{f.name[lang]}</h3>
                  <span className="feat__tags">{f.tags}</span>
                </div>
                <p className="feat__text">{f.text[lang]}</p>
                <button
                  type="button"
                  className={`zoom feat__shot${f.portrait ? " feat__shot--portrait" : ""}`}
                  data-zoom={withBase(f.image)}
                  data-alt={f.alt[lang]}
                  aria-label={f.alt[lang]}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={withBase(f.image.replace(/\/([^/]+)$/, "/thumbs/$1"))}
                    alt=""
                    width={f.portrait ? 250 : 960}
                    height={540}
                    loading="lazy"
                  />
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {project.figures && project.figures.length > 0 && (
        <section className="figures" aria-labelledby="figures-title">
          <h2 className="figures__title" id="figures-title" data-reveal="rise">
            {t.project.figuresTitle}
          </h2>
          <dl className="figures__list" data-reveal="list">
            {project.figures.map((fig) => (
              <div className="figures__item" key={fig.label.en}>
                <dt className="figures__label">{fig.label[lang]}</dt>
                <dd className="figures__value display" data-count={fig.value} data-locale={lang}>
                  {numberFormat[lang].format(fig.value)}
                  {fig.suffix ?? ""}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <nav className="next" aria-label={t.project.next}>
        <a className="next__link" href={nextHref}>
          <span className="next__label">{next ? t.project.next : t.project.back}</span>
          <span className="next__name display" style={{ "--chars": nextName.length } as React.CSSProperties}>
            {nextName}
          </span>
        </a>
      </nav>

      <Lightbox closeLabel={lang === "it" ? "Chiudi" : "Close"} />
    </>
  );
}
