import type { Metadata } from "next";

import { site } from "@/content/site";
import { publicSans } from "@/lib/fonts";

import "../globals.css";

export const metadata: Metadata = {
  title: site.name,
  robots: { index: false },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="it" className={publicSans.variable}>
      <body>{children}</body>
    </html>
  );
}
