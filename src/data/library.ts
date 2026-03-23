// ── Types ─────────────────────────────────────────────────────────────────────

export type ContentType = "slides" | "video" | "audio" | "guide";
export type ContentTier = "free" | "parent" | "professional";

export interface LibraryItem {
  id: string;
  title: string;
  description: string;
  type: ContentType;
  /** Minimum tier required to access this item */
  tier: ContentTier;
  url: string;
  /** For video/audio — e.g. "18 min" */
  duration?: string;
  /** For slides/guides — number of pages / slides */
  pages?: number;
  /** Target audience labels */
  roles?: string[];
  /** Show a "New" badge */
  isNew?: boolean;
  /** Thumbnail or cover image URL (optional) */
  thumbnail?: string;
}

// ── Guides (PDFs) ─────────────────────────────────────────────────────────────

export const GUIDES: LibraryItem[] = [
  {
    id: "guide-parallel-parenting",
    title: "Parallel Parenting Pathway",
    description:
      "A 4-week guide to disengaging from conflict while maintaining cooperation around your child's needs.",
    type: "guide",
    tier: "parent",
    url: "https://assets.cotrackpro.com/toolkits/Parallel_Parenting_Pathway.pdf",
    pages: 24,
    roles: ["Co-Parents"],
  },
  {
    id: "guide-documentation-fundamentals",
    title: "Documentation Fundamentals",
    description:
      "What the court actually needs to see — fact-based logs, timestamps, and chain-of-custody essentials.",
    type: "guide",
    tier: "parent",
    url: "https://assets.cotrackpro.com/toolkits/Documentation_Fundamentals.pdf",
    pages: 18,
    roles: ["Parents", "Survivors"],
  },
  {
    id: "guide-safety-planning-101",
    title: "Safety Planning 101 for Survivors",
    description:
      "Step-by-step safety planning framework covering digital hygiene, safe exchanges, and protection order prep.",
    type: "guide",
    tier: "parent",
    url: "https://assets.cotrackpro.com/toolkits/Safety_Planning_101.pdf",
    pages: 20,
    roles: ["Survivors"],
  },
  {
    id: "guide-advocate-coordination",
    title: "Advocate Coordination Strategy",
    description:
      "Coordinating trauma-informed support across agencies — intake protocols, referral systems, and handoff checklists.",
    type: "guide",
    tier: "parent",
    url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Advocate_Coordination_Strategyby_CoTrackPro.pdf",
    pages: 28,
    roles: ["Advocates", "DV Shelters"],
  },
  {
    id: "guide-case-architecture",
    title: "Case Architecture for Legal Stability",
    description:
      "How to structure a high-conflict custody case for clarity, credibility, and minimum attorney time.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/Case_Architecture_for_Legal_Stabilityby_CoTrackPro.pdf",
    pages: 34,
    roles: ["Attorneys"],
  },
  {
    id: "guide-clinical-implementation",
    title: "Clinical Implementation Guide",
    description:
      "Integrating CoTrackPro into therapeutic and evaluation practice — boundaries, documentation, and ethics.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Clinical_Implementationby_CoTrackPro.pdf",
    pages: 30,
    roles: ["Therapists", "Forensic Psychologists"],
  },
  {
    id: "guide-system-architecture",
    title: "System Architecture for Family Stability",
    description:
      "Designing repeatable, neutral systems for mediation, parenting coordination, and agreement drafting.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_System_Architecture_for_Family_Stabilityby_CoTrackPro.pdf",
    pages: 32,
    roles: ["Mediators", "Parenting Coordinators"],
  },
  {
    id: "guide-judicial-protocol",
    title: "Judicial Protocol & Infrastructure Upgrade",
    description:
      "Modernising family court case management — trauma-informed orders, standardised documentation, and repeat-filing reduction.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/Judicial_Protocol_and_Infrastructure_Upgradeby_CoTrackPro.pdf",
    pages: 40,
    roles: ["Judges"],
  },
  {
    id: "guide-advocate-ecosystem",
    title: "Advocate Ecosystem Clarity",
    description:
      "Mapping every stakeholder in a high-conflict case — roles, authority limits, and handoff responsibilities.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/Advocate_Ecosystem_Clarityby_CoTrackPro.pdf",
    pages: 26,
    roles: ["GALs", "Advocates"],
  },
  {
    id: "guide-clinical-court-stability",
    title: "Clinical Structure for Family Court Stability",
    description:
      "Evidence-based clinical structures that reduce court chaos and improve long-term family outcomes.",
    type: "guide",
    tier: "professional",
    url: "https://assets.cotrackpro.com/toolkits/Clinical_Structure_for_Family_Court_Stability_by_CoTrackPro.pdf",
    pages: 38,
    roles: ["Attorneys", "Mental Health Professionals"],
    isNew: true,
  },
];

