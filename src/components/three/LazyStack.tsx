"use client";

import dynamic from "next/dynamic";

// three.js resta in un chunk separato, caricato solo nel browser.
export const LazyStack = dynamic(() => import("./StackScene"), { ssr: false });
