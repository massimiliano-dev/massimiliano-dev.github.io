"use client";

import { useEffect, useRef, useState } from "react";

import { LazyFilmStrip } from "@/components/three/LazyFilmStrip";
import { withBase } from "@/lib/paths";
import { useScene } from "@/lib/scene-store";
import { useInView, useMedia, useReducedMotion } from "@/lib/use-media";

export interface HeroFrame {
  thumb: string;
  ratio: number;
  href: string;
  alt: string;
  project: string;
  kind: string;
}

interface Labels {
  stripLabel: string;
  stripHint: string;
  open: string;
}

const PX_PER_FRAME = 240;

/**
 * La striscia illuminata dell'hero. Su desktop con il movimento attivo è una pellicola 3D che si trascina;
 * altrimenti è una fila di immagini vere che scorre di lato. In entrambi i casi ogni fotogramma porta al progetto.
 */
export function HeroStrip({ frames, labels }: { frames: HeroFrame[]; labels: Labels }) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  const still = useReducedMotion();
  const wide = useMedia("(min-width: 900px)", true);
  const use3d = wide && !still;
  const [ready, setReady] = useState(false);
  const [center, setCenter] = useState(0);
  const drag = useRef<{ x: number; start: number; moved: boolean } | null>(null);
  const dragged = useRef(false);

  useEffect(() => {
    // Si parte da un fotogramma interno, così la fila è piena da entrambi i lati.
    useScene.setState({ frameCount: frames.length, drag: Math.min(2, frames.length - 1) });
  }, [frames.length]);

  // Rotella: lo scorrimento orizzontale (o con Maiusc) sfoglia; quello verticale resta alla pagina.
  useEffect(() => {
    const el = box.current;
    if (!el || !use3d) return;
    let acc = 0;
    const onWheel = (e: WheelEvent) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      acc += dx;
      if (Math.abs(acc) > 60) {
        useScene.getState().nudge(Math.sign(acc));
        acc = 0;
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [use3d]);

  const current = frames[center];

  return (
    <div className="filmstrip" data-ready={use3d && ready}>
      {use3d && (
        <div
          className="filmstrip__stage"
          ref={box}
          tabIndex={0}
          role="group"
          aria-roledescription="carousel"
          aria-label={labels.stripLabel}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") useScene.getState().nudge(1);
            else if (e.key === "ArrowLeft") useScene.getState().nudge(-1);
            else if (e.key === "Enter" && current) window.location.href = current.href;
            else return;
            e.preventDefault();
          }}
          onPointerDown={(e) => {
            drag.current = { x: e.clientX, start: useScene.getState().drag, moved: false };
          }}
          onPointerMove={(e) => {
            const d = drag.current;
            if (!d) return;
            const dx = e.clientX - d.x;
            if (Math.abs(dx) > 6) d.moved = true;
            const max = frames.length - 1;
            useScene.setState({ drag: Math.max(0, Math.min(max, d.start - dx / PX_PER_FRAME)) });
          }}
          onPointerUp={() => {
            dragged.current = !!drag.current?.moved;
            drag.current = null;
          }}
          onPointerLeave={() => {
            drag.current = null;
          }}
          onClickCapture={(e) => {
            // Un trascinamento non deve aprire il progetto sotto il puntatore.
            if (dragged.current) {
              e.stopPropagation();
              dragged.current = false;
            }
          }}
        >
          {inView || ready ? (
            <LazyFilmStrip
              frames={frames.map((f) => ({ thumb: withBase(f.thumb), ratio: f.ratio, href: f.href }))}
              still={still}
              active={inView}
              onCenter={setCenter}
              onReady={() => setReady(true)}
            />
          ) : null}
        </div>
      )}

      {/* Striscia vera: telefono, movimento ridotto, pagina senza script, e finché il 3D non è pronto. */}
      <ul className="strip strip--hero" aria-label={labels.stripLabel} data-drag>
        {frames.map((f) => (
          <li key={f.thumb} style={{ "--ratio": f.ratio } as React.CSSProperties}>
            <a href={f.href} aria-label={`${labels.open}: ${f.project}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={withBase(f.thumb)} alt={f.alt} width={Math.round(540 * f.ratio)} height={540} loading="lazy" />
            </a>
          </li>
        ))}
      </ul>

      <p className="filmstrip__caption" aria-live="polite">
        {use3d && current ? (
          <>
            <a className="link" href={current.href}>
              {current.project}
            </a>
            <span className="filmstrip__kind"> · {current.kind}</span>
            <span className="filmstrip__hint">{labels.stripHint}</span>
          </>
        ) : (
          <span className="filmstrip__hint">{labels.stripHint}</span>
        )}
      </p>
    </div>
  );
}
