"use client";

import { useEffect, useState } from "react";

/** L'ora in Italia, aggiornata ogni minuto. Prima dell'idratazione mostra un segnaposto della stessa larghezza. */
export function RomeClock({ lang }: { lang: string }) {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat(lang === "it" ? "it-IT" : "en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Rome" });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [lang]);
  return <time className="tile__clock display">{now ?? "--:--"}</time>;
}
