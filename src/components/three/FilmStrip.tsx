"use client";

import { PerformanceMonitor, useTexture } from "@react-three/drei";
import { Canvas, type ThreeEvent, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

import { useScene } from "@/lib/scene-store";

export interface StripFrame {
  thumb: string;
  ratio: number;
  href: string;
}

interface Props {
  frames: StripFrame[];
  still: boolean;
  active: boolean;
  onCenter: (index: number) => void;
  onReady: () => void;
}

const H = 2.6; // altezza di un fotogramma in unità di scena
const GAP = 0.2;
const BEND = 0.028; // quanto la pellicola si curva allontanandosi dal centro
const MINT = new THREE.Color("#5ef2c8");
const damp = THREE.MathUtils.damp;

/**
 * La pellicola: i fotogrammi in fila su una curva leggera. Quello al centro è acceso, gli altri in penombra.
 * Lo spostamento arriva dallo store (trascinamento, rotella, frecce, controller) e si aggancia al fotogramma più vicino.
 */
function Strip({ frames, still, onCenter }: { frames: StripFrame[]; still: boolean; onCenter: (i: number) => void }) {
  const textures = useTexture(
    frames.map((f) => f.thumb),
    (loaded) => {
      for (const t of Array.isArray(loaded) ? loaded : [loaded]) {
        t.colorSpace = THREE.SRGBColorSpace;
        t.anisotropy = 8;
      }
    },
  );
  const group = useRef<THREE.Group>(null);
  const items = useRef<(THREE.Group | null)[]>([]);
  const glows = useRef<(THREE.Mesh | null)[]>([]);
  const offset = useRef(0);
  const centered = useRef(-1);
  const born = useRef(0);
  const invalidate = useThree((s) => s.invalidate);

  // Centro di ogni fotogramma lungo la pellicola.
  const layout = useMemo(() => {
    const widths = frames.map((f) => H * f.ratio);
    return widths.map((w, i) => {
      const before = widths.slice(0, i).reduce((sum, v) => sum + v + GAP, 0);
      return { w, c: before + w / 2 };
    });
  }, [frames]);

  useEffect(() => {
    born.current = performance.now();
  }, []);

  useEffect(() => {
    if (!still) return;
    return useScene.subscribe(() => invalidate());
  }, [still, invalidate]);

  useFrame((state, dt) => {
    const s = useScene.getState();
    const k = still ? 1e3 : 1;
    // La posizione voluta è sempre il centro di un fotogramma: si va al più vicino a `drag`.
    const max = layout.length - 1;
    const target = Math.max(0, Math.min(max, Math.round(s.drag)));
    const goal = layout[target].c;
    offset.current = damp(offset.current, goal, 5 * k, dt);
    if (target !== centered.current) {
      centered.current = target;
      onCenter(target);
    }
    const now = performance.now();
    items.current.forEach((g, i) => {
      if (!g) return;
      const x = layout[i].c - offset.current;
      // Entrata: ogni fotogramma sale al suo posto con un piccolo ritardo.
      const t = still ? 1 : Math.min(1, Math.max(0, (now - born.current - i * 55) / 700));
      const e = 1 - Math.pow(1 - t, 3);
      g.position.set(x, (1 - e) * -0.8, -BEND * x * x);
      g.rotation.y = -Math.atan(2 * BEND * x) * 0.9;
      const lit = 1 - Math.min(1, Math.abs(x) / (layout[i].w * 0.9 + 0.4));
      const mat = (g.children[0] as THREE.Mesh).material as THREE.MeshBasicMaterial;
      const v = (0.38 + 0.62 * lit) * e;
      mat.color.setScalar(v);
      const glow = glows.current[i];
      if (glow) (glow.material as THREE.MeshBasicMaterial).opacity = lit * e;
    });
    // Il puntatore inclina appena la pellicola.
    if (group.current && !still) {
      group.current.rotation.x = damp(group.current.rotation.x, -s.pointer.y * 0.05, 4, dt);
      group.current.rotation.y = damp(group.current.rotation.y, s.pointer.x * 0.06, 4, dt);
      state.camera.position.z = damp(state.camera.position.z, 6.4 + s.heroProgress * 2.5, 4, dt);
    }
  });

  return (
    <group ref={group}>
      {frames.map((f, i) => (
        <group
          key={f.thumb}
          ref={(g) => {
            items.current[i] = g;
          }}
        >
          <mesh
            onClick={(e: ThreeEvent<MouseEvent>) => {
              e.stopPropagation();
              // Un clic sul fotogramma centrale apre il progetto, sugli altri lo porta al centro.
              if (i === centered.current) window.location.href = f.href;
              else useScene.setState({ drag: i });
            }}
            onPointerOver={() => (document.body.style.cursor = "pointer")}
            onPointerOut={() => (document.body.style.cursor = "")}
          >
            <planeGeometry args={[layout[i].w, H]} />
            <meshBasicMaterial map={textures[i]} toneMapped={false} />
          </mesh>
          {/* Il filo di luce sotto il fotogramma acceso. */}
          <mesh
            position={[0, -H / 2 - 0.12, 0]}
            ref={(m) => {
              glows.current[i] = m;
            }}
          >
            <planeGeometry args={[layout[i].w, 0.035]} />
            <meshBasicMaterial color={MINT.clone().multiplyScalar(3)} toneMapped={false} transparent opacity={0} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function FilmStrip({ frames, still, active, onCenter, onReady }: Props) {
  const [quality, setQuality] = useState<"high" | "low">("high");
  return (
    <Canvas
      className="filmstrip__canvas"
      dpr={quality === "high" ? [1, 2] : 1}
      frameloop={!active ? "never" : still ? "demand" : "always"}
      camera={{ position: [0, 0, 6.4], fov: 32 }}
      gl={{ antialias: true }}
      onCreated={() => onReady()}
      aria-hidden
    >
      <color attach="background" args={["#07090d"]} />
      <PerformanceMonitor onDecline={() => setQuality("low")} />
      <Strip frames={frames} still={still} onCenter={onCenter} />
      {quality === "high" && !still && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={0.9} luminanceThreshold={0.95} luminanceSmoothing={0.1} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
