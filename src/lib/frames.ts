import type { Project } from "@/content/projects";
import type { Locale } from "@/content/site";

export interface Frame {
  /** Immagine piena (1920 di larghezza) e miniatura alta 540 per le strisce. */
  src: string;
  thumb: string;
  alt: string;
  /** Larghezza in proporzione all'altezza (16:9 = 1.78, uno schermo di telefono ≈ 0.46). */
  ratio: number;
  project: Project;
}

const thumbOf = (src: string) => src.replace(/\/([^/]+)$/, "/thumbs/$1");

/** Tutti i fotogrammi di un progetto: copertina, funzioni e galleria, senza doppioni. */
export function framesOf(project: Project, lang: Locale): Frame[] {
  const out: Frame[] = [];
  const seen = new Set<string>();
  const add = (src: string, alt: string, portrait?: boolean, ratio?: number) => {
    if (seen.has(src)) return;
    seen.add(src);
    out.push({ src, thumb: thumbOf(src), alt, ratio: ratio ?? (portrait ? 780 / 1688 : 16 / 9), project });
  };
  add(project.cover.image, project.cover.alt[lang], false, project.cover.ratio);
  for (const f of project.features ?? []) add(f.image, f.alt[lang], f.portrait, f.ratio);
  for (const g of project.gallery ?? []) add(g.image, g.alt[lang], g.portrait);
  return out;
}
