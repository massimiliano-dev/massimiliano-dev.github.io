import type { Dictionary } from "./it";

const en: Dictionary = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "I build software from the database to the interface: business tools, web platforms and desktop apps like GameMode.",
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
    sentence:
      "Full-stack developer. I build software from the database to the interface: business tools and web platforms by day, desktop apps and my own projects by night.",
    action: "See the projects",
    hint: "The stack is my job: data at the bottom, server in the middle, interface on top. Drag it to turn it.",
    sceneLabel: "Three stacked 3D layers: database, server and interface",
  },
  projects: {
    title: "Projects",
    open: "Open the project",
    code: "Code",
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
      "I write software from the database to the interface. By day I build management tools, CRMs and SaaS platforms, mostly with Next.js, TypeScript and PostgreSQL. At night I work on my own projects, like GameMode, which pulled me into Rust and the Windows APIs, where the hard part is figuring out why one program steals focus from another.",
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
    title: "Contact",
    sentence: "Write to me about a project or a job offer.",
    place: "Italy",
  },
  footer: {
    what: "Massimiliano Polce, full-stack developer",
    note: "No cookies, no tracking",
  },
  controller: {
    connected: "Controller connected: up and down for sections, A to open, left and right to turn the stack.",
  },
  root: {
    choose: "Choose a language",
  },
};

export default en;
