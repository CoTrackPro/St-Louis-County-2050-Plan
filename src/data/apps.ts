
import { 
  Compass, BookOpen, CheckSquare, FileText, Video, Headphones, Smartphone 
} from 'lucide-react';
import { VaultItem, AppDirectoryItem } from './types';

export const VAULT_ITEMS: VaultItem[] = [
  {
    title: "Pathways",
    description: "Step-by-step routes that reduce guesswork and prevent escalation-driven mistakes.",
    icon: Compass,
    details: {
      subtitle: "Strategic Roadmaps for Complex Situations",
      features: [
        "Visual flowcharts for decision making (e.g., 'When to call police' vs. 'Log for court')",
        "Phased plans for reunification and custody transitions",
        "Recovery roadmaps for post-separation abuse",
        "Stage-specific guidance (Discovery, Deposition, Trial)"
      ],
      bestFor: "Understanding the 'Big Picture' and knowing exactly what move to make next.",
      example: "The 'Parallel Parenting' Pathway: A 4-week guide to disengaging from conflict while maintaining cooperation."
    }
  },
  {
    title: "Playbooks",
    description: "Role-specific scripts, decision rules, and best-practice operating procedures.",
    icon: BookOpen,
    details: {
      subtitle: "The Operating Manual for High-Conflict Life",
      features: [
        "Exact scripts for responding to accusations, gaslighting, and demands",
        "Email templates for teachers, doctors, and lawyers",
        "Protocols for exchange days and holidays",
        "Rules of Engagement for new partners"
      ],
      bestFor: "Daily communication and setting firm, unbreakable boundaries.",
      example: "The 'Grey Rock' Response Script Library: 50+ boring, non-reactive replies to baiting texts."
    }
  },
  {
    title: "Checklists",
    description: "Interactive and printable checklists that keep you consistent under pressure.",
    icon: CheckSquare,
    details: {
      subtitle: "Don't Miss a Step When It Matters Most",
      features: [
        "Evidence preservation checklists before wiping devices",
        "School enrollment and medical appointment logs",
        "Safety audit checklists for home and digital devices",
        "Court bag packing lists for hearing days"
      ],
      bestFor: "Reducing anxiety by ensuring you have handled every detail.",
      example: "The 'Exchange Day' Checklist: 10 steps to ensure a safe, documented, and drama-free transfer."
    }
  },
  {
    title: "Infographics",
    description: "High-impact visual guides you can share, print, and use in trainings.",
    icon: FileText,
    details: {
      subtitle: "Visual Evidence and Education Tools",
      features: [
        "Explainers on narcissism and coercive control for friends/family",
        "Visual timelines of the 'Cycle of Abuse'",
        "Printable 'Wheel of Power & Control' adaptations",
        "One-page summaries of court orders for quick reference"
      ],
      bestFor: "Quickly educating your support system (or the court) on complex dynamics.",
      example: "The 'Co-Parenting vs. Parallel Parenting' Comparison Chart."
    }
  },
  {
    title: "Videos",
    description: "Walkthroughs that help you implement the tools with confidence.",
    icon: Video,
    details: {
      subtitle: "Expert Guidance on Demand",
      features: [
        "Screen-share tutorials on how to organize digital evidence",
        "Role-play scenarios demonstrating BIFF responses",
        "Interviews with forensic psychologists and judges",
        "Walkthroughs of filing common pro-se motions"
      ],
      bestFor: "Visual learners who need to see the strategy in action.",
      example: "Masterclass: 'How to Testify Without Looking Defensive'."
    }
  },
  {
    title: "Podcasts",
    description: "On-the-go learning built for busy people who still need clarity.",
    icon: Headphones,
    details: {
      subtitle: "Audio Coaching in Your Pocket",
      features: [
        "Short, 10-minute 'Pep Talks' for pre-exchange anxiety",
        "Deep dives into legal strategies and custody laws",
        "Survivor stories focusing on resilience and strategy",
        "Q&A sessions with family law attorneys"
      ],
      bestFor: "Learning while commuting, driving, or doing chores.",
      example: "Episode: 'The Art of the Boring Response' - Reducing conflict voltage instantly."
    }
  },
  {
    title: "Interactive Apps",
    description: "Learn by doing: message rewrite + response planning, documentation and timelines, decision tools, evidence organization helpers.",
    icon: Smartphone,
    fullWidth: true,
    details: {
      subtitle: "AI-Powered Tools for Real-Time Defense",
      features: [
        "Message Rewrite (BIFF): AI transforms angry drafts into court-safe texts",
        "Evidence Log: Secure, timestamped incident tracking",
        "Custody Calendar: Visual mapping of parenting time",
        "Expense Tracker: Reimbursement management without the fight"
      ],
      bestFor: "Executing the strategy in real-time. These are the tools you use every single day.",
      example: "The 'Tone Check' Engine: Analyzes your draft and warns you if you sound defensive before you hit send."
    }
  }
];

