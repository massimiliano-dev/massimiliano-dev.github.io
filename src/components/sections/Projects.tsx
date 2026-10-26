import { LoopVideo } from "@/components/ui/LoopVideo";
import { ProjectFilters } from "@/components/ui/ProjectFilters";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/site";
import { framesOf } from "@/lib/frames";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath, sectionIds } from "@/lib/sections";

/**
 * "One strip per project": una colonna ferma a sinistra con titolo e filtri, a destra una striscia di immagini
 * per progetto, da trascinare di lato, con una riga sotto: nome, tipo, anno.
 */
export function Projects({ t, lang }: { t: Dictionary; lang: Locale }) {
  const id = sectionIds(lang).work;
  return (
    <section className="work" id={id} aria-labelledby={`${id}-title`}>
      <div className="rail">
        <h2 className="rail__title display" id={`${id}-title`} data-reveal="rise">
          {t.projects.title}
        </h2>
        <ProjectFilters labels={t.projects.filters} />
      </div>

      <div className="sheet" data-sheet data-filter="all">
        {projects.map((p) => {
          const hasPage = !!p.features?.length;
          const href = hasPage ? withBase(projectPath(lang, p.slug)) : (p.repo ?? "#");
          const frames = framesOf(p, lang);
          return (
            <article className="run" key={p.slug} data-category={p.category}>
              <ul className="strip" data-drag data-frames aria-label={p.name}>
                {frames.map((f) => (
                  <li key={f.src} style={{ "--ratio": f.ratio } as React.CSSProperties}>
                    <a href={href} tabIndex={-1} aria-hidden>
                      {p.cover.video && f.src === p.cover.image ? (
                        <LoopVideo base={p.cover.video} poster={f.thumb} label={f.alt} />
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={withBase(f.thumb)} alt={f.alt} width={Math.round(540 * f.ratio)} height={540} loading="lazy" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="run__line">
                <h3 className="run__name">
                  <a className="link" href={href}>
                    {p.name}
                  </a>
                </h3>
                <span className="run__kind">{p.kind[lang]}</span>
                <span className="run__year">{p.year}</span>
              </div>
              <p className="run__summary">{p.summary[lang]}</p>
              <p className="run__audience">
                <span>{t.project.audience}:</span> {p.audience[lang]}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
