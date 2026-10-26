"use client";

import dynamic from "next/dynamic";

// three.js resta in un chunk separato, caricato solo nel browser.
export const LazyFilmStrip = dynamic(() => import("./FilmStrip"), { ssr: false });
