import { CopyEmail } from "@/components/ui/CopyEmail";
import { projects } from "@/content/projects";
import { type Locale, site } from "@/content/site";
import { framesOf } from "@/lib/frames";
import type { Dictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { sectionIds } from "@/lib/sections";

/** "Photo strip, three-cell bar": campo blu, una fila di fotogrammi che scorre, il titolo e tre blocchi pieni. */
export function Contact({ t, lang }: { t: Dictionary; lang: Locale }) {
  const id = sectionIds(lang).contact;
  const frames = projects.flatMap((p) => framesOf(p, lang)).filter((f) => f.ratio > 1);
  return (
    <section className="contact" id={id} aria-labelledby={`${id}-title`}>
      <div className="marquee" aria-hidden>
        {/* Due copie della stessa fila: quando la prima esce a sinistra, la seconda è già al suo posto. */}
        {[0, 1].map((copy) => (
          <ul className="marquee__row" key={copy}>
            {frames.map((f) => (
              <li key={`${copy}-${f.src}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={withBase(f.thumb)} alt="" width={267} height={150} loading="lazy" />
              </li>
            ))}
          </ul>
        ))}
      </div>

      <div className="contact__body">
        <h2 className="contact__title display" id={`${id}-title`} data-reveal="rise">
          {t.contact.title}
        </h2>
        <p className="contact__sentence" data-reveal="rise">
          {t.contact.sentence}
        </p>

        <div className="cells" data-reveal="list">
          <a className="cell" href={site.github} target="_blank" rel="noreferrer">
            <span className="cell__label">GitHub</span>
            <span className="cell__value">{site.githubHandle}</span>
          </a>
          {site.linkedin && (
            <a className="cell" href={site.linkedin} target="_blank" rel="noreferrer">
              <span className="cell__label">LinkedIn</span>
              <span className="cell__value">Massimiliano Polce</span>
            </a>
          )}
          <a className="cell cell--primary" href={`mailto:${site.email}`} data-primary>
            <span className="cell__label">{t.contact.email}</span>
            <span className="cell__value">{site.email}</span>
          </a>
        </div>
        <div className="contact__small">
          <span>{t.contact.place}</span>
          <CopyEmail email={site.email} label={t.contact.copy} done={t.contact.copied} />
        </div>
      </div>
    </section>
  );
}
