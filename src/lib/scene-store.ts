import { create } from "zustand";

interface SceneState {
  /** Avanzamento dell'hero, 0–1: la camera entra e i livelli si aprono. */
  heroProgress: number;
  /** Avanzamento della sezione contatti nello schermo, 0–1. */
  contactProgress: number;
  /** Il puntatore, normalizzato in −1…1 rispetto alla finestra. */
  pointer: { x: number; y: number };
  /** Rotazione aggiunta a mano (trascinamento, frecce, controller), in radianti. */
  drag: number;
  nudge: (radians: number) => void;
}

// La scena legge lo stato con getState() dentro useFrame: nessun re-render a ogni frame.
export const useScene = create<SceneState>((set) => ({
  heroProgress: 0,
  contactProgress: 0,
  pointer: { x: 0, y: 0 },
  drag: 0,
  nudge: (radians) => set((s) => ({ drag: s.drag + radians })),
}));
