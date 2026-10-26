import type { Dictionary } from "./it";

const en: Dictionary = {
  meta: {
    title: "Massimiliano Polce, full-stack developer",
    description:
      "Full-stack developer: I build web applications and custom software, bring AI into products and publish open source projects.",
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
      "I build web applications and custom software, working on both the backend and the interface, and I bring artificial intelligence into the products I build. I use it every day in my own work too.",
    action: "See the projects",
    contact: "Write to me",
    stripLabel: "Frames from the projects",
    stripHint: "Click a frame to open its project.",
  },
  projects: {
    title: "Projects",
    filters: { all: "All", library: "Libraries and tools", app: "Apps" },
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
      "I'm a full-stack developer building custom software for businesses, mostly management tools, CRMs and SaaS platforms. I follow projects end to end, from analysis to release, and aim for solutions that are simple to use and easy to maintain over time. I work a lot with artificial intelligence: I bring language models into applications, with agents, document search and MCP servers, and I use AI assistants every day while developing. I write mostly TypeScript, and use Rust or Python when the job calls for it.",
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
      {
        title: "AI",
        items: [
          ["OpenAI and Anthropic APIs", "AI in business apps"],
          ["LangGraph.js", "agents"],
          ["RAG and embeddings", "document search"],
          ["Model Context Protocol", "tools for assistants"],
          ["Ollama", "local models"],
          ["Claude Code", "agentic development"],
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
    statement: "Web applications, custom software and artificial intelligence.",
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
