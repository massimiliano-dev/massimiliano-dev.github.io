import { LoopVideo } from "@/components/ui/LoopVideo";
import { Stage } from "@/components/ui/Stage";
import { StageList } from "@/components/ui/StageList";
import type { StageItem } from "@/components/ui/stage-types";
import { type Project, projects } from "@/content/projects";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath, sectionIds } from "@/lib/sections";

const numberFormat: Record<Locale, Intl.NumberFormat> = {
  it: new Intl.NumberFormat("it-IT"),
  en: new Intl.NumberFormat("en-US"),
};

/** La pagina di un progetto: apertura con lo schermo che si raddrizza, le funzioni, i numeri. */
export function ProjectDetail({ project, t, lang }: { project: Project; t: Dictionary; lang: Locale }) {
  const features: StageItem[] = (project.features ?? []).map((f) => ({
    key: f.image,
    name: f.name[lang],
    tags: f.tags,
    text: f.text[lang],
    image: f.image,
    alt: f.alt[lang],
    focus: f.focus,
    portrait: f.portrait,
  }));
  const withPage = projects.filter((p) => p.features?.length);
  const next = withPage.length > 1 ? withPage[(withPage.indexOf(project) + 1) % withPage.length] : null;

  return (
    <>
      <section className="showcase" aria-labelledby="project-title">
        <div className="showcase__head">
          <div>
            <h1 className="showcase__name display" id="project-title">
              <span className="hero__line">
                <span data-load="name">{project.name}</span>
              </span>
            </h1>
            <p className="showcase__kind" data-load="aside">
              {project.kind[lang]} · {project.year}
            </p>
          </div>
          <div className="showcase__side" data-load="aside">
            <p className="showcase__lead">{project.lead[lang]}</p>
            <div className="project__actions">
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
              {project.site && (
                <a className="btn btn--quiet" href={project.site} target="_blank" rel="noreferrer">
                  {t.project.site}
                </a>
              )}
            </div>
          </div>
        </div>
        <figure className="screen" data-screen>
          <div className="screen__glass" data-screen-glass>
            {project.cover.video ? (
              <LoopVideo base={project.cover.video} poster={project.cover.image} label={project.cover.alt[lang]} />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={withBase(project.cover.image)} alt={project.cover.alt[lang]} width={1920} height={1080} />
            )}
          </div>
          {project.screenCaption && <figcaption className="screen__caption">{project.screenCaption[lang]}</figcaption>}
        </figure>
      </section>

      {features.length > 0 && (
        <section className="work" aria-labelledby="features-title">
          <div className="stagewrap" style={{ "--steps": features.length } as React.CSSProperties}>
            <Stage title={t.project.featuresTitle} level={2} items={features} step={t.projects.step} />
            <StageList title={t.project.featuresTitle} titleId="features-title" level={2} items={features} />
          </div>
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
          <p className="figures__stack" data-reveal="rise">
            {project.stack}
          </p>
        </section>
      )}

      <nav className="next" aria-label={t.project.back}>
        <a className="next__link" href={withBase(next ? projectPath(lang, next.slug) : `/${lang}/#${sectionIds(lang).work}`)}>
          <span className="next__label">{next ? t.project.next : t.project.back}</span>
          <span className="next__name display">{next ? next.name : t.projects.title}</span>
        </a>
      </nav>
    </>
  );
}
