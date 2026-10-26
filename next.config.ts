import type { NextConfig } from "next";

// Sito statico per GitHub Pages: `next build` produce la cartella `out/`.
// Il repo `massimiliano-dev.github.io` è servito alla radice, quindi il basePath è vuoto;
// se un giorno il sito finisce in un sottopercorso basta impostare NEXT_PUBLIC_BASE_PATH (es. "/portfolio").
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
