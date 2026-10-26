import { withBase } from "@/lib/paths";

import type { StageItem } from "./stage-types";

/** La stessa storia dello stage, in colonna: telefono, movimento ridotto, pagina senza script. */
export function StageList({ title, titleId, level, items }: { title: string; titleId?: string; level: 2 | 3; items: StageItem[] }) {
  const Heading = level === 2 ? "h2" : "h3";
  const ItemHeading = level === 2 ? "h3" : "h4";
  return (
    <div className="stagelist">
      <Heading className="stagelist__title display" id={titleId} data-reveal="rise">
        {title}
      </Heading>
      <ul className="stagelist__items">
        {items.map((it) => (
          <li key={it.key}>
            <figure className={`feature__media${it.portrait ? " feature__media--portrait" : ""}`} data-reveal="mask">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={withBase(it.image)}
                alt={it.alt}
                width={it.portrait ? 780 : 1920}
                height={it.portrait ? 1688 : 1080}
                loading="lazy"
              />
            </figure>
            <div className="feature__head" data-reveal="rise">
              <ItemHeading className="feature__name">{it.name}</ItemHeading>
              <span className="feature__tags">{it.tags}</span>
            </div>
            <p className="feature__text" data-reveal="rise">
              {it.text}
            </p>
            {it.href && (
              <a
                className="btn btn--accent btn--small feature__link"
                href={it.href}
                {...(it.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {it.hrefLabel} <span className="btn__arrow" aria-hidden>→</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
