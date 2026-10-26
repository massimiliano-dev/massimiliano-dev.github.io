"use client";

import { Environment, Float, Grid, Lightformer, PerformanceMonitor, RoundedBox, Sparkles } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Bloom, EffectComposer, Vignette } from "@react-three/postprocessing";
import { type ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";

import { useScene } from "@/lib/scene-store";

export type StackVariant = "hero" | "contact";

interface Props {
  variant: StackVariant;
  /** Movimento ridotto: posa ferma, si ridisegna solo quando serve. */
  still: boolean;
  /** Visibile nello schermo: fuori schermo la scena non gira. */
  active: boolean;
  /** Spostamento orizzontale della pila, in frazione della larghezza visibile (0 = centro). */
  offsetX?: number;
  onReady: () => void;
}

const MINT = "#5ef2c8";
const BLUE = "#4aa3ff";
const BG = "#07090d";
const damp = THREE.MathUtils.damp;

// "Dal database all'interfaccia": tre livelli impilati. In basso i dati, in mezzo il server, in alto lo schermo.
const W = 2.7;
const D = 1.9;
const H = 0.16;

function Slab({ ink, children, glow = MINT }: { ink: boolean; children?: ReactNode; glow?: string }) {
  return (
    <group>
      <RoundedBox args={[W, H, D]} radius={0.07} smoothness={4}>
        <meshPhysicalMaterial
          color={ink ? "#032018" : "#10151d"}
          roughness={ink ? 0.5 : 0.3}
          metalness={ink ? 0 : 0.3}
          clearcoat={ink ? 0.3 : 1}
          clearcoatRoughness={0.2}
          envMapIntensity={ink ? 0.3 : 1}
        />
      </RoundedBox>
      {/* Il filo di luce sotto ogni livello: è lui che fa il bloom. */}
      {!ink && (
        <RoundedBox args={[W + 0.04, 0.025, D + 0.04]} radius={0.012} smoothness={2} position={[0, -H / 2 - 0.005, 0]}>
          <meshStandardMaterial color={glow} emissive={glow} emissiveIntensity={2.4} toneMapped={false} />
        </RoundedBox>
      )}
      {children}
    </group>
  );
}

/** Piccoli pezzi sulla superficie di un livello. */
function Bit({ ink, args, position, color = MINT, lit = 0.5 }: { ink: boolean; args: [number, number, number]; position: [number, number, number]; color?: string; lit?: number }) {
  return (
    <RoundedBox args={args} radius={Math.min(args[0], args[1], args[2]) * 0.3} smoothness={2} position={position}>
      <meshStandardMaterial
        color={ink ? "#0a3a2e" : color}
        emissive={ink ? "#000000" : color}
        emissiveIntensity={ink ? 0 : lit}
        roughness={0.35}
        toneMapped={ink}
      />
    </RoundedBox>
  );
}

function Stack({ variant, still, offsetX = 0 }: { variant: StackVariant; still: boolean; offsetX?: number }) {
  const ink = variant === "contact";
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const viewport = useThree((s) => s.viewport);
  const invalidate = useThree((s) => s.invalidate);
  const born = useRef(0);

  useEffect(() => {
    born.current = performance.now();
  }, []);

  useEffect(() => {
    if (!still) return;
    return useScene.subscribe(() => invalidate());
  }, [still, invalidate]);

  useFrame((_, dt) => {
    const g = root.current;
    if (!g) return;
    const s = useScene.getState();
    const now = performance.now();
    const k = still ? 1e3 : 1;
    const intro = still || !born.current ? 1 : Math.min(1, (now - born.current) / 1400);
    const ease = 1 - Math.pow(1 - intro, 3);

    // Quanto si separano i livelli: arrivano chiusi, si aprono all'entrata e ancora di più con lo scroll.
    const p = ink ? s.contactProgress : s.heroProgress;
    const spread = ink ? 0.55 + p * 0.25 : 0.42 + ease * 0.2 + p * 0.55;
    layers.current.forEach((layer, i) => {
      if (!layer) return;
      layer.position.y = damp(layer.position.y, (i - 1) * spread, 6 * k, dt);
      // Ogni livello ruota un po' per conto suo mentre si apre.
      layer.rotation.y = damp(layer.rotation.y, (i - 1) * p * 0.35, 6 * k, dt);
    });

    const drag = s.drag;
    const rx = 0.52 + (still ? 0 : s.pointer.y * -0.12) + (ink ? 0 : p * 0.15);
    const ry = -0.65 + drag + (still ? 0 : s.pointer.x * 0.25) - (1 - ease) * 1.8 + (ink ? -p * 0.8 : p * 0.6);
    g.rotation.x = damp(g.rotation.x, rx, 6 * k, dt);
    g.rotation.y = damp(g.rotation.y, ry, 6 * k, dt);
    g.position.x = damp(g.position.x, viewport.width * offsetX, 8 * k, dt);
    const scale = ink ? 0.82 : 0.6 + ease * 0.4;
    g.scale.setScalar(damp(g.scale.x, scale, 8 * k, dt));
  });

  const top = H / 2;
  return (
    <group ref={root} rotation={[0.52, -0.65, 0]} scale={ink ? 0.82 : still ? 1 : 0.6}>
      {/* In basso: i dati. Tre dischi impilati, l'icona di sempre del database. */}
      <group ref={(el) => void (layers.current[0] = el)}>
        <Slab ink={ink} glow={BLUE}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} position={[-0.75, top + 0.06 + i * 0.12, 0]}>
              <cylinderGeometry args={[0.32, 0.32, 0.09, 40]} />
              <meshStandardMaterial
                color={ink ? "#0a3a2e" : BLUE}
                emissive={ink ? "#000000" : BLUE}
                emissiveIntensity={ink ? 0 : 0.45 + i * 0.15}
                roughness={0.3}
                toneMapped={ink}
              />
            </mesh>
          ))}
          {[0, 1, 2, 3].map((i) => (
            <Bit key={i} ink={ink} args={[0.9, 0.04, 0.12]} position={[0.55, top + 0.02, -0.5 + i * 0.32]} color="#2a6f9c" lit={0.25} />
          ))}
        </Slab>
      </group>
      {/* In mezzo: il server. Righe di porte, qualcuna accesa. */}
      <group ref={(el) => void (layers.current[1] = el)}>
        <Slab ink={ink}>
          {Array.from({ length: 4 }).map((_, row) =>
            Array.from({ length: 7 }).map((__, col) => (
              <mesh key={`${row}-${col}`} position={[-1.0 + col * 0.33, top + 0.02, -0.55 + row * 0.36]}>
                <cylinderGeometry args={[0.055, 0.055, 0.04, 16]} />
                <meshStandardMaterial
                  color={ink ? "#0a3a2e" : (row * 7 + col) % 5 === 0 ? MINT : "#1d2633"}
                  emissive={ink ? "#000000" : MINT}
                  emissiveIntensity={ink ? 0 : (row * 7 + col) % 5 === 0 ? 2 : 0}
                  toneMapped={ink}
                />
              </mesh>
            )),
          )}
        </Slab>
      </group>
      {/* In alto: l'interfaccia. Una barra, una colonna e tre schede. */}
      <group ref={(el) => void (layers.current[2] = el)}>
        <Slab ink={ink}>
          <Bit ink={ink} args={[2.3, 0.04, 0.22]} position={[0, top + 0.02, -0.68]} color="#e9eef5" lit={0.35} />
          <Bit ink={ink} args={[0.5, 0.04, 1.1]} position={[-0.9, top + 0.02, 0.15]} color="#3a4658" lit={0.2} />
          <Bit ink={ink} args={[0.5, 0.06, 0.62]} position={[-0.15, top + 0.03, 0.0]} color={MINT} lit={0.9} />
          <Bit ink={ink} args={[0.5, 0.06, 0.62]} position={[0.45, top + 0.03, 0.0]} color="#3a4658" lit={0.25} />
          <Bit ink={ink} args={[0.5, 0.06, 0.62]} position={[1.05, top + 0.03, 0.0]} color="#3a4658" lit={0.25} />
          <Bit ink={ink} args={[1.7, 0.04, 0.14]} position={[0.45, top + 0.02, 0.55]} color="#3a4658" lit={0.2} />
        </Slab>
      </group>
    </group>
  );
}

