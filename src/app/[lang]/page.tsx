import { notFound } from "next/navigation";

import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { Nav } from "@/components/sections/Nav";
import { Projects } from "@/components/sections/Projects";
import { ControllerBridge } from "@/components/ui/ControllerBridge";
import { Motion } from "@/components/ui/Motion";
import { isLocale } from "@/content/site";
import { getDictionary } from "@/lib/i18n";
import { sectionIds } from "@/lib/sections";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getDictionary(lang);
  return (
    <>
      <a className="skip" href={`#${sectionIds(lang).work}`}>
        {t.skip}
      </a>
      <Nav t={t} lang={lang} />
      <main>
        <Hero t={t} lang={lang} />
        <Projects t={t} lang={lang} />
        <About t={t} lang={lang} />
        <Contact t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <Motion />
      <ControllerBridge message={t.controller.connected} />
    </>
  );
}
