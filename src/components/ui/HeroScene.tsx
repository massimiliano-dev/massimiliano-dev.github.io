"use client";

import { useRef, useState } from "react";

import { LazyStack } from "@/components/three/LazyStack";
import { useScene } from "@/lib/scene-store";
import { useInView, useMedia, useReducedMotion } from "@/lib/use-media";

/**
 * La scena dell'hero: la pila database / server / interfaccia in 3D su una griglia neon.
 * Si gira trascinando (mouse o dito) e con le frecce; lo scroll verticale resta libero.
 */
export function HeroScene({ label }: { label: string }) {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box);
  const still = useReducedMotion();
  const wide = useMedia("(min-width: 900px)", true);
  const [ready, setReady] = useState(false);
  const last = useRef<number | null>(null);
  const nudge = useScene((s) => s.nudge);

  return (
    <div
      className="scene"
      ref={box}
      data-ready={ready}
      role="img"
      aria-label={label}
      onPointerDown={(e) => {
        last.current = e.clientX;
        e.currentTarget.setPointerCapture(e.pointerId);
      }}
      onPointerMove={(e) => {
        if (last.current === null) return;
        nudge((e.clientX - last.current) * 0.008);
        last.current = e.clientX;
      }}
      onPointerUp={() => (last.current = null)}
      onPointerCancel={() => (last.current = null)}
    >
      {inView || ready ? (
        <LazyStack variant="hero" still={still} active={inView} offsetX={wide ? 0.16 : 0} onReady={() => setReady(true)} />
      ) : null}
    </div>
  );
}
