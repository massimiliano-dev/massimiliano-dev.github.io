import { create } from "zustand";

interface SceneState {
  /** Avanzamento dell'hero, 0–1. */
  heroProgress: number;
  /** Il puntatore, normalizzato in −1…1 rispetto alla finestra. */
  pointer: { x: number; y: number };
  /** Fotogramma della pellicola da portare al centro (frazionario mentre si trascina). */
  drag: number;
  /** Numero di fotogrammi, per non uscire dalla pellicola. */
  frameCount: number;
  nudge: (frames: number) => void;
}

const clamp = (v: number, max: number) => Math.max(0, Math.min(max, v));

// La scena legge lo stato con getState() dentro useFrame: nessun re-render a ogni frame.
export const useScene = create<SceneState>((set) => ({
  heroProgress: 0,
  pointer: { x: 0, y: 0 },
  drag: 0,
  frameCount: 1,
  nudge: (frames) => set((s) => ({ drag: clamp(s.drag + frames, s.frameCount - 1) })),
}));