export const APP_DIRECTORY: AppDirectoryItem[] = [
  {
    name: "Police",
    url: "https://police.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["Police", "Public", "Bailiffs"],
    description: "Helps people document incidents with clear timelines, evidence links, and structured statements that support reporting and follow-up.",
    tags: ["police", "reporting", "evidence", "safety"],
    artifact: "Incident Report Packet",
    steps: [
      "Select incident type and jurisdiction, then open the Police report template.",
      "Enter who/what/when/where, write a clear narrative, and attach supporting evidence (screenshots, files, witnesses).",
      "Generate the Incident Report Packet (PDF) with a cover sheet + exhibit list for printing or secure sharing."
    ]
  },
  {
    name: "Pact",
    url: "https://pact.cotrackpro.com",
    category: "Funding & Community",
    audience: ["Members", "Supporters", "Public"],
    description: "Helps communities turn support into action with pledges, membership options, and shared commitments that keep values visible.",
    tags: ["membership", "community", "pledge", "values"],
    artifact: "Pledge & Impact Report",
    steps: [
      "Create a Pact campaign (goal, pledge language, and audience) and choose your signup method.",
      "Collect pledges/supporter info and add updates (milestones, outcomes, community notes).",
      "Export the Pledge & Impact Report (CSV/PDF) for partners, funders, or newsletters."
    ]
  },
  {
    name: "Reform",
    url: "https://reform.cotrackpro.com",
    category: "Policy & Legislation",
    audience: ["Advocates", "Professionals", "Public"],
    description: "Helps advocates track policy priorities, share resources, and coordinate campaigns that move reform from ideas to action in practice.",
    tags: ["reform", "policy", "advocacy", "justice"],
    artifact: "Policy Action Tracker",
    steps: [
      "Choose a policy priority (bill, rule, or issue) and open the Reform tracker.",
      "Log positions, talking points, outreach tasks, and stakeholder contacts with timestamps.",
      "Export a Policy Action Tracker (brief + contact list) as a ready-to-share advocacy artifact."
    ]
  },
  {
    name: "Workplace",
    url: "https://workplace.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["HR", "Employers", "Public"],
    description: "Helps employers support staff facing family conflict with resources and referral pathways that protect wellbeing and job stability.",
    tags: ["HR", "workplace", "resources", "support"],
    artifact: "Workplace Support Plan",
    steps: [
      "Pick the workplace scenario (conflict, leave, safety, performance) and select a role-based template (HR/manager/employee).",
      "Capture the situation summary, accommodations, boundaries, and escalation path; attach documentation if needed.",
      "Export a Workplace Support Plan (memo + checklist) for HR alignment and follow-through."
    ]
  },
  {
    name: "Makeup Hub",
    url: "https://makeup.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Public", "Users"],
    description: "Helps users start in a branded landing hub that routes them to the right app, with simple navigation, onboarding, and quick links.",
    tags: ["brand", "hub", "landing", "routing"],
    artifact: "Branded Hub Page",
    steps: [
      "Select which CoTrackPro tools you want to feature and set your hub labels (role, purpose, and CTA buttons).",
      "Add branding, short explanations, and routing links to the right apps for the user’s needs.",
      "Publish/export the Branded Hub Page (share link + sitemap PDF) as your routing artifact."
    ]
  },
  {
    name: "Legislation Pack",
    url: "https://leg.cotrackpro.com",
    category: "Policy & Legislation",
    audience: ["Advocates", "Attorneys", "Public"],
    description: "Helps Missouri advocates act fast with talking points, templates, and step-by-step tasks that turn concern into coordinated outreach.",
    tags: ["legislation", "Missouri", "advocacy", "policy"],
    artifact: "Legislative Brief Pack",
    steps: [
      "Enter the bill number(s) and choose the pack type (talking points, one-pager, testimony outline).",
      "Fill issue context, affected groups, evidence, and recommended actions; add citations/links.",
      "Export a Legislative Brief Pack (PDF/Doc) ready for meetings, hearings, or coalition sharing."
    ]
  },
  {
    name: "Courts Hub",
    url: "https://courts.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["Courts", "Professionals", "Public", "Clerks", "Judges"],
    description: "Helps courts and stakeholders use partnership briefs, modernization playbooks, and workflows that align reforms across agencies.",
    tags: ["courts", "modernization", "partnership", "stakeholders"],
    artifact: "Court Modernization Brief",
    steps: [
      "Choose the court modernization topic (process, tech, access, reliability) and open the brief template.",
      "Add current pain points, stakeholder impacts, metrics, and implementation options.",
      "Export a Court Modernization Brief (PDF) suitable for administrators and partner organizations."
    ]
  },
  {
    name: "Dashboard",
    url: "https://dashboard.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Admin/Ops"],
    description: "Helps admins monitor usage, system health, alerts, and ops notes in one dashboard, at a glance, to keep the platform accountable.",
    tags: ["admin", "analytics", "monitoring", "ops"],
    artifact: "Ops & Usage Report",
    steps: [
      "Select reporting scope (app, time window, user segment) and pick the dashboard view.",
      "Review activity signals (usage, errors, alerts) and add interpretation notes for decision-makers.",
      "Export an Ops & Usage Report (CSV/PDF) for governance, compliance, and planning."
    ]
  },
  {
    name: "University",
    url: "https://university.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["Academia", "Partners"],
    description: "Helps universities partner through pilot outlines, research proposals, and shared goals that make collaboration easy to launch.",
    tags: ["university", "partnership", "research", "proposal"],
    artifact: "Pilot Proposal Packet",
    steps: [
      "Choose a partnership goal (research, pilot, clinic support, training) and open the proposal template.",
      "Add stakeholders, success metrics, timeline, and resource needs; attach prior work or references.",
      "Export a Pilot Proposal Packet (PDF/Doc) for outreach and partnership conversations."
    ]
  },
  {
    name: "School",
    url: "https://school.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["Educators", "Public"],
    description: "Helps schools coordinate with families using templates and documentation workflows for sensitive situations that affect students.",
    tags: ["school", "educators", "communication", "records"],
    artifact: "School Coordination Packet",
    steps: [
      "Select the school workflow (records request, IEP coordination, communication plan) and choose a template.",
      "Enter student/context details, requests, and key dates; attach supporting documents.",
      "Export a School Coordination Packet (emails + checklist + PDF) for consistent follow-up."
    ]
  },
  {
    name: "Apology Coach",
    url: "https://apology.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals", "Public"],
    description: "Helps users craft sincere apologies, own impact, and repair trust with prompts that reduce defensiveness in tense moments.",
    tags: ["apology", "repair", "communication-skills", "conflict-reduction", "accountability"],
    artifact: "Apology Draft",
    steps: [
      "Select the apology scenario (parenting, workplace, community) and choose tone constraints.",
      "Answer prompts to clarify what happened, harm caused, accountability, and the repair plan.",
      "Export an Apology Draft (message/email/text) with a short “do/don’t” reminder card."
    ]
  },
  {
    name: "Clerk",
    url: "https://clerk.cotrackpro.com",
    category: "Court Roles",
    audience: ["Court Clerks", "Court Staff", "Judges"],
    description: "Helps court clerks standardize intake, filings, and routing with checklists and quality checks that reduce errors and delays.",
    tags: ["clerk", "filings", "case-management", "docketing", "workflow"],
    artifact: "Clerk Intake Sheet",
    steps: [
      "Choose the filing category and open the standardized intake workflow.",
      "Complete party/case fields, required forms checklist, and service requirements; flag missing items.",
      "Export the Clerk Intake Sheet (PDF) for consistent processing and fewer rejected filings."
    ]
  },
  {
    name: "Kids",
    url: "https://kids.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Kids", "Parents", "Schools", "Therapists"],
    description: "Helps kids feel safe and heard with age-appropriate tools, coping guides, and calming routines that build resilience during change.",
    tags: ["kids", "child-centered", "coping skills", "resilience", "safety"],
    artifact: "Kid-Friendly Safety Plan",
    steps: [
      "Pick the child’s age band and choose a kid-friendly template (feelings, safety, routines).",
      "Fill trusted adults, safe places, coping steps, and “what to do if…” scenarios.",
      "Export a Kid-Friendly Safety Plan (printable PDF) for home, school, or therapy."
    ]
  },
  {
    name: "Bias",
    url: "https://bias.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals", "Public"],
    description: "Helps adults spot and reduce bias in decisions and communication with short lessons and prompts that support child-centered fairness.",
    tags: ["bias", "fairness", "decision-making", "credibility", "communication", "court", "child-centered"],
    artifact: "Bias Check Memo",
    steps: [
      "Select the decision context (custody, evaluation, discipline, services) and open the bias checklist.",
      "Answer prompts about assumptions, missing voices, conflicts-of-interest, and fairness safeguards.",
      "Export a Bias Check Memo (PDF) documenting mitigation steps and open questions."
    ]
  },
  {
    name: "IEP",
    url: "https://iep.cotrackpro.com",
    category: "School & Student Support",
    audience: ["Parents", "Educators", "Public"],
    description: "Helps families organize IEP/504 needs with templates, tracking, and meeting prep so accommodations stay clear and documented.",
    tags: ["iep", "special-education", "school", "accommodations", "documentation", "meeting-prep", "student-support"],
    artifact: "IEP/504 Meeting Packet",
    steps: [
      "Choose meeting type (annual, reevaluation, 504, accommodation update) and open the organizer.",
      "Add needs, goals, accommodations, supports, and evidence (notes, reports, samples).",
      "Export an IEP/504 Meeting Packet (agenda + exhibits + questions) for the meeting."
    ]
  },
  {
    name: "Suicide",
    url: "https://suicide.cotrackpro.com",
    category: "Safety & Crisis Support",
    audience: ["Parents", "Professionals", "Public"],
    description: "Helps families recognize warning signs with crisis education, safety-planning prompts, and 'get help now' resources for support.",
    tags: ["crisis-support", "suicide-prevention", "safety-plan", "mental-health", "youth", "warning-signs", "help-now"],
    artifact: "Crisis Safety Plan",
    steps: [
      "Select the safety plan format (quick card, detailed plan) and confirm emergency contacts.",
      "Capture warning signs, coping strategies, safe people/places, and professional resources.",
      "Export a Crisis Safety Plan (printable + phone-friendly PDF) for immediate use."
    ]
  },
  {
    name: "Pray",
    url: "https://pray.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Advocates"],
    description: "Helps families stay grounded through spiritual support, reflection prompts, and community encouragement during uncertainty.",
    tags: ["support", "community", "prayer", "well-being"],
    artifact: "Grounding & Reflection Plan",
    steps: [
      "Choose a reflection path (gratitude, courage, patience, forgiveness) and open a guided prompt set.",
      "Write brief reflections and select daily practices (breathing, journaling, kindness actions).",
      "Export a Grounding & Reflection Plan (weekly card) to keep routines consistent."
    ]
  },
  {
    name: "Best Interests Bingo",
    url: "https://bingo.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals"],
    description: "Helps adults practice best-interests habits through a quick bingo game that reinforces court-safe, child-focused choices daily.",
    tags: ["training", "gamification", "best-interests", "skills"],
    artifact: "Best-Interests Habit Checklist",
    steps: [
      "Select the “bingo board” theme (communication, routines, stability, co-parenting) and role.",
      "Mark completed actions and add short notes about what worked and what didn’t.",
      "Export a Best-Interests Habit Checklist (PDF) as a progress artifact for coaching or court prep."
    ]
  },
  {
    name: "Education",
    url: "https://education.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals"],
    description: "Helps users learn by role with courses, skill tracks, and practice prompts that make training immediately usable in real cases.",
    tags: ["courses", "training", "learning", "CLE"],
    artifact: "Role-Based Learning Plan",
    steps: [
      "Pick your role (parent/attorney/therapist/etc.) and the education module you want to complete.",
      "Complete lessons and practice prompts tied to your real scenario; save key takeaways.",
      "Export a Role-Based Learning Plan (action checklist + notes) as your learning artifact."
    ]
  },
  {
    name: "Scenarios Trainer",
    url: "https://scenarios.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals"],
    description: "Helps users practice custody conflicts, choose safer responses, document facts, and de-escalate with scripts and coaching prompts.",
    tags: ["scenarios", "training", "custody", "roleplay"],
    artifact: "Scenario Practice Summary",
    steps: [
      "Choose a scenario (handoff, conflict, boundary, request) and set the desired outcome.",
      "Practice responses using the guided prompts and select the best final version.",
      "Export a Scenario Practice Summary (script + rationale) for rehearsal and consistency."
    ]
  },
  {
    name: "Foundations",
    url: "https://foundations.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Public", "Professionals"],
    description: "Helps users learn core principles, privacy basics, and methods so tools are applied responsibly and consistently across situations.",
    tags: ["standards", "methodology", "templates", "playbooks"],
    artifact: "Foundation Checklist Pack",
    steps: [
      "Choose the foundation topic (safety, documentation, communication, planning) and open the pack.",
      "Complete baseline checklists and add missing items you need to gather.",
      "Export a Foundation Checklist Pack (PDF) as the starting artifact for your workstream."
    ]
  },
  {
    name: "Parenting Plan",
    url: "https://plan.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Attorneys"],
    description: "Helps parents draft clear parenting plans with schedules, rules, and contingencies that reduce ambiguity and repeat disputes.",
    tags: ["parenting-plan", "schedules", "clauses", "consistency"],
    artifact: "Parenting Plan Draft",
    steps: [
      "Select plan type (joint custody, modified, temporary) and choose schedule/decision modules.",
      "Fill schedules, exchanges, decision rules, communication norms, and dispute steps.",
      "Export a Parenting Plan Draft (Doc/PDF) ready for review, negotiation, or mediation."
    ]
  },
  {
    name: "Money",
    url: "https://money.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Professionals"],
    description: "Helps families track budgets, shared expenses, and support obligations with calculators and documentation prompts for clarity.",
    tags: ["money", "budgeting", "settlement", "planning"],
    artifact: "Budget & Support Snapshot",
    steps: [
      "Choose the financial view (monthly budget, debt plan, support estimate) and open the calculator.",
      "Enter income, expenses, debts, and goals; attach statements if you want a packet.",
      "Export a Budget & Support Snapshot (PDF/CSV) for planning or legal prep."
    ]
  },
  {
    name: "Tax",
    url: "https://tax.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Professionals"],
    description: "Helps users organize tax documents, benefits, and filing steps so returns, credits, and obligations are handled smoothly each year.",
    tags: ["taxes", "8332", "credits", "filing-status"],
    artifact: "Tax & Filing Organizer",
    steps: [
      "Select the tax topic (filing status, dependents, credits, documentation) and open the organizer.",
      "Capture key facts, documents needed, and open questions for your preparer.",
      "Export a Tax & Filing Organizer (checklist + summary) as your tax artifact."
    ]
  },
  {
    name: "Costs",
    url: "https://costs.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Attorneys"],
    description: "Helps families compare conflict costs to child-centered investments so money decisions reflect values and long-term stability.",
    tags: ["costs", "budgeting", "litigation", "visualization"],
    artifact: "Conflict Cost Comparison",
    steps: [
      "Select the conflict area (litigation, communication breakdowns, delays) and open the cost model.",
      "Estimate time, money, and child-impact indicators; add assumptions for transparency.",
      "Export a Conflict Cost Comparison (PDF) to support settlement or coaching conversations."
    ]
  },
  {
    name: "Decisions",
    url: "https://decisions.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Professionals"],
    description: "Helps co-parents make structured decisions with options, pros/cons, and agreement tracking so choices stay transparent and documented.",
    tags: ["decision-making", "structure", "risk", "custody"],
    artifact: "Decision Record",
    steps: [
      "Choose a decision category (school, health, schedule, travel) and open the structured worksheet.",
      "Add options, pros/cons, child-centered criteria, and evidence; record agreements/disagreements.",
      "Export the Decision Record (PDF) as a durable artifact of what was decided and why."
    ]
  },
  {
    name: "Peace",
    url: "https://peace.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Professionals"],
    description: "Helps adults de-escalate with scripts, regulation tools, and reflection prompts that protect kids from conflict spillover.",
    tags: ["de-escalation", "communication", "calm", "skills"],
    artifact: "De-escalation Script Pack",
    steps: [
      "Pick the situation and select a script style (brief, firm, empathetic, boundary-first).",
      "Fill your facts and constraints; generate multiple drafts and choose the best one.",
      "Export a De-escalation Script Pack (texts/emails/call notes) for consistent communication."
    ]
  },
  {
    name: "Talk",
    url: "https://talk.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Professionals"],
    description: "Helps users prepare messages and conversations with coaching prompts that clarify needs and practice respectful dialogue.",
    tags: ["communication", "support", "coaching"],
    artifact: "Conversation Prep Sheet",
    steps: [
      "Choose the conversation type (request, boundary, negotiation, update) and define your goal.",
      "Answer prompts to clarify facts, emotions, asks, and fallback options; draft your script.",
      "Export a Conversation Prep Sheet (script + bullet points) for calls, meetings, or mediation."
    ]
  },
  {
    name: "Bridges",
    url: "https://bridges.cotrackpro.com",
    category: "Core Suite",
    audience: ["Coparents", "Professionals"],
    description: "Helps co-parents rewrite messages for clarity and warmth with conflict-aware prompts that reduce escalation, blame, and misreads.",
    tags: ["coparenting", "messaging", "de-escalation", "kids"],
    artifact: "Child-Centered Message Draft",
    steps: [
      "Select message intent (update, request, response, boundary) and set tone (child-centered, neutral).",
      "Paste the original message and add key facts; apply rewriting + clarity checks.",
      "Export a Child-Centered Message Draft (clean copy + optional comparison) for sending."
    ]
  },
  {
    name: "Grace",
    url: "https://grace.cotrackpro.com",
    category: "Funding & Community",
    audience: ["Parents", "Public"],
    description: "Helps users recover after conflict with compassion practices, mindset tools, and gentle routines that rebuild stability.",
    tags: ["healing", "compassion", "regulation", "kindness"],
    artifact: "Healing Micro-Plan",
    steps: [
      "Choose a healing focus (regulation, compassion, patience) and open a daily micro-plan.",
      "Select practices and track completion with short reflections on triggers and wins.",
      "Export a Healing Micro-Plan (weekly card) as a supportive artifact for your journey."
    ]
  },
  {
    name: "CASA Support",
    url: "https://casa.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["CASA", "Professionals"],
    description: "Helps CASA volunteers organize observations, tasks, and child-centered notes with templates that strengthen advocacy consistency.",
    tags: ["casa", "child-advocacy", "workflow", "checklists"],
    artifact: "CASA Case Support Packet",
    steps: [
      "Select CASA workflow (home visit, case notes, recommendations) and open the checklist set.",
      "Log observations, child needs, services, and follow-ups; attach documents when relevant.",
      "Export a CASA Case Support Packet (PDF) for consistent reporting and handoffs."
    ]
  },
  {
    name: "GAL Navigator",
    url: "https://gal.cotrackpro.com",
    category: "Court Roles",
    audience: ["GALs", "Professionals"],
    description: "Helps GALs create structured case notes, best-interests checklists, and evidence organization that streamline reporting.",
    tags: ["GAL", "best-interests", "documentation", "checklists"],
    artifact: "GAL Best-Interests Packet",
    steps: [
      "Choose the best-interests domain (safety, stability, needs) and open the GAL template.",
      "Collect facts, sources, and child-centered indicators; record gaps and verification steps.",
      "Export a GAL Best-Interests Packet (PDF) for court-ready summarization and transparency."
    ]
  },
  {
    name: "Expert Prep",
    url: "https://expert.cotrackpro.com",
    category: "Court Roles",
    audience: ["Experts", "Attorneys"],
    description: "Helps experts define scope, prepare exhibits, and build testimony-ready materials with clear structure, timelines, and strong notes.",
    tags: ["expert", "prep", "testimony", "exhibits"],
    artifact: "Expert Interview & Exhibit Packet",
    steps: [
      "Select expert type (evaluator, therapist, forensic) and open the interview prep template.",
      "Draft questions, organize exhibits, and capture key claims with source references.",
      "Export an Expert Interview & Exhibit Packet (PDF) to use in interviews or testimony prep."
    ]
  },
  {
    name: "Judge Tools",
    url: "https://judge.cotrackpro.com",
    category: "Court Roles",
    audience: ["Judges", "Court Staff", "Bailiffs", "Clerks"],
    description: "Helps judges and staff use bench-ready summaries, structured factors, and decision aids that support clear, consistent orders.",
    tags: ["judge", "bench-tools", "workflow", "structure"],
    artifact: "Bench Decision Aid",
    steps: [
      "Select case context and open the judge decision aid (checklist + reliability prompts).",
      "Review key factors, conflicts, and evidence quality; note accommodations and due process flags.",
      "Export a Bench Decision Aid (PDF) for structured reasoning and documentation."
    ]
  },
  {
    name: "Evaluate",
    url: "https://evaluate.cotrackpro.com",
    category: "Court Roles",
    audience: ["Evaluators", "Attorneys"],
    description: "Helps evaluators move from intake to analysis to report drafting with guided steps that keep findings organized and reviewable.",
    tags: ["evaluator", "forensic", "custody", "reports"],
    artifact: "Evaluation Summary Framework",
    steps: [
      "Choose evaluation scope (custody, psych, parenting) and open the structured framework.",
      "Enter observations, measures, limitations, and sources; flag bias risks and missing data.",
      "Export an Evaluation Summary Framework (PDF) to support clear, defensible conclusions."
    ]
  },
  {
    name: "Mental",
    url: "https://mental.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Therapists", "Professionals"],
    description: "Helps users build regulation and resilience with coping plans, routines, and reflective prompts designed for high-conflict stress.",
    tags: ["mental-health", "coping", "stress", "routines"],
    artifact: "Well-Being Support Plan",
    steps: [
      "Select your goal (stress, anxiety, regulation, support) and open a guided plan template.",
      "Log triggers, coping tools, supports, and follow-ups; attach notes if you’re building a packet.",
      "Export a Well-Being Support Plan (PDF) for therapy collaboration or personal tracking."
    ]
  },
  {
    name: "Cyber",
    url: "https://cyber.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Advocates", "Professionals"],
    description: "Helps document cyber abuse with evidence capture, screenshots, timelines, and pattern tracking so reporting is clearer and safer.",
    tags: ["cyberbullying", "stalking", "evidence", "safety"],
    artifact: "Cyber Harassment Evidence Packet",
    steps: [
      "Choose the cyber incident type (impersonation, stalking, defamation) and open the evidence flow.",
      "Capture URLs, screenshots, timestamps, and platform info; add narrative + impact notes.",
      "Export a Cyber Harassment Evidence Packet (PDF/ZIP manifest) for reporting or legal use."
    ]
  },
  {
    name: "Protection Orders",
    url: "https://po.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Survivors", "Advocates"],
    description: "Helps survivors document incidents, organize evidence, and plan next steps aligned to protection orders and immediate safety needs.",
    tags: ["protection-order", "safety", "evidence", "survivor"],
    artifact: "Protection Order Filing Packet",
    steps: [
      "Select the order type and jurisdiction workflow, then open the filing checklist.",
      "Organize incidents, dates, witnesses, and evidence; draft the statement in clear language.",
      "Export a Protection Order Filing Packet (PDF/Doc) ready for filing and service planning."
    ]
  },
  {
    name: "Legal",
    url: "https://legal.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Attorneys", "Clerks", "Police"],
    description: "Helps parents and attorneys organize filings, exhibits, deadlines, and prep checklists that improve readiness and reduce confusion.",
    tags: ["family-law", "filings", "motions", "evidence"],
    artifact: "Legal Prep Binder",
    steps: [
      "Pick the legal task (motion, response, declaration) and open the binder builder.",
      "Add facts, timeline, exhibits, and citations; generate drafts and an exhibit index.",
      "Export a Legal Prep Binder (PDF/Doc + exhibit list) for filing or attorney review."
    ]
  },
  {
    name: "Coordinator",
    url: "https://coordinator.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Professionals", "Coparents"],
    description: "Helps coordinators run structured agendas, capture agreements, and track follow-through so complex decisions keep moving forward.",
    tags: ["coordination", "consensus", "workflow", "agreements"],
    artifact: "Coordination Handoff Sheet",
    steps: [
      "Select the coordination topic (schedule, school, therapy, logistics) and open the handoff form.",
      "Capture agreements, open items, responsible parties, and deadlines; attach source notes.",
      "Export a Coordination Handoff Sheet (PDF) to reduce misunderstandings and weak handoffs."
    ]
  },
  {
    name: "Visitation",
    url: "https://visitation.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Professionals", "Supervisor"],
    description: "Helps families manage supervised visitation with logs, incident notes, and compliance tracking that support child-focused records.",
    tags: ["visitation", "supervision", "logging", "compliance"],
    artifact: "Visitation Log & Summary",
    steps: [
      "Open the visitation log and choose the event type (exchange, denial, call, disruption).",
      "Record dates/times, what happened, and evidence links; add impact notes when relevant.",
      "Export a Visitation Log & Summary (PDF/CSV) for mediation, counsel, or court exhibits."
    ]
  },
  {
    name: "Jail",
    url: "https://jail.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Advocates"],
    description: "Helps reentering parents build stability plans and documentation that show progress and support safer restored parenting time.",
    tags: ["reentry", "stability", "parenting-time", "documentation"],
    artifact: "Incarceration Impact Packet",
    steps: [
      "Select the incarceration-related issue (visitation limits, safety, logistics) and open the template.",
      "Enter facility details, communication rules, and child-impact notes; attach records if available.",
      "Export an Incarceration Impact Packet (PDF) for court planning and support services."
    ]
  },
  {
    name: "Evidence",
    url: "https://evidence.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Attorneys", "Advocates", "Police", "Supervisor"],
    description: "Organize, tag, and timeline evidence with uploads and metadata so you can export court-ready summaries.",
    tags: ["evidence", "uploads", "metadata", "timeline", "export", "summaries"],
    artifact: "Exhibit List & Bundle",
    steps: [
      "Choose exhibit categories (messages, photos, documents, records) and open the bundle builder.",
      "Upload/link items, add dates and labels, and write short relevance notes for each exhibit.",
      "Export an Exhibit List & Bundle (index + ZIP manifest) for organized production."
    ]
  },
  {
    name: "Shield",
    url: "https://shield.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Attorneys", "Advocates", "Bailiffs", "Police"],
    description: "Capture neutral facts, maintain records, and rewrite messages to communicate safely in high-conflict cases.",
    tags: ["documentation", "communication", "safety", "records", "message-rewrite"],
    artifact: "Safety & Boundary Plan",
    steps: [
      "Choose threat type and open the Shield boundary/safety workflow (digital, physical, social).",
      "Set boundaries, escalation steps, and documentation triggers; add contacts and resources.",
      "Export a Safety & Boundary Plan (PDF) for consistent enforcement and support."
    ]
  },
  {
    name: "Forgiveness",
    url: "https://forgiveness.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Public"],
    description: "Mobile-first forgiveness guide that supports multiple paths, protects boundaries, and restores inner safety.",
    tags: ["forgiveness", "healing", "boundaries", "trauma", "recovery"],
    artifact: "Forgiveness Reflection Journal",
    steps: [
      "Select a forgiveness prompt set (self, others, future) and choose daily/weekly cadence.",
      "Write short reflections and track emotional load + lessons learned; add grounding practices.",
      "Export a Forgiveness Reflection Journal (weekly summary) as a personal growth artifact."
    ]
  },
  {
    name: "Mirror",
    url: "https://mirror.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Professionals", "Public"],
    description: "Private self-awareness app that tracks conflict patterns, supports behavior change, and rewrites messages.",
    tags: ["self-awareness", "patterns", "reflection", "behavior-change", "message-rewrite"],
    artifact: "Clean Message / Statement Draft",
    steps: [
      "Choose what you’re rewriting (text, email, declaration) and set tone + constraints.",
      "Paste the original message and answer context prompts (facts, goal, boundaries); generate options.",
      "Export the final Clean Draft (copy-ready + optional before/after) as your communication artifact."
    ]
  },
  {
    name: "Save",
    url: "https://save.cotrackpro.com",
    category: "Training & Education",
    audience: ["Kids", "Parents", "Schools"],
    description: "Interactive money-smarts quiz for ages 9–11 with scenarios that teach spending, saving, and smart choices.",
    tags: ["kids", "financial-literacy", "quiz", "spending", "saving", "choices"],
    artifact: "Financial Literacy Progress Report",
    steps: [
      "Pick the quiz path (saving, spending, needs vs wants) and start the kid-friendly activity.",
      "Complete the questions and review teach-back explanations together (parent/teacher mode).",
      "Export a Financial Literacy Progress Report (score + skills) for school or home tracking."
    ]
  },
  {
    name: "Calm Quest",
    url: "https://quest.cotrackpro.com/",
    category: "Safety & Journey",
    audience: ["Kids", "Parents", "Therapists"],
    description: "Coping-skills adventure game for kids to practice breathing, boundaries, and emotional regulation through quests.",
    tags: ["kids", "coping-skills", "breathing", "boundaries", "regulation", "game"],
    artifact: "Coping Skills Quest Card",
    steps: [
      "Choose the coping skill “quest” (breathing, boundaries, grounding) and the child’s age band.",
      "Play through prompts and practice steps; record what worked and what didn’t.",
      "Export a Coping Skills Quest Card (printable) for home, school, or therapy use."
    ]
  },
  {
    name: "Holiday",
    url: "https://holiday.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Mediators", "Attorneys"],
    description: "Co-parenting holiday planner to align culture, travel, and schedules with clear rules that reduce disputes.",
    tags: ["holiday", "scheduling", "co-parenting", "travel", "culture", "planner"],
    artifact: "Holiday Parenting Schedule",
    steps: [
      "Select the holiday set (school calendar, cultural/religious, travel) and open the planner.",
      "Enter dates, exchanges, travel details, and contingencies; add notes for communication.",
      "Export a Holiday Parenting Schedule (calendar + agreement summary) for both households."
    ]
  },
  {
    name: "Benchmark",
    url: "https://benchmark.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Courts", "Administrators", "Public", "Clerks", "Judges"],
    description: "Court benchmarking toolkit to track reliability, transparency, and service metrics that build public trust.",
    tags: ["benchmark", "public-trust", "metrics", "transparency", "performance"],
    artifact: "Court Benchmark Report",
    steps: [
      "Choose benchmark domain (timeliness, reliability, access, outcomes) and define metrics.",
      "Record measurements, notes, and supporting sources; compare periods or locations if relevant.",
      "Export a Court Benchmark Report (dashboard PDF/CSV) for transparency and improvement work."
    ]
  },
  {
    name: "BIP Standards",
    url: "https://bip.cotrackpro.com",
    category: "Partnerships & Institutions",
    audience: ["BIP Providers", "Program Directors", "Auditors"],
    description: "MCADSV-aligned BIP compliance manager for standards tracking, documentation, and audit-ready reporting.",
    tags: ["mcadsv", "bip", "compliance", "standards", "documentation", "reporting"],
    artifact: "BIP Compliance Checklist",
    steps: [
      "Select the MCADSV-aligned standard set and open the program compliance manager.",
      "Assess current program practices, upload documentation, and flag gaps with action items.",
      "Export a BIP Compliance Checklist (audit-ready PDF) with remediation tracking."
    ]
  },
  {
    name: "Membership",
    url: "https://cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Members", "Public", "Professionals"],
    description: "Manages plans, access, billing, and account settings so members can activate tools and manage subscriptions across CoTrackPro.",
    tags: ["membership", "subscription", "billing", "access", "entitlements", "account", "login"],
    artifact: "Access & Entitlement Proof",
    steps: [
      "Sign in, select your plan, and confirm your role-based access (apps + features).",
      "Review billing/renewal details and capture the entitlement snapshot (what you’re authorized to use).",
      "Export an Access & Entitlement Proof artifact (receipt + access snapshot) for records or support."
    ]
  },
  {
    name: "Integrity",
    url: "https://integrity.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Professionals", "Partners", "Admin/Ops", "Public", "Clerks", "Judges"],
    description: "Provides ethical guardrails, disclosures, conflict-of-interest checks, and audit-ready standards to support trustworthy, child-centered practice.",
    tags: ["integrity", "ethics", "conflict-of-interest", "disclosure", "guardrails", "accountability", "standards"],
    artifact: "Integrity Packet",
    steps: [
      "Choose the integrity workflow (COI disclosure, bias guardrails, handoff rules) for your role/workstream.",
      "Complete the prompts and attach supporting context (policies, communications, decisions).",
      "Export an Integrity Packet (PDF) documenting safeguards, disclosures, and next steps."
    ]
  },
  {
    name: "Track",
    url: "https://track.cotrackpro.com",
    category: "Core Suite",
    audience: ["Parents", "Professionals", "Advocates", "Bailiffs", "Police", "Supervisor"],
    description: "Helps users track incidents, parenting-time changes, communications, and follow-through with date-stamped logs and court-ready exports.",
    tags: ["tracking", "logs", "timeline", "follow-through", "parenting-time", "communication", "export"],
    artifact: "Timeline / Activity Log",
    steps: [
      "Create a case/project and select what you’re tracking (events, communications, tasks).",
      "Add dated entries with metadata and evidence links; keep notes brief and factual.",
      "Export a Timeline / Activity Log artifact (PDF/CSV) for sharing or filing preparation."
    ]
  },
  {
    name: "Learn",
    url: "https://learn.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Professionals", "Public"],
    description: "Role-based learning hub with short lessons, checklists, and practice prompts so skills are usable immediately in real situations.",
    tags: ["learn", "courses", "training", "role-based", "microlearning", "checklists", "skills"],
    artifact: "Learning Action Checklist",
    steps: [
      "Select your role and workstream, then choose a learning path (skills, standards, templates).",
      "Complete modules and save your applied outputs (drafts, checklists, prompts).",
      "Export a Learning Action Checklist (PDF) showing what you learned and what you’ll do next."
    ]
  },
  {
    name: "Slides",
    url: "https://slides.cotrackpro.com",
    category: "Platform & Ops",
    audience: ["Public", "Professionals"],
    description: "Browse, search, and share CoTrackPro slide decks and briefings optimized for mobile viewing and easy embedding.",
    tags: ["slides", "presentations", "decks", "briefings", "resources", "library", "embed"],
    artifact: "Slide Deck Artifact",
    steps: [
      "Choose deck type (overview, training, briefing) and select your audience (parents, courts, partners).",
      "Fill slide prompts (key points, visuals, citations) and generate speaker notes if needed.",
      "Export a Slide Deck Artifact (PPTX/PDF) ready to present or share."
    ]
  },
  {
    name: "Neuro",
    url: "https://neuro.cotrackpro.com",
    category: "Training & Education",
    audience: ["Parents", "Therapists", "Educators", "Professionals"],
    description: "Neurodiversity-informed tools and guidance for communication, routines, accommodations, and court-safe documentation.",
    tags: ["neurodiversity", "ADHD", "autism", "accommodations", "IEP", "executive-functioning", "communication"],
    artifact: "Neuro-Informed Accommodation Plan",
    steps: [
      "Choose the neuro profile focus (ADHD, autism, executive function) and your role (parent/educator/therapist).",
      "Complete prompts on needs, triggers, supports, and communication preferences; attach supporting notes.",
      "Export a Neuro-Informed Accommodation Plan (PDF/Doc) for meetings, school, or court."
    ]
  },
  {
    name: "Reputation",
    url: "https://reputation.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Public", "Professionals"],
    description: "Helps users assess and respond to online reputation attacks with evidence capture, takedown steps, and safe messaging templates.",
    tags: ["reputation", "defamation", "online-harassment", "takedown", "privacy", "evidence", "templates"],
    artifact: "Reputation Defense Packet",
    steps: [
      "Select the reputation issue (defamation, impersonation, harassment) and open the documentation workflow.",
      "Capture URLs, screenshots, dates, and platform details; draft takedown/notice messages.",
      "Export a Reputation Defense Packet (log + draft notices) for reporting or legal use."
    ]
  },
  {
    name: "Poor",
    url: "https://poor.cotrackpro.com",
    category: "Money & Planning",
    audience: ["Parents", "Public", "Advocates"],
    description: "Helps users document financial hardship, gather proof, and find assistance resources for fees and basic needs (IFP-friendly workflows).",
    tags: ["poverty", "financial-hardship", "IFP", "fees", "assistance", "resources", "documentation"],
    artifact: "Financial Hardship Packet",
    steps: [
      "Select the hardship goal (IFP, fee waiver, assistance, budget reset) and open the template.",
      "Enter income/expenses and attach proof (statements, notices); generate a short declaration draft.",
      "Export a Financial Hardship Packet (budget + checklist + draft) ready for filing or assistance intake."
    ]
  },
  {
    name: "Capacity",
    url: "https://capacity.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Professionals"],
    description: "Build practical capacity (time, energy, planning, supports) with checklists, routines, and resource mapping designed for high-stress situations.",
    tags: ["capacity", "routines", "planning", "supports", "executive-functioning", "stress", "stability"],
    artifact: "Capacity Plan",
    steps: [
      "Choose the capacity focus (time, energy, executive function, support network) and open the assessment.",
      "Rate constraints, identify supports, and build a weekly plan with realistic boundaries.",
      "Export a Capacity Plan (weekly plan + support requests) as a practical artifact for follow-through."
    ]
  },
  {
    name: "PTP",
    url: "https://ptp.cotrackpro.com",
    category: "Safety & Journey",
    audience: ["Parents", "Attorneys", "Advocates"],
    description: "Parenting Time Portfolio: track exchanges, missed time, make-up requests, and notes with exports that help keep parenting-time records clean and consistent.",
    tags: ["parenting-time", "visitation", "logs", "schedule", "missed-time", "make-up-time", "documentation", "export"],
    artifact: "Parenting Time Portfolio Exhibit Bundle",
    steps: [
      "Open the Parenting Time Portfolio and select tracking modules (exchanges, calls, missed time).",
      "Log events with dates/times and evidence links; add short, factual impact notes.",
      "Export a PTP Exhibit Bundle (calendar + logs + summary) as a court-ready artifact."
    ]
  }
];
