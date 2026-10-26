import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";

import { isLocale, locales, site } from "@/content/site";
import { bigShoulders, publicSans } from "@/lib/fonts";
import { getDictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";

import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const viewport: Viewport = {
  themeColor: "#07090d",
  colorScheme: "dark",
};

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getDictionary(lang);
  return {
    metadataBase: new URL(site.url),
    title: t.meta.title,
    description: t.meta.description,
    alternates: {
      canonical: `/${lang}/`,
      languages: { it: "/it/", en: "/en/", "x-default": "/" },
    },
    icons: { icon: withBase("/favicon.svg") },
    openGraph: {
      type: "website",
      title: t.meta.title,
      description: t.meta.description,
      url: `/${lang}/`,
      locale: lang === "it" ? "it_IT" : "en_US",
      images: [{ url: "/projects/gamemode/home.webp", width: 1920, height: 1080 }],
    },
  };
}

// Aggiunge la classe `js` prima del primo paint: le entrate animate nascondono il contenuto
// solo quando lo script c'è davvero (senza script la pagina resta tutta visibile).
const jsFlag = "document.documentElement.classList.add('js')";

export default async function LangLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  return (
    <html lang={lang} className={`${bigShoulders.variable} ${publicSans.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
