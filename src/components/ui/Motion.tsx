"use client";

import { useGSAP } from "@gsap/react";
import Lenis from "lenis";

import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { useScene } from "@/lib/scene-store";

import { setLenis } from "./scroll";

const EXPO = "expo.out";
const OUT = "power4.out";

/**
 * Tutto il movimento della pagina in un posto solo. Ogni parte vive dentro gsap.matchMedia:
 * con "riduci movimento" non parte niente e la pagina resta nel suo stato finale.
 */
export function Motion() {
  useGSAP(() => {
    const mm = gsap.matchMedia();

    // Il puntatore, normalizzato, per la scena 3D.
    const onPointer = (e: PointerEvent) => {
      useScene.setState({
        pointer: { x: (e.clientX / window.innerWidth) * 2 - 1, y: -((e.clientY / window.innerHeight) * 2 - 1) },
      });
    };
    window.addEventListener("pointermove", onPointer, { passive: true });

    // Le strisce si trascinano anche con il mouse (con le dita e il trackpad scorrono già da sole).
    const cleanups: (() => void)[] = [];
    document.querySelectorAll<HTMLElement>("[data-drag]").forEach((row) => {
      let start: { x: number; left: number } | null = null;
      let moved = false;
      const down = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        start = { x: e.clientX, left: row.scrollLeft };
        moved = false;
      };
      const move = (e: PointerEvent) => {
        if (!start) return;
        const dx = e.clientX - start.x;
        if (Math.abs(dx) > 5) {
          moved = true;
          row.classList.add("is-dragging");
        }
        row.scrollLeft = start.left - dx;
      };
      const up = () => {
        start = null;
        row.classList.remove("is-dragging");
      };
      // Dopo un trascinamento il clic non apre il link o l'immagine sotto il puntatore.
      const click = (e: MouseEvent) => {
        if (moved) {
          e.preventDefault();
          e.stopPropagation();
          moved = false;
        }
      };
      const noGhost = (e: DragEvent) => e.preventDefault();
      row.addEventListener("pointerdown", down);
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
      row.addEventListener("click", click, true);
      row.addEventListener("dragstart", noGhost);
      cleanups.push(() => {
        row.removeEventListener("pointerdown", down);
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
        row.removeEventListener("click", click, true);
        row.removeEventListener("dragstart", noGhost);
      });
    });

    // Scroll morbido leggero: solo con mouse o trackpad, mai su touch o con movimento ridotto.
    mm.add("(prefers-reduced-motion: no-preference) and (pointer: fine)", () => {
      const lenis = new Lenis({ lerp: 0.12, anchors: { offset: -64 } });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    });

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const loaded = gsap.utils.toArray<HTMLElement>("[data-load]");
      const done = () => loaded.forEach((el) => (el.style.animation = "none"));

      // Caricamento, entro 1,2 secondi: il nome sale dalla sua maschera, poi i blocchi e la striscia.
      gsap
        .timeline({ defaults: { ease: EXPO }, onComplete: done })
        .fromTo("[data-load='name']", { yPercent: 105, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09 }, 0)
        .fromTo("[data-load='aside']", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.3)
        .fromTo("[data-load='frame']", { y: 32, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.4)
        .fromTo(".nav[data-load]", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none" }, 0.2);

      // Titoli e testi salgono a gruppi nell'ordine di lettura.
      gsap.set("[data-reveal='rise']", { y: 28, opacity: 0 });
      ScrollTrigger.batch("[data-reveal='rise']", {
        start: "top 88%",
        once: true,
        onEnter: (batch) => gsap.to(batch, { y: 0, opacity: 1, duration: 0.8, ease: EXPO, stagger: 0.08 }),
      });

      // Liste: riga per riga.
      gsap.utils.toArray<HTMLElement>("[data-reveal='list']").forEach((list) => {
        const items = Array.from(list.children);
        gsap.set(items, { y: 16, opacity: 0 });
        ScrollTrigger.create({
          trigger: list,
          start: "top 90%",
          once: true,
          onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.7, ease: OUT, stagger: 0.06 }),
        });
      });

      // Le strisce arrivano fotogramma per fotogramma, ognuno aperto dal basso.
      gsap.utils.toArray<HTMLElement>("[data-frames]").forEach((row) => {
        const items = Array.from(row.children).slice(0, 8);
        gsap.set(items, { clipPath: "inset(100% 0 0 0)" });
        ScrollTrigger.create({
          trigger: row,
          start: "top 92%",
          once: true,
          onEnter: () =>
            gsap.to(items, { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power3.inOut", stagger: 0.07 }),
        });
      });

      // Il paragrafo di presentazione sale riga per riga, ognuna dalla sua maschera.
      gsap.utils.toArray<HTMLElement>("[data-reveal='lines']").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines", linesClass: "line" });
        gsap.set(split.lines, { yPercent: 100 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 0.85, ease: EXPO, stagger: { amount: 0.3 } }),
        });
      });

      // I numeri contano fino al valore vero, una volta.
      gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
        const target = Number(el.dataset.count);
        const fmt = new Intl.NumberFormat(el.dataset.locale === "en" ? "en-US" : "it-IT");
        const state = { v: 0 };
        el.textContent = fmt.format(0);
        ScrollTrigger.create({
          trigger: el,
          start: "top 90%",
          once: true,
          onEnter: () =>
            gsap.to(state, {
              v: target,
              duration: target > 100 ? 1.6 : 0.9,
              ease: "power2.out",
              onUpdate: () => (el.textContent = fmt.format(Math.round(state.v))),
            }),
        });
      });

      // La pellicola dell'hero si allontana mentre la pagina scende.
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (hero)
        ScrollTrigger.create({
          trigger: hero,
          start: "top top",
          end: "bottom top",
          onUpdate: (self) => useScene.setState({ heroProgress: self.progress }),
        });
    });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      cleanups.forEach((c) => c());
      mm.revert();
    };
  });

  return null;
}