/** La camera si avvicina mentre l'hero scorre; la griglia neon scivola sotto la pila. */
function HeroRig({ still }: { still: boolean }) {
  const grid = useRef<THREE.Mesh>(null);
  useFrame(({ camera }, dt) => {
    const p = useScene.getState().heroProgress;
    const k = still ? 1e3 : 1;
    camera.position.z = damp(camera.position.z, 7.2 - p * 1.1, 6 * k, dt);
    camera.position.y = damp(camera.position.y, 0.4 + p * 0.2, 6 * k, dt);
    camera.lookAt(0, 0, 0);
    if (grid.current && !still) grid.current.position.z = (grid.current.position.z + dt * 0.35) % 2;
  });
  return (
    <Grid
      ref={grid}
      position={[0, -1.9, 0]}
      args={[40, 40]}
      cellSize={0.5}
      cellThickness={0.6}
      cellColor="#123d35"
      sectionSize={2}
      sectionThickness={1.1}
      sectionColor={MINT}
      fadeDistance={26}
      fadeStrength={2.2}
      infiniteGrid
    />
  );
}

function Lights({ ink }: { ink: boolean }) {
  return (
    <>
      <ambientLight intensity={ink ? 1 : 0.35} />
      <directionalLight position={[3, 5, 4]} intensity={ink ? 1.2 : 1.6} />
      {!ink && <pointLight position={[-3, -1, 3]} intensity={6} color={BLUE} />}
      {/* Riflessi da luci procedurali: nessuna mappa HDR da scaricare. */}
      <Environment resolution={256} frames={1}>
        <Lightformer form="rect" intensity={3} position={[0, 4, 4]} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={1.5} position={[-5, 0, 2]} rotation-y={Math.PI / 2} scale={[6, 2, 1]} />
        <Lightformer form="ring" intensity={2} color={ink ? "#ffffff" : MINT} position={[4, -1, 3]} scale={2} />
      </Environment>
    </>
  );
}