// ── Slide Decks ───────────────────────────────────────────────────────────────

export const SLIDES: LibraryItem[] = [
  {
    id: "slides-biff-masterclass",
    title: "BIFF Method Masterclass",
    description:
      "Brief, Informative, Friendly, Firm — 30 annotated slides walking through the BIFF framework with real message examples.",
    type: "slides",
    tier: "parent",
    url: "https://assets.cotrackpro.com/slides/BIFF_Method_Masterclass.pdf",
    pages: 30,
    roles: ["Co-Parents", "Survivors"],
  },
  {
    id: "slides-forensic-journalism",
    title: "Forensic Journalism: Facts vs. Interpretations",
    description:
      "Teaches the skill of writing incident logs that read like reporter's notes — objective, timestamped, and court-credible.",
    type: "slides",
    tier: "parent",
    url: "https://assets.cotrackpro.com/slides/Forensic_Journalism.pdf",
    pages: 24,
    roles: ["Parents", "Survivors", "Pro-Se"],
  },
  {
    id: "slides-evidence-vault",
    title: "Evidence Vault: Organising Your Case",
    description:
      "Step-by-step visual guide to collecting, preserving, and exporting digital evidence in court-ready format.",
    type: "slides",
    tier: "parent",
    url: "https://assets.cotrackpro.com/slides/Evidence_Vault_Guide.pdf",
    pages: 28,
    roles: ["Parents", "Attorneys"],
  },
  {
    id: "slides-deescalation-framework",
    title: "High-Conflict De-escalation Framework",
    description:
      "A professional-grade slide deck covering the stages of conflict escalation and evidence-based intervention points.",
    type: "slides",
    tier: "professional",
    url: "https://assets.cotrackpro.com/slides/Deescalation_Framework.pdf",
    pages: 44,
    roles: ["Attorneys", "Therapists", "Mediators"],
  },
  {
    id: "slides-8th-circuit-appeal",
    title: "8th Circuit Appeal Workflow",
    description:
      "Complete procedural slide deck for filing and managing a protection order appeal in the Eighth Circuit Court of Appeals.",
    type: "slides",
    tier: "professional",
    url: "https://assets.cotrackpro.com/slides/8th_Circuit_Appeal_Workflow.pdf",
    pages: 52,
    roles: ["Attorneys"],
    isNew: true,
  },
  {
    id: "slides-court-neutral-communication",
    title: "Court-Neutral Communication for Professionals",
    description:
      "How attorneys, GALs, and therapists write reports, letters, and recommendations that survive cross-examination.",
    type: "slides",
    tier: "professional",
    url: "https://assets.cotrackpro.com/slides/Court_Neutral_Communication.pdf",
    pages: 36,
    roles: ["Attorneys", "GALs", "Therapists"],
  },
];

// ── Videos ────────────────────────────────────────────────────────────────────

export const VIDEOS: LibraryItem[] = [
  {
    id: "video-testify-without-defensive",
    title: "How to Testify Without Looking Defensive",
    description:
      "Masterclass on courtroom demeanour, answering questions precisely, and maintaining credibility under pressure.",
    type: "video",
    tier: "parent",
    url: "https://assets.cotrackpro.com/videos/How_to_Testify.mp4",
    duration: "18 min",
    roles: ["Parents", "Pro-Se"],
  },
  {
    id: "video-organise-digital-evidence",
    title: "Organising Your Digital Evidence (Screen Share)",
    description:
      "Watch a live walkthrough of collecting screenshots, metadata, and exports — then building a court-ready evidence packet.",
    type: "video",
    tier: "parent",
    url: "https://assets.cotrackpro.com/videos/Organising_Digital_Evidence.mp4",
    duration: "12 min",
    roles: ["Parents", "Attorneys"],
  },
  {
    id: "video-biff-role-play",
    title: "BIFF Response Role-Play Scenarios",
    description:
      "Acted scenarios showing the before/after of hostile texts transformed into brief, firm, court-safe replies.",
    type: "video",
    tier: "parent",
    url: "https://assets.cotrackpro.com/videos/BIFF_Role_Play.mp4",
    duration: "15 min",
    roles: ["Co-Parents", "Survivors"],
  },
  {
    id: "video-pro-se-motion-filing",
    title: "Pro-Se Motion Filing Walkthrough",
    description:
      "Step-by-step tutorial on drafting, formatting, filing, and serving a motion without an attorney.",
    type: "video",
    tier: "parent",
    url: "https://assets.cotrackpro.com/videos/ProSe_Motion_Filing.mp4",
    duration: "22 min",
    roles: ["Pro-Se"],
  },
  {
    id: "video-attorney-high-conflict",
    title: "Attorney Deep Dive: High-Conflict Case Strategy",
    description:
      "A family law partner breaks down the 5 most common documentation mistakes clients make — and how to prevent them.",
    type: "video",
    tier: "professional",
    url: "https://assets.cotrackpro.com/videos/Attorney_High_Conflict_Strategy.mp4",
    duration: "35 min",
    roles: ["Attorneys"],
  },
  {
    id: "video-forensic-psych-qa",
    title: "Forensic Psychologist Q&A: What Judges Notice",
    description:
      "Expert interview on custody evaluation credibility, report-writing standards, and the red flags that sink a case.",
    type: "video",
    tier: "professional",
    url: "https://assets.cotrackpro.com/videos/Forensic_Psych_QA.mp4",
    duration: "28 min",
    roles: ["Forensic Psychologists", "Attorneys", "GALs"],
    isNew: true,
  },
];

