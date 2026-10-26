import type { Dictionary } from "./it";

const en: Dictionary = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "Full-stack developer: I build web applications and custom software, and publish open source projects.",
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
      "I build web applications and custom software, working on both the backend and the interface. In my spare time I publish open source projects.",
    action: "See the projects",
    contact: "Write to me",
    stripLabel: "Frames from the projects",
    stripHint: "Click a frame to open its project.",
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
    intro: "What it is",
    solves: "What it solves",
    audience: "Who it's for",
    status: "Where it stands",
    featuresTitle: "What it does",
    figuresTitle: "Inside the repository",
    next: "Next project",
  },
  about: {
    title: "About",
    paragraph:
      "I'm a full-stack developer building custom software for businesses, mostly management tools, CRMs and SaaS platforms. I follow projects end to end, from analysis to release, and aim for solutions that are simple to use and easy to maintain over time. I work mostly in TypeScript, and when a problem calls for it I get closer to the system with Rust.",
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
          ["Rust", "systems software"],
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
    statement: "Web applications and custom software.",
    note: "No cookies, no tracking",
    time: "Time in Italy",
    invite: "Let's talk about a project",
  },
  controller: {
    connected: "Controller connected: up and down for sections, A to open.",
  },
  root: {
    choose: "Choose a language",
  },
};

export default en;
