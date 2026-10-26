import type { Dictionary } from "./it";

const en: Dictionary = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "I build software from the database to the interface: business tools, web platforms, desktop apps and open source libraries.",
  },
  skip: "Skip to content",
  nav: {
    label: "Main navigation",
    work: "Projects",
    about: "About",
    contact: "Contact",
    github: "GitHub",
    switchTo: "Italiano",
    switchShort: "IT",
  },
  hero: {
    who: "Full-stack developer in Italy.",
    sentence:
      "I build software from the database to the interface: business tools and web platforms by day, open source libraries and a game launcher for controllers by night.",
    action: "See the projects",
    contact: "Write to me",
    stripLabel: "Frames from the projects",
    stripHint: "Drag to browse, click to open the project.",
  },
  projects: {
    title: "Projects",
    filters: { all: "All", library: "Libraries", app: "Apps" },
    open: "Open the project",
    code: "Code",
    frames: "{n} images",
    step: "{n} of {total}",
  },
  project: {
    back: "All projects",
    repo: "Code on GitHub",
    download: "Download for Windows",
    site: "Open the site",
    featuresTitle: "What it does",
    figuresTitle: "Inside the repository",
    next: "Next project",
  },
  about: {
    title: "About",
    paragraph:
      "I write software from the database to the interface. By day I build management tools, CRMs and SaaS platforms, mostly with Next.js, TypeScript and PostgreSQL. At night I work on my own projects: open source libraries for NestJS and for Italy's electronic health record, a template for AI agents, and GameMode, which pulled me into Rust and the Windows APIs.",
    facts: [
      ["Role", "Full-stack developer"],
      ["Based in", "Italy"],
      ["GitHub", "massimiliano-dev"],
    ],
    toolsLabel: "Tools",
    lists: [
      {
        title: "Web",
        items: [
          ["Next.js and React", "business apps, SaaS"],
          ["TypeScript", "everywhere"],
          ["NestJS", "APIs and backends"],
          ["LangGraph.js", "AI agents"],
          ["PostgreSQL and Prisma", "data"],
          ["Tailwind CSS", "interfaces"],
          ["Zod", "validation"],
          ["Stripe", "payments"],
          ["Vitest and Playwright", "tests"],
          ["React Native", "mobile apps"],
        ],
      },
      {
        title: "Desktop and systems",
        items: [
          ["Rust", "GameMode"],
          ["Tauri 2", "desktop apps"],
          ["Win32 and WinRT", "Windows APIs"],
          ["axum and tokio", "local servers"],
          ["SQLite", "on-device data"],
          ["GitHub Actions", "builds and releases"],
        ],
      },
    ],
  },
  contact: {
    title: "Write to me",
    sentence: "About a project or a job offer.",
    email: "Email",
    copy: "Copy the address",
    copied: "Address copied",
    place: "Italy",
  },
  footer: {
    what: "Massimiliano Polce, full-stack developer",
    statement: "Software from the database to the interface.",
    note: "No cookies, no tracking",
    time: "Time in Italy",
    invite: "Let's talk about a project",
  },
  controller: {
    connected: "Controller connected: up and down for sections, A to open, left and right to browse.",
  },
  root: {
    choose: "Choose a language",
  },
};

export default en;
