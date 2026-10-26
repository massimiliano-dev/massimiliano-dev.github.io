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
 * Con un controller collegato il sito si usa come GameMode: su e giù cambiano sezione,
 * A apre l'azione della sezione, sinistra e destra sfogliano la pellicola dell'hero.
 */
export function ControllerBridge({ message }: { message: string }) {
  const [toast, setToast] = useState(false);

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
      // Sinistra e destra sfogliano la pellicola, un fotogramma per pressione.
      for (const [button, step] of [
        [PAD_LEFT, -1],
        [PAD_RIGHT, 1],
      ] as const) {
        const down = !!pad.buttons[button]?.pressed;
        if (down && !previous.get(button)) useScene.getState().nudge(step);
        previous.set(button, down);
      }
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
