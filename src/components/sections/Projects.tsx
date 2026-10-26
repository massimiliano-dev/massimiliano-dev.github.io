import { Stage } from "@/components/ui/Stage";
import { StageList } from "@/components/ui/StageList";
import type { StageItem } from "@/components/ui/stage-types";
import { projects } from "@/content/projects";
import type { Locale } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { projectPath, sectionIds } from "@/lib/sections";
import { withBase } from "@/lib/paths";

/** L'indice dei progetti: uno schermo fermo, i progetti passano uno dopo l'altro. */
export function Projects({ t, lang }: { t: Dictionary; lang: Locale }) {
  const id = sectionIds(lang).work;
  const items: StageItem[] = projects.map((p) => {
    const hasPage = !!p.features?.length;
    return {
      key: p.slug,
      name: p.name,
      tags: `${p.kind[lang]} · ${p.year}`,
      text: p.summary[lang],
      image: p.cover.image,
      video: p.cover.video,
      alt: p.cover.alt[lang],
      focus: p.cover.focus,
      href: hasPage ? withBase(projectPath(lang, p.slug)) : (p.site ?? p.repo),
      hrefLabel: hasPage ? t.projects.open : t.projects.code,
      external: !hasPage,
    };
  });
  return (
    <section className="work" id={id} aria-labelledby={`${id}-title`}>
      <div className="stagewrap" style={{ "--steps": items.length } as React.CSSProperties}>
        <Stage title={t.projects.title} level={2} items={items} step={t.projects.step} />
        <StageList title={t.projects.title} titleId={`${id}-title`} level={2} items={items} />
      </div>
    </section>
  );
}
