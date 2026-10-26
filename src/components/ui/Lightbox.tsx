"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ingrandimento: un clic su un'immagine marcata data-zoom la apre a schermo intero in un <dialog>.
 * Esc, un clic fuori o il pulsante la chiudono, e il focus torna dove era.
 */
export function Lightbox({ closeLabel }: { closeLabel: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [shot, setShot] = useState<{ src: string; alt: string } | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest<HTMLElement>("[data-zoom]");
      if (!btn) return;
      e.preventDefault();
      opener.current = btn;
      setShot({ src: btn.dataset.zoom!, alt: btn.dataset.alt ?? "" });
      dialog.current?.showModal();
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      onClose={() => opener.current?.focus()}
      onClick={(e) => {
        if (e.target === dialog.current) dialog.current?.close();
      }}
    >
      {shot && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={shot.src} alt={shot.alt} />
      )}
      <button type="button" className="lightbox__close" onClick={() => dialog.current?.close()}>
        {closeLabel}
      </button>
    </dialog>
  );
}
