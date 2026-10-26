"use client";

import { useRef, useState } from "react";

import { LazyStack } from "@/components/three/LazyStack";
import { useInView, useReducedMotion } from "@/lib/use-media";

/** La stessa pila, in inchiostro scuro sul campo menta dei contatti: ruota mentre la sezione entra. */
export function ContactStack() {
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, "300px");
  const still = useReducedMotion();
  const [ready, setReady] = useState(false);
  return (
    <div className="contact__stack" ref={box} data-ready={ready} aria-hidden>
      {inView || ready ? <LazyStack variant="contact" still={still} active={inView} onReady={() => setReady(true)} /> : null}
    </div>
  );
}