export default function StackScene({ variant, still, active, offsetX = 0, onReady }: Props) {
  const [quality, setQuality] = useState<"high" | "low">("high");
  const hero = variant === "hero";
  const fx = hero && quality === "high";

  return (
    <Canvas
      className="scene__canvas"
      dpr={quality === "high" ? [1, 1.75] : 1}
      frameloop={!active ? "never" : still ? "demand" : "always"}
      camera={{ position: [0, hero ? 0.4 : 0.2, hero ? 7.2 : 6.4], fov: 35 }}
      gl={{ antialias: true, alpha: !hero, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        onReady();
      }}
      aria-hidden
    >
      {hero && <color attach="background" args={[BG]} />}
      {hero && <fog attach="fog" args={[BG, 8, 24]} />}
      <PerformanceMonitor onDecline={() => setQuality("low")} />
      <Lights ink={!hero} />
      {hero ? (
        <>
          <HeroRig still={still} />
          <Float enabled={!still} speed={1.2} rotationIntensity={0.08} floatIntensity={0.3}>
            <Stack variant={variant} still={still} offsetX={offsetX} />
          </Float>
          {quality === "high" && <Sparkles count={70} scale={[12, 5, 8]} size={2.4} speed={still ? 0 : 0.25} color={MINT} opacity={0.55} />}
        </>
      ) : (
        <Stack variant={variant} still={still} />
      )}
      {fx && (
        <EffectComposer multisampling={0}>
          <Bloom mipmapBlur intensity={1.1} luminanceThreshold={0.6} luminanceSmoothing={0.25} />
          <Vignette eskil={false} offset={0.25} darkness={0.6} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
