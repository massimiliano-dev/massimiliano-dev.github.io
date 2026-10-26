// Gli asset in public/ vanno serviti sotto il basePath quando il sito non sta alla radice.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function withBase(path: string): string {
  return `${basePath}${path}`;
}
