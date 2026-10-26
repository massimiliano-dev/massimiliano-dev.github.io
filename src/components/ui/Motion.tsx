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

      // Caricamento, entro 1,2 secondi: il nome sale dalla sua maschera, il frame si apre, poi il resto.
      const intro = gsap.timeline({ defaults: { ease: EXPO }, onComplete: done });
      intro
        .fromTo("[data-load='name']", { yPercent: 105, opacity: 1 }, { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.09 }, 0)
        .fromTo(
          "[data-load='frame']",
          { clipPath: "inset(50% 0 50% 0)", opacity: 1 },
          { clipPath: "inset(0% 0 0% 0)", duration: 0.95, ease: "power3.inOut" },
          0.08,
        )
        .fromTo("[data-load='aside']", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 }, 0.35)
        .fromTo(".nav[data-load]", { opacity: 0 }, { opacity: 1, duration: 0.6, ease: "none" }, 0.2);

      // Entrate: titoli e testi salgono a gruppi nell'ordine di lettura.
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
          start: "top 88%",
          once: true,
          onEnter: () => gsap.to(items, { y: 0, opacity: 1, duration: 0.7, ease: OUT, stagger: 0.06 }),
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

      // Le immagini si aprono dall'alto verso il basso e si assestano da una leggera scala.
      gsap.utils.toArray<HTMLElement>("[data-reveal='mask']").forEach((fig) => {
        const img = fig.querySelector("img");
        gsap.set(fig, { clipPath: "inset(0 0 100% 0)" });
        if (img) gsap.set(img, { scale: 1.08 });
        ScrollTrigger.create({
          trigger: fig,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(fig, { clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "power3.inOut" });
            if (img) gsap.to(img, { scale: 1, duration: 1.3, ease: EXPO });
          },
        });
      });

      // L'email sale dalla sua maschera, una volta.
      gsap.utils.toArray<HTMLElement>("[data-reveal='email']").forEach((el) => {
        const split = SplitText.create(el, { type: "lines", mask: "lines" });
        gsap.set(split.lines, { yPercent: 110 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 92%",
          once: true,
          onEnter: () => gsap.to(split.lines, { yPercent: 0, duration: 1.1, ease: EXPO }),
        });
      });

      // I numeri del repository contano fino al valore vero, una volta.
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

      // Il campo dei contatti: il D-pad ruota mentre la sezione entra.
      ScrollTrigger.create({
        trigger: "[data-contact]",
        start: "top bottom",
        end: "bottom bottom",
        onUpdate: (self) => useScene.setState({ contactProgress: self.progress }),
      });
    });

    // Hero: mentre lo stage è fermo la camera entra nel pad; il nome e la frase lasciano la scena.
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const hero = document.querySelector<HTMLElement>("[data-hero]");
      if (!hero) return;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onUpdate: (self) => useScene.setState({ heroProgress: self.progress }),
        },
      });
      tl.to(".hero__intro", { y: -48, opacity: 0, ease: "none" }, 0.3);
    });

    // Lo schermo di GameMode arriva inclinato all'indietro e si raddrizza mentre sale.
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const glass = document.querySelector<HTMLElement>("[data-screen-glass]");
      if (!glass) return;
      gsap.fromTo(
        glass,
        { rotationX: 32, scale: 0.84, y: 40 },
        {
          rotationX: 0,
          scale: 1,
          y: 0,
          ease: "none",
          scrollTrigger: { trigger: "[data-screen]", start: "top bottom", end: "top 20%", scrub: true },
        },
      );
    });

    return () => {
      window.removeEventListener("pointermove", onPointer);
      mm.revert();
    };
  });

  return null;
}
