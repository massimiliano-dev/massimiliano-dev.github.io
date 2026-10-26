import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Footer } from "@/components/sections/Footer";
import { Nav } from "@/components/sections/Nav";
import { ProjectDetail } from "@/components/sections/ProjectDetail";
import { ControllerBridge } from "@/components/ui/ControllerBridge";
import { Motion } from "@/components/ui/Motion";
import { projects } from "@/content/projects";
import { isLocale, type Locale, locales } from "@/content/site";
import { getDictionary } from "@/lib/i18n";
import { withBase } from "@/lib/paths";
import { projectPath } from "@/lib/sections";

// /it/progetti/<slug>/ e /en/projects/<slug>/, solo per i progetti che hanno una pagina.
const SECTION: Record<Locale, string> = { it: "progetti", en: "projects" };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projects.filter((p) => p.features?.length).map((p) => ({ lang, section: SECTION[lang], slug: p.slug })),
  );
}

async function resolve(params: PageProps<"/[lang]/[section]/[slug]">["params"]) {
  const { lang, section, slug } = await params;
  if (!isLocale(lang) || SECTION[lang] !== section) return null;
  const project = projects.find((p) => p.slug === slug && p.features?.length);
  return project ? { lang, project } : null;
}

export async function generateMetadata({ params }: PageProps<"/[lang]/[section]/[slug]">): Promise<Metadata> {
  const found = await resolve(params);
  if (!found) return {};
  const { lang, project } = found;
  return {
    title: `${project.name} · Massimiliano Polce`,
    description: project.summary[lang],
    alternates: {
      canonical: projectPath(lang, project.slug),
      languages: { it: projectPath("it", project.slug), en: projectPath("en", project.slug) },
    },
    openGraph: { images: [{ url: project.cover.image, width: 1920, height: 1080 }] },
  };
}

export default async function ProjectPage({ params }: PageProps<"/[lang]/[section]/[slug]">) {
  const found = await resolve(params);
  if (!found) notFound();
  const { lang, project } = found;
  const t = getDictionary(lang);
  const other: Locale = lang === "it" ? "en" : "it";
  return (
    <>
      <a className="skip" href="#project-title">
        {t.skip}
      </a>
      <Nav t={t} lang={lang} home={false} alternate={withBase(projectPath(other, project.slug))} />
      <main>
        <ProjectDetail project={project} t={t} lang={lang} />
      </main>
      <Footer t={t} lang={lang} />
      <Motion />
      <ControllerBridge message={t.controller.connected} />
    </>
  );
}
