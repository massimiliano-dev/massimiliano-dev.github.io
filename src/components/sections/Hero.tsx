import { HeroScene } from "@/components/ui/HeroScene";
import { type Locale, site } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { sectionIds } from "@/lib/sections";

/**
 * Hero: la pila database / server / interfaccia in 3D a tutto schermo, il nome come monumento sul bordo basso.
 * Lo stage resta fermo un po' più di uno schermo: la camera entra e i livelli si aprono.
 */
export function Hero({ t, lang }: { t: Dictionary; lang: Locale }) {
  return (
    <section className="hero" id="top" data-hero aria-labelledby="hero-title">
      <div className="hero__stage">
        <HeroScene label={t.hero.sceneLabel} />

        <div className="hero__intro" data-load="aside">
          <p className="hero__sentence">{t.hero.sentence}</p>
          <a className="btn btn--accent" href={`#${sectionIds(lang).work}`} data-primary>
            {t.hero.action} <span className="btn__arrow" aria-hidden>→</span>
          </a>
          <p className="hero__hint">{t.hero.hint}</p>
        </div>

        <h1 className="hero__title display" id="hero-title" data-hero-title>
          <span className="hero__line">
            <span data-load="name">{site.firstName}</span>
          </span>{" "}
          <span className="hero__line">
            <span data-load="name">{site.lastName}</span>
          </span>
        </h1>
      </div>
    </section>
  );
}
