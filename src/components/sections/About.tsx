import type { Locale } from "@/content/site";
import type { Dictionary } from "@/lib/i18n";
import { sectionIds } from "@/lib/sections";

/** "Side facts, wide paragraph": i fatti in una colonna stretta, il racconto largo accanto. */
export function About({ t, lang }: { t: Dictionary; lang: Locale }) {
  const id = sectionIds(lang).about;
  return (
    <section className="about" id={id} aria-labelledby={`${id}-title`}>
      <div className="about__row">
        <div>
          <h2 className="about__title display" id={`${id}-title`} data-reveal="rise">
            {t.about.title}
          </h2>
          <dl className="about__facts" data-reveal="list">
            {t.about.facts.map(([label, value]) => (
              <div key={label}>
                <dt>{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <p className="about__paragraph" data-reveal="lines">
          {t.about.paragraph}
        </p>
      </div>

      <div className="about__row">
        <p className="about__label" data-reveal="rise">
          {t.about.toolsLabel}
        </p>
        <div className="about__lists">
          {t.about.lists.map((list) => (
            <div key={list.title}>
              <h3 className="about__list-title" data-reveal="rise">
                {list.title}
              </h3>
              <ul className="about__list" data-reveal="list">
                {list.items.map(([name, use]) => (
                  <li key={name}>
                    <span>{name}</span>
                    <span>{use}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
