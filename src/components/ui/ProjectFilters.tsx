"use client";

import { useState } from "react";

type Filter = "all" | "library" | "app";

/** Filtri della sezione progetti: nascondono le strisce delle altre categorie (con lo script; senza, si vedono tutte). */
export function ProjectFilters({ labels }: { labels: Record<Filter, string> }) {
  const [active, setActive] = useState<Filter>("all");
  const choose = (f: Filter) => {
    setActive(f);
    document.querySelector<HTMLElement>("[data-sheet]")?.setAttribute("data-filter", f);
  };
  return (
    <div className="rail__filters" role="group">
      {(Object.keys(labels) as Filter[]).map((f) => (
        <button key={f} type="button" aria-pressed={active === f} className="rail__filter" onClick={() => choose(f)}>
          {labels[f]}
        </button>
      ))}
    </div>
  );
}
