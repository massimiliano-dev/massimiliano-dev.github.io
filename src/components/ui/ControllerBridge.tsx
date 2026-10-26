"use client";

import { useEffect, useState } from "react";

import { useScene } from "@/lib/scene-store";

import { scrollToSection } from "./scroll";

// Mappa standard della Gamepad API (layout Xbox), la stessa che usa GameMode.
const PAD_UP = 12;
const PAD_DOWN = 13;
const PAD_LEFT = 14;
const PAD_RIGHT = 15;
const BUTTON_A = 0;

function sections(): HTMLElement[] {
  return Array.from(document.querySelectorAll<HTMLElement>("main > section[id]"));
}

/** La sezione che occupa la parte alta dello schermo adesso. */
function currentIndex(list: HTMLElement[]) {
  const line = window.innerHeight * 0.4;
  let index = 0;
  list.forEach((s, i) => {
    if (s.getBoundingClientRect().top <= line) index = i;
  });
  return index;
}

/**
 * Frecce sinistra e destra girano la pila 3D dell'hero (su e giù restano allo scroll normale).
 * Un controller vero fa di più: su e giù cambiano sezione, A apre l'azione della sezione,
 * sinistra e destra girano la pila.
 */
export function ControllerBridge({ message }: { message: string }) {
  const [toast, setToast] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey || e.metaKey || e.ctrlKey) return;
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable]")) return;
      if (e.key === "ArrowLeft") useScene.getState().nudge(-0.35);
      if (e.key === "ArrowRight") useScene.getState().nudge(0.35);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    let frame = 0;
    let hideTimer = 0;
    const previous = new Map<number, boolean>();

    const poll = () => {
      const pads = navigator.getGamepads?.() ?? [];
      const pad = pads.find((p) => p && p.connected);
      if (!pad) {
        frame = 0;
        return;
      }
      // Sinistra e destra tenute premute girano la pila.
      if (pad.buttons[PAD_LEFT]?.pressed) useScene.getState().nudge(-0.04);
      if (pad.buttons[PAD_RIGHT]?.pressed) useScene.getState().nudge(0.04);
      for (const button of [PAD_UP, PAD_DOWN]) {
        const down = !!pad.buttons[button]?.pressed;
        if (down && !previous.get(button)) {
          const list = sections();
          const next = currentIndex(list) + (button === PAD_DOWN ? 1 : -1);
          const target = list[Math.max(0, Math.min(list.length - 1, next))];
          if (target) scrollToSection(target.id);
        }
        previous.set(button, down);
      }
      const a = !!pad.buttons[BUTTON_A]?.pressed;
      if (a && !previous.get(BUTTON_A)) {
        const list = sections();
        const action = list[currentIndex(list)]?.querySelector<HTMLElement>("[data-primary]");
        action?.focus();
        action?.click();
      }
      previous.set(BUTTON_A, a);
      frame = requestAnimationFrame(poll);
    };

    const onConnect = () => {
      setToast(true);
      window.clearTimeout(hideTimer);
      hideTimer = window.setTimeout(() => setToast(false), 5000);
      if (!frame) frame = requestAnimationFrame(poll);
    };
    window.addEventListener("gamepadconnected", onConnect);
    // Un controller già collegato si fa vedere solo alla prima pressione: il poll parte da lì.
    if (navigator.getGamepads?.().some((p) => p?.connected)) onConnect();
    return () => {
      window.removeEventListener("gamepadconnected", onConnect);
      cancelAnimationFrame(frame);
      window.clearTimeout(hideTimer);
    };
  }, []);

  return (
    <div className="pad-toast" role="status" aria-live="polite" data-show={toast}>
      {toast ? message : ""}
    </div>
  );
}