// ── Audio ─────────────────────────────────────────────────────────────────────

export const AUDIO: LibraryItem[] = [
  {
    id: "audio-podcast-spotify",
    title: "CoTrackPro Podcast",
    description:
      "Our full podcast feed — strategy, survivor stories, attorney Q&As, and pep talks for every stage of a high-conflict case.",
    type: "audio",
    tier: "free",
    url: "https://open.spotify.com/show/4oMoQvEqw9g3ofsCJd92Qf",
    duration: "Ongoing",
    roles: ["Everyone"],
  },
  {
    id: "audio-pre-exchange-pep-talk",
    title: "Pre-Exchange Anxiety: 5-Minute Pep Talk",
    description:
      "A calm, grounding audio session to listen to on the way to a custody exchange when anxiety is running high.",
    type: "audio",
    tier: "parent",
    url: "https://assets.cotrackpro.com/audio/Pre_Exchange_Pep_Talk.mp3",
    duration: "5 min",
    roles: ["Co-Parents", "Survivors"],
  },
  {
    id: "audio-boring-response",
    title: "The Art of the Boring Response",
    description:
      "Why deliberately dull replies win in court — and how to train yourself to send them automatically.",
    type: "audio",
    tier: "parent",
    url: "https://assets.cotrackpro.com/audio/Art_of_the_Boring_Response.mp3",
    duration: "10 min",
    roles: ["Co-Parents"],
  },
  {
    id: "audio-grey-rock-deep-dive",
    title: "Grey Rock Method Deep Dive",
    description:
      "The psychology behind the Grey Rock technique and step-by-step application for high-conflict co-parenting.",
    type: "audio",
    tier: "parent",
    url: "https://assets.cotrackpro.com/audio/Grey_Rock_Deep_Dive.mp3",
    duration: "14 min",
    roles: ["Co-Parents", "Survivors"],
  },
  {
    id: "audio-legal-strategy-parents",
    title: "Legal Strategy for High-Conflict Co-Parents",
    description:
      "An attorney walks through the 3 things that matter most in a custody modification — and how to document them.",
    type: "audio",
    tier: "parent",
    url: "https://assets.cotrackpro.com/audio/Legal_Strategy_CoParents.mp3",
    duration: "20 min",
    roles: ["Parents", "Pro-Se"],
  },
  {
    id: "audio-survivor-resilience",
    title: "Survivor Stories: Resilience & Strategy",
    description:
      "Three survivors share how they documented coercive control, rebuilt stability, and protected their children.",
    type: "audio",
    tier: "parent",
    url: "https://assets.cotrackpro.com/audio/Survivor_Resilience_Stories.mp3",
    duration: "30 min",
    roles: ["Survivors"],
  },
  {
    id: "audio-clinician-burnout",
    title: "Clinician Burnout in High-Conflict Cases",
    description:
      "Self-care and supervision strategies for therapists, GALs, and attorneys dealing with secondary trauma.",
    type: "audio",
    tier: "professional",
    url: "https://assets.cotrackpro.com/audio/Clinician_Burnout.mp3",
    duration: "18 min",
    roles: ["Therapists", "GALs", "Attorneys"],
    isNew: true,
  },
];

// ── Unified export ────────────────────────────────────────────────────────────

export const LIBRARY: LibraryItem[] = [
  ...SLIDES,
  ...VIDEOS,
  ...AUDIO,
  ...GUIDES,
];

/** Returns true if the user's tier satisfies the item's minimum tier requirement */
export function canAccess(userTier: string | null | undefined, itemTier: ContentTier): boolean {
  if (itemTier === "free") return true;
  if (!userTier) return false;
  if (itemTier === "parent") return userTier === "parent" || userTier === "professional";
  if (itemTier === "professional") return userTier === "professional";
  return false;
}
