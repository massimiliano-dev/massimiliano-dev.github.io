"use client";

import type Lenis from "lenis";

// L'istanza di Lenis, se lo scroll morbido è attivo (desktop, movimento permesso).
let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

/** Porta una sezione in cima allo schermo, sotto la barra di navigazione. */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (lenis) lenis.scrollTo(el, { duration: 1.2 });
  else el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Il focus segue lo scroll, così tastiera e lettori di schermo arrivano nello stesso punto.
  const heading = el.querySelector<HTMLElement>("h2, h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus({ preventScroll: true });
  }
}
