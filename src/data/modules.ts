export interface ModuleTool {
  title: string;
  desc: string;
}

export const BRIDGES_TOOLS: ModuleTool[] = [
  { title: "Incident Log",          desc: "Document exchanges, violations, or concerns" },
  { title: "Communication Tracker", desc: "Log co-parent messages and responses" },
  { title: "Court-Ready Summary",   desc: "Generate neutral narrative from your notes" },
  { title: "Evidence Timeline",     desc: "Build a chronological evidence record" },
];

export const MENTAL_TOOLS: ModuleTool[] = [
  { title: "Safety Plan",         desc: "Build a personalized crisis safety plan" },
  { title: "Wellness Journal",    desc: "Private, encrypted emotional health log" },
  { title: "De-escalation Tools", desc: "Rewrite triggering messages to calm tone" },
  { title: "Resource Navigator",  desc: "Local and national support resources" },
];

export const LEGAL_TOOLS: ModuleTool[] = [
  { title: "Client Intake",        desc: "Structured intake forms and issue spotting" },
  { title: "Case Checklists",      desc: "Jurisdiction-specific procedural checklists" },
  { title: "Drafting Assistant",   desc: "Document structure and clause organization" },
  { title: "8th Circuit Appeals",  desc: "Protection order appeal workflow and deadlines" },
];
