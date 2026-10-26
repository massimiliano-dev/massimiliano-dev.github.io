"use client";

import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { withBase } from "@/lib/paths";

import { LoopVideo } from "./LoopVideo";
import { getLenis } from "./scroll";
import type { StageItem } from "./stage-types";

interface Props {
  title: string;
  titleId?: string;
  level: 2 | 3;
  items: StageItem[];
  /** "{n} di {total}" */
  step: string;
}

/**
 * "Small index, large picture": a sinistra il titolo, il testo della voce corrente e l'indice;
 * a destra l'immagine a tutta altezza. Ogni voce vale circa tre quarti di schermo di scroll:
 * la nuova immagine entra dal basso con un taglio e la riga corrente si accende nell'indice.
 */
export function Stage({ title, titleId, level, items, step }: Props) {
  const root = useRef<HTMLDivElement>(null);
  const media = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);
  const total = items.length;
  const Heading = level === 2 ? "h2" : "h3";

  useGSAP(
    () => {
      const wrapper = root.current?.closest<HTMLElement>(".stagewrap");
      if (!wrapper) return;
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
        ScrollTrigger.create({
          trigger: wrapper,
          start: "top top",
          end: "bottom bottom",
          onUpdate: (self) => setCurrent(Math.min(total - 1, Math.floor(self.progress * total * 0.999))),
        });

        // Il puntatore inclina l'immagine di qualche grado: profondità senza spostare il layout.
        const panel = media.current;
        if (!panel || !window.matchMedia("(pointer: fine)").matches) return;
        const tilts = panel.querySelectorAll<HTMLElement>(".stage__tilt");
        const rx = gsap.quickTo(tilts, "rotationX", { duration: 0.8, ease: "power3.out" });
        const ry = gsap.quickTo(tilts, "rotationY", { duration: 0.8, ease: "power3.out" });
        const onMove = (e: PointerEvent) => {
          const r = panel.getBoundingClientRect();
          ry(((e.clientX - r.left) / r.width - 0.5) * 6);
          rx(-((e.clientY - r.top) / r.height - 0.5) * 5);
        };
        const onLeave = () => {
          rx(0);
          ry(0);
        };
        panel.addEventListener("pointermove", onMove);
        panel.addEventListener("pointerleave", onLeave);
        return () => {
          panel.removeEventListener("pointermove", onMove);
          panel.removeEventListener("pointerleave", onLeave);
        };
      });
      return () => mm.revert();
    },
    { scope: root, dependencies: [total] },
  );

  // Un clic su una riga porta allo schermo di quella voce.
  const goTo = (i: number) => {
    const wrapper = root.current?.closest<HTMLElement>(".stagewrap");
    if (!wrapper) return;
    const top = wrapper.getBoundingClientRect().top + window.scrollY;
    const y = top + ((wrapper.offsetHeight - window.innerHeight) * (i + 0.5)) / total;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  const item = items[current];

  return (
    <div className="stage" ref={root}>
      <div className="stage__text">
        <Heading className="stage__name display" id={titleId} data-reveal="rise">
          {title}
        </Heading>

        <div className="stage__desc" aria-live="polite">
          {items.map((it, i) => (
            <p key={it.key} className={i === current ? "is-current" : undefined} aria-hidden={i !== current}>
              {it.text}
            </p>
          ))}
        </div>
        <div className="stage__meta">
          <span className="stage__count">
            {step.replace("{n}", String(current + 1)).replace("{total}", String(total))}
            <span className="stage__tags"> · {item.tags}</span>
          </span>
          {item.href && (
            <a
              className="btn btn--accent btn--small"
              href={item.href}
              data-primary
              {...(item.external ? { target: "_blank", rel: "noreferrer" } : {})}
            >
              {item.hrefLabel} <span className="btn__arrow" aria-hidden>→</span>
            </a>
          )}
        </div>
        <ol className="stage__index">
          {items.map((it, i) => (
            <li key={it.key}>
              <button
                type="button"
                className={`stage__row${i === current ? " is-current" : ""}`}
                aria-current={i === current ? "step" : undefined}
                onClick={() => goTo(i)}
              >
                <span className="stage__row-name">{it.name}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="stage__media" ref={media}>
        {items.map((it, i) => (
          <figure
            key={it.key}
            className={`stage__shot${it.portrait ? " stage__shot--portrait" : ""}${i === current ? " is-current" : ""}${i < current ? " is-passed" : ""}`}
          >
            <div className="stage__tilt">
              {it.video ? (
                <LoopVideo base={it.video} poster={it.image} label={it.alt} />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={withBase(it.image)}
                  alt={it.alt}
                  width={it.portrait ? 780 : 1920}
                  height={it.portrait ? 1688 : 1080}
                  style={it.focus ? { objectPosition: it.focus } : undefined}
                />
              )}
            </div>
          </figure>
        ))}
      </div>
    </div>
  );
}
