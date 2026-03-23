export interface ModuleTool {
  title: string;
  desc: string;
  href: string;
}

export const BRIDGES_TOOLS: ModuleTool[] = [
  { title: "Incident Log",          desc: "Document exchanges, violations, or concerns",      href: "https://track.cotrackpro.com" },
  { title: "Communication Tracker", desc: "Log co-parent messages and responses",             href: "https://bridges.cotrackpro.com" },
  { title: "Court-Ready Summary",   desc: "Generate neutral narrative from your notes",       href: "https://bridges.cotrackpro.com" },
  { title: "Evidence Timeline",     desc: "Build a chronological evidence record",            href: "https://evidence.cotrackpro.com" },
];

export const MENTAL_TOOLS: ModuleTool[] = [
  { title: "Safety Plan",         desc: "Build a personalized crisis safety plan",          href: "https://peace.cotrackpro.com" },
  { title: "Wellness Journal",    desc: "Private, encrypted emotional health log",          href: "https://mental.cotrackpro.com" },
  { title: "De-escalation Tools", desc: "Rewrite triggering messages to calm tone",         href: "https://bridges.cotrackpro.com" },
  { title: "Resource Navigator",  desc: "Local and national support resources",             href: "https://mental.cotrackpro.com" },
];

export const LEGAL_TOOLS: ModuleTool[] = [
  { title: "Client Intake",        desc: "Structured intake forms and issue spotting",      href: "https://legal.cotrackpro.com" },
  { title: "Case Checklists",      desc: "Jurisdiction-specific procedural checklists",     href: "https://legal.cotrackpro.com" },
  { title: "Drafting Assistant",   desc: "Document structure and clause organization",      href: "https://legal.cotrackpro.com" },
  { title: "8th Circuit Appeals",  desc: "Protection order appeal workflow and deadlines",  href: "https://legal.cotrackpro.com" },
];
