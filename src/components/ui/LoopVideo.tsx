"use client";

import { useEffect, useRef } from "react";

import { withBase } from "@/lib/paths";
import { useInView, useReducedMotion } from "@/lib/use-media";

/**
 * Un video muto in loop che gira solo mentre è nello schermo.
 * Con "riduci movimento" resta fermo sul poster, con i controlli a disposizione.
 */
export function LoopVideo({ base, poster, label }: { base: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const inView = useInView(ref, "0px");
  const still = useReducedMotion();

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (inView && !still) v.play().catch(() => {});
    else v.pause();
  }, [inView, still]);

  return (
    <video
      ref={ref}
      muted
      loop
      playsInline
      preload="metadata"
      poster={withBase(poster)}
      aria-label={label}
      controls={still}
      width={1920}
      height={1080}
    >
      <source src={withBase(`${base}.webm`)} type="video/webm" />
      <source src={withBase(`${base}.mp4`)} type="video/mp4" />
    </video>
  );
}
