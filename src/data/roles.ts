
import {
  Briefcase, Users, HeartHandshake, Gavel,
  FileSearch, MessageSquare, Brain, Lock, Clock
} from 'lucide-react';
import { Role, RoleDetailContent } from './types';

export const ROLES: Role[] = [
  {
    id: "professionals",
    title: "Professionals",
    icon: Briefcase,
    description: "Fewer escalations, cleaner documentation, less burnout, stronger outcomes.",
    subRoles: [
      "Family Law Attorneys",
      "Forensic Psychologists",
      "Mediators",
      "Divorce Coaches",
      "Therapists"
    ],
    whyNow: [
      "Cases are more volatile and emotionally overloaded.",
      "Documentation quality is a liability—clarity protects people.",
      "Families need structure, not vague guidance.",
      "Standard workflows reduce chaos and repeat work."
    ],
    gradient: "radial-gradient(900px 280px at 30% 0%, rgba(14,165,233,.20), transparent 60%)",
    accentColor: "text-brand-500",
    primaryAction: {
      label: "Professionals — Monthly",
      url: "https://buy.stripe.com/cNicN54T14jJ4Hm1mb2cg0d"
    },
    secondaryAction: {
      label: "Professionals — Yearly (Best Value)",
      url: "https://buy.stripe.com/eVq9AT0CLbMb7Tyc0P2cg0e"
    }
  },
  {
    id: "parents",
    title: "Parents",
    icon: Users,
    description: "Stay steady, reduce conflict fuel, protect your child’s daily life.",
    subRoles: [
      "High-Conflict Co-parents",
      "Survivors of Coercive Control",
      "Pro-Se Litigants",
      "Alienated Parents"
    ],
    whyNow: [
      "High-conflict situations escalate fast when communication breaks.",
      "Generic advice fails under pressure—step-by-step pathways work.",
      "Mistakes become 'evidence'—structure reduces risk.",
      "Kids need stability today, not later."
    ],
    gradient: "radial-gradient(900px 280px at 30% 0%, rgba(99,102,241,.25), transparent 60%)",
    accentColor: "text-indigo-400",
    primaryAction: {
      label: "Parents — Monthly",
      url: "https://buy.stripe.com/9B65kD3OX9E3a1G2qf2cg0f"
    },
    secondaryAction: {
      label: "Parents — Annual (Best Value)",
      url: "https://buy.stripe.com/3cI5kDgBJdUj2zee8X2cg0g"
    }
  },
  {
    id: "nonprofits",
    title: "Non-Profit & Advocacy Groups",
    icon: HeartHandshake,
    description: "Scale support without lowering standards.",
    subRoles: [
      "DV Shelters",
      "Victim Advocates",
      "Legal Aid Societies",
      "Family Justice Centers"
    ],
    whyNow: [
      "Demand is up, teams are stretched, and burnout is real.",
      "Inconsistent advice creates confusion and harm.",
      "Turnover makes training hard to maintain.",
      "Standardized toolkits make support safer and repeatable."
    ],
    gradient: "radial-gradient(900px 280px at 30% 0%, rgba(34,197,94,.18), transparent 60%)",
    accentColor: "text-green-500",
    singleAction: {
      label: "Contact for Group Access",
      url: "https://cotrackpro.com/contact",
      triggerModal: true
    }
  },
  {
    id: "courts",
    title: "Government & Courts",
    icon: Gavel,
    description: "Fewer repeat filings, clearer processes, safer case management.",
    subRoles: [
      "Family Court Judges",
      "Guardians ad Litem",
      "Court Clerks",
      "Bailiffs",
      "Visitation Supervisors",
      "Police"
    ],
    whyNow: [
      "Repeat filings drain resources and increase family harm.",
      "Vague processes and orders create enforceability problems.",
      "Staff face emotional overload and improper pressure.",
      "Public trust requires transparency, consistency, and better outcomes."
    ],
    gradient: "radial-gradient(900px 280px at 30% 0%, rgba(249,115,22,.22), transparent 60%)",
    accentColor: "text-orange-500",
    singleAction: {
      label: "Contact for Institutional Access",
      url: "https://cotrackpro.com/contact",
      triggerModal: true
    }
  }
];

export const BASE_ATTORNEY_DETAILS: RoleDetailContent = {
    id: "attorney",
    title: "Family Law Attorneys",
    heroHeadline: "Reduce High-Conflict Liability & Admin Overload",
    heroSubheadline: "Provide your clients with a structured system for evidence logging and communication that keeps them calm and your inbox manageable.",
    painPoints: [
      {
        problem: "Clients send hundreds of disorganized screenshots and emails.",
        solution: "The Vault exports a single, chronological, court-ready PDF with metadata."
      },
      {
        problem: "Emotional reactivity damages the client's case credibility.",
        solution: "AI 'Tone Check' & 'BIFF Rewriter' stop bad messages before they are sent."
      },
      {
        problem: "Unverifiable 'he-said/she-said' allegations waste court time.",
        solution: "GPS-verified exchange logs and tamper-proof timestamping establish facts."
      }
    ],
    keyFeatures: [
      {
        title: "Evidence Vault Portal",
        description: "Read-only access for your firm to review organized client logs without digging through emails.",
        icon: FileSearch
      },
      {
        title: "Conflict De-escalation AI",
        description: "Tools that coach your client to communicate briefly and informatively, reducing your need to intervene.",
        icon: MessageSquare
      },
      {
        title: "Pattern Detection Reports",
        description: "Visual timelines that highlight custody interference or harassment patterns for exhibits.",
        icon: Brain
      }
    ],
    workstreams: [
      {
        id: "initial-assessment",
        title: "Initial Conflict Assessment",
        trigger: "Escalation of Verbal Aggression, Breakdown in Mediation Process",
        description: "A structured process for evaluating the severity and nature of a high-conflict situation upon first report.",
        role: "Family Law Attorney",
        apps: ["Decisions", "Legal", "Peace"]
      },
      {
        id: "evidence-collection-pro",
        title: "Digital Evidence Collection",
        trigger: "Report of Workplace Harassment, Threat of Physical Harm",
        description: "Guided workflow for collecting, preserving, and organizing digital evidence relevant to the conflict, ensuring chain of custody.",
        role: "Family Law Attorney",
        apps: ["Police", "Peace", "Cyber"]
      },
      {
        id: "drafting-pleadings",
        title: "Drafting Pleadings & Evidence Packets",
        trigger: "Evidence or Discovery Dispute",
        description: "Prepare legal pleadings and compile evidence packets for court submission with clear owners and timelines.",
        role: "Family Law Attorney",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "negotiation-settlement",
        title: "Negotiation and Settlement Efforts",
        trigger: "Financial or Support Negotiation",
        description: "Lead negotiation efforts to help parties reach mutually agreeable settlements and resolve disputes efficiently.",
        role: "Family Law Attorney",
        apps: ["Legal", "Decisions", "Costs"]
      },
      {
        id: "court-representation",
        title: "Court Representation and Hearings",
        trigger: "Hearing or Trial Scheduled",
        description: "Represent clients in court and advocate for their interests during hearings and legal proceedings, ensuring procedural compliance.",
        role: "Family Law Attorney",
        apps: ["Legal", "Decisions", "Clerk"]
      }
    ],
    artifacts: [
      { name: "Legal Prep Binder", category: "Template", workstream: "Hearing Prep", path: "https://legal.cotrackpro.com" },
      { name: "Exhibit List & Bundle", category: "Report", workstream: "Evidence Org", path: "https://evidence.cotrackpro.com" },
      { name: "Conflict Cost Comparison", category: "Analysis", workstream: "Settlement", path: "https://costs.cotrackpro.com" },
      { name: "Decision Record", category: "Form", workstream: "Mediation", path: "https://decisions.cotrackpro.com" }
    ],
    recommendedApps: ["Legal", "Decisions", "Peace", "Police", "Cyber", "Costs", "Clerk"],
    closingCta: "Equip your firm with the tool that protects your clients and your time.",
    stats: [
      { value: "40%", label: "Less Admin Time" },
      { value: "3x", label: "Better Documentation" },
      { value: "24/7", label: "Client Support Tools" }
    ],
    testimonial: {
      quote: "My client was organized, calm, and had perfect logs. It changed the entire trajectory of the custody modification.",
      author: "Sarah J.",
      role: "Family Law Partner"
    },
    faqs: [
      {
        question: "Can I pay for my client's subscription?",
        answer: "Yes, many firms include CoTrackPro as a disbursement or value-add for high-conflict retainers."
      },
      {
        question: "Is the data admissible?",
        answer: "Our reports are designed with Federal Rules of Evidence in mind (metadata, chain of custody, tamper-evident logs)."
      }
    ],
    ctaConfig: {
      type: 'subscription',
      label: 'Professional License',
      monthlyUrl: 'https://buy.stripe.com/cNicN54T14jJ4Hm1mb2cg0d',
      yearlyUrl: 'https://buy.stripe.com/eVq9AT0CLbMb7Tyc0P2cg0e',
      priceLabel: 'Firm & Client Access'
    }
};

export const BASE_PARENT_DETAILS: RoleDetailContent = {
    id: "parent",
    title: "High-Conflict Co-parents",
    heroHeadline: "Stop the Chaos. Secure Your Peace.",
    heroSubheadline: "The complete system for documenting truth, disengaging from conflict, and protecting your children in high-conflict custody battles.",
    painPoints: [
      {
        problem: "Gaslighting makes you doubt your own reality.",
        solution: "Secure, tamper-proof logs create an objective timeline of facts."
      },
      {
        problem: "Every exchange feels like a trap.",
        solution: "GPS verification and check-in protocols prove you were there on time."
      },
      {
        problem: "Legal bills are draining your savings.",
        solution: "Organized evidence reports save your lawyer hours of billable time."
      }
    ],
    keyFeatures: [
      {
        title: "BIFF Response Generator",
        description: "AI transforms angry drafts into court-safe, brief, informative, friendly, and firm responses.",
        icon: MessageSquare
      },
      {
        title: "Secure Evidence Vault",
        description: "Store photos, videos, and documents with automatic metadata extraction.",
        icon: Lock
      },
      {
        title: "Custody Calendar",
        description: "Track parenting time deviation and visualized patterns of interference.",
        icon: Clock
      }
    ],
    workstreams: [
      {
        id: "digital-evidence-collection",
        title: "Digital Evidence Collection",
        trigger: "Harassment, Order Violation, Unsafe Exchange",
        description: "A guided workflow for collecting, preserving, and organizing digital evidence (texts, emails, GPS logs) to ensure it is admissible.",
        role: "Parent",
        apps: ["Evidence", "Track", "Cyber"]
      },
      {
        id: "safety-planning",
        title: "Safety Planning & Protective Actions",
        trigger: "Emergency Safety Situation, Threat of Harm",
        description: "Develop and implement strategies to ensure the immediate and ongoing safety of yourself and your children.",
        role: "Parent",
        apps: ["Shield", "Peace", "Legal"]
      },
      {
        id: "stakeholder-comm",
        title: "Stakeholder Communication Plan",
        trigger: "Conflict Escalation, False Accusations",
        description: "A structured workflow for communicating with schools, doctors, and professionals to maintain credibility and clarify facts.",
        role: "Parent",
        apps: ["Bridges", "Talk", "Peace"]
      },
      {
        id: "incident-debrief",
        title: "Incident Debrief & Documentation",
        trigger: "Exchange Dispute, Police Involvement",
        description: "Structured debrief process following an incident to capture facts while fresh and route them to your attorney.",
        role: "Parent",
        apps: ["Track", "Decisions", "Evidence"]
      }
    ],
    artifacts: [
      { name: "Timeline / Activity Log", category: "Report", workstream: "Daily Tracking", path: "https://track.cotrackpro.com" },
      { name: "Child-Centered Message Draft", category: "Script", workstream: "Communication", path: "https://bridges.cotrackpro.com" },
      { name: "Safety & Boundary Plan", category: "Protocol", workstream: "Safety", path: "https://shield.cotrackpro.com" },
      { name: "Parenting Plan Draft", category: "Template", workstream: "Agreement", path: "https://plan.cotrackpro.com" }
    ],
    recommendedApps: ["Evidence", "Track", "Bridges", "Shield", "Peace", "Talk", "Cyber"],
    closingCta: "Take back control of your case and your life.",
    stats: [
      { value: "Trusted", label: "By Community" },
      { value: "100%", label: "Private & Secure" },
      { value: "Court", label: "Ready Exports" }
    ],
    testimonial: {
      quote: "I finally slept through the night knowing my evidence was safe and organized.",
      author: "Michael T.",
      role: "Co-Parent"
    },
    faqs: [
      {
        question: "Does the other parent need to use it?",
        answer: "No. CoTrackPro is designed to work effectively even if only one parent uses it."
      },
      {
        question: "Can my ex see my data?",
        answer: "No. Your vault is private. You choose what to export or share."
      }
    ],
    ctaConfig: {
      type: 'subscription',
      label: 'Parent Membership',
      monthlyUrl: 'https://buy.stripe.com/9B65kD3OX9E3a1G2qf2cg0f',
      yearlyUrl: 'https://buy.stripe.com/3cI5kDgBJdUj2zee8X2cg0g',
      priceLabel: 'Full Access'
    }
};

export const BASE_INSTITUTION_DETAILS: RoleDetailContent = {
    id: "institution",
    title: "Institutions",
    heroHeadline: "Systemic Solutions for High-Conflict Cases",
    heroSubheadline: "Scalable tools for courts, agencies, and nonprofits to manage high-conflict caseloads with consistency and safety.",
    painPoints: [
        { problem: "Inconsistent documentation delays rulings.", solution: "Standardized logging formats." },
        { problem: "Pro-se litigants overwhelm staff.", solution: "Guided pathways for unrepresented parents." },
        { problem: "Safety risks in DV cases.", solution: "Encrypted, hidden-interface tools for victims." }
    ],
    keyFeatures: [],
    workstreams: [
      {
        id: "case-management-scheduling",
        title: "Case Management and Scheduling",
        trigger: "Case Opened or Reassigned, Compliance Deadline",
        description: "Manage case flow and schedule key events to ensure timely and efficient resolution.",
        role: "Court Staff",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "hearings-due-process",
        title: "Hearings, Trials, and Due Process",
        trigger: "Hearing Scheduled, Review Hearing Due",
        description: "Oversee and manage hearings and trials, ensuring all parties receive fair and lawful treatment.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "order-issuance",
        title: "Temporary and Final Order Issuance",
        trigger: "Compliance Deadline, Order Implementation",
        description: "Draft and issue court orders, both temporary and final, to resolve legal matters and provide direction.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "settlement-conferences",
        title: "Settlement Conferences",
        trigger: "Agreement Draft Needed, Mediation Impasse",
        description: "Facilitate conferences to help parties reach settlements outside of court and resolve disputes amicably.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      }
    ],
    artifacts: [
      { name: "Court Benchmark Report", category: "Report", workstream: "Performance", path: "https://benchmark.cotrackpro.com" },
      { name: "Clerk Intake Sheet", category: "Form", workstream: "Intake", path: "https://clerk.cotrackpro.com" },
      { name: "Integrity Packet", category: "Protocol", workstream: "Ethics", path: "https://integrity.cotrackpro.com" }
    ],
    recommendedApps: ["Clerk", "Legal", "Decisions", "Benchmark", "Integrity"],
    closingCta: "Modernize your case management.",
    ctaConfig: {
        type: 'contact',
        label: 'Institutional Access',
        priceLabel: 'Enterprise'
    }
};

export const ROLE_DETAILS: Record<string, RoleDetailContent> = {
  "Family Law Attorneys": { ...BASE_ATTORNEY_DETAILS, id: "attorney", starterKit: { title: "Case Architecture for Legal Stability", url: "https://assets.cotrackpro.com/toolkits/Case_Architecture_for_Legal_Stabilityby_CoTrackPro.pdf" }, claudeSkill: { name: "CoTrackPro Attorney", description: "Attorney workflow support for structured intake issue-spotting outlines and organized drafting assistance.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-attorney.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" } },
  "Forensic Psychologists": { ...BASE_ATTORNEY_DETAILS, id: "forensic-psychologist", title: "Forensic Psychologists", heroHeadline: "Objective Data for Evaluations", workstreams: [
      {
        id: "psychosocial-assessment",
        title: "Psychosocial Assessment",
        trigger: "Evaluation Ordered",
        description: "Gather background information, conduct interviews, and assess psychosocial factors affecting the family system.",
        role: "Forensic Psychologist",
        apps: ["Decisions", "Legal", "Peace"]
      },
      {
        id: "eval-summary",
        title: "Evaluation Summary Framework",
        trigger: "Report Drafting",
        description: "Structured framework for synthesizing observations, measures, and collateral data into a defensible report.",
        role: "Forensic Psychologist",
        apps: ["Evaluate", "Expert Prep"]
      }
  ], recommendedApps: ["Evaluate", "Expert Prep", "Decisions", "Legal", "Peace"],
     artifacts: [
        { name: "Evaluation Summary Framework", category: "Report", workstream: "Reporting", path: "https://evaluate.cotrackpro.com" },
        { name: "Expert Interview Packet", category: "Protocol", workstream: "Assessment", path: "https://expert.cotrackpro.com" }
     ],
     starterKit: { title: "Clinical Implementation Guide", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Clinical_Implementationby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Evaluator", description: "Evaluator support for structured observations interview prompts and neutral report-ready summaries.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-evaluator.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Mediators": { ...BASE_ATTORNEY_DETAILS, id: "mediator", title: "Mediators", heroHeadline: "Tools to Break the Impasse", workstreams: [
      {
        id: "intake-mediation",
        title: "Intake and Mediation Agreement",
        trigger: "Referral to Mediation",
        description: "Complete intake procedures and formalize agreements to begin the mediation process.",
        role: "Mediator",
        apps: ["Peace", "Decisions", "Legal"]
      },
      {
        id: "issue-framing",
        title: "Issue Framing and Agenda Setting",
        trigger: "Need for Written Agreement",
        description: "Define the issues and set the agenda for mediation to ensure focused and productive sessions.",
        role: "Mediator",
        apps: ["Bridges", "Talk", "Peace"]
      },
      {
        id: "joint-session",
        title: "Joint Session Facilitation",
        trigger: "Communication Breakdown",
        description: "Lead joint sessions with all parties present to encourage open communication and collaborative problem-solving.",
        role: "Mediator",
        apps: ["Bridges", "Talk", "Peace"]
      },
      {
        id: "drafting-parenting-plan",
        title: "Drafting Parenting Plan or Memorandum",
        trigger: "Agreement Reached",
        description: "Prepare detailed parenting plans or memoranda of understanding to document agreements.",
        role: "Mediator",
        apps: ["Parenting Plan", "Visitation", "Kids"]
      },
      {
        id: "option-generation",
        title: "Option Generation and Agreement Testing",
        trigger: "Mediation Impasse",
        description: "Help parties brainstorm possible solutions and test the feasibility of proposed agreements.",
        role: "Mediator",
        apps: ["Decisions", "Legal", "Police"]
      },
      {
        id: "closure-referral",
        title: "Closure and Referral",
        trigger: "Completion",
        description: "Conclude services and refer clients to ongoing support as needed.",
        role: "Mediator",
        apps: ["Legal", "Decisions", "Clerk"]
      }
  ], recommendedApps: ["Peace", "Decisions", "Bridges", "Talk", "Parenting Plan", "Visitation", "Kids"],
     artifacts: [
        { name: "Parenting Plan Draft", category: "Template", workstream: "Agreement", path: "https://plan.cotrackpro.com" },
        { name: "Decision Record", category: "Form", workstream: "Session", path: "https://decisions.cotrackpro.com" }
     ],
     starterKit: { title: "System Architecture for Family Stability", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_System_Architecture_for_Family_Stabilityby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Mediator", description: "Mediation support for agenda building shared-interest mapping and agreement recap with next steps.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-mediator.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Divorce Coaches": { ...BASE_ATTORNEY_DETAILS, id: "divorce-coach", title: "Divorce Coaches", heroHeadline: "Empower Clients with Strategy", workstreams: [
      {
        id: "strategy-planning",
        title: "Strategic Case Planning",
        trigger: "New Client Onboarding",
        description: "Develop a high-level roadmap for the client's case, focusing on goals, communication, and documentation.",
        role: "Divorce Coach",
        apps: ["Decisions", "Pact", "Parenting Plan"]
      },
      {
        id: "comm-coaching",
        title: "Communication Coaching",
        trigger: "High Conflict Exchange",
        description: "Review and rewrite client drafts to ensure they are brief, informative, friendly, and firm (BIFF).",
        role: "Divorce Coach",
        apps: ["Bridges", "Talk"]
      },
      {
        id: "needs-assessment-coach",
        title: "Needs Assessment",
        trigger: "Client Intake",
        description: "Assess client needs and strengths to inform service planning and intervention strategies.",
        role: "Divorce Coach",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "parenting-skill-coaching",
        title: "Parenting and Skill Coaching",
        trigger: "Skills Gap",
        description: "Provide guidance and coaching to parents to build effective parenting skills.",
        role: "Divorce Coach",
        apps: ["Decisions", "Costs", "Tax"]
      }
  ], recommendedApps: ["Decisions", "Bridges", "Talk", "Peace", "Parenting Plan", "Costs", "Tax", "Pact"],
     claudeSkill: { name: "CoTrackPro Coach", description: "Coaching support for goal-setting routines accountability plans and calm communication practice prompts.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-coach.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Child-Centered Message Draft", category: "Script", workstream: "Communication", path: "https://bridges.cotrackpro.com" },
        { name: "Conflict Cost Comparison", category: "Analysis", workstream: "Strategy", path: "https://costs.cotrackpro.com" }
     ]
  },
  
  "Therapists": { ...BASE_ATTORNEY_DETAILS, id: "therapist", title: "Therapists", heroHeadline: "Protecting the Therapeutic Process", workstreams: [
      {
        id: "intake-clinical",
        title: "Intake and Clinical Assessment",
        trigger: "New Patient",
        description: "Conduct comprehensive assessments to identify client needs and inform treatment planning.",
        role: "Therapist",
        apps: ["Decisions", "Legal", "Peace"]
      },
      {
        id: "treatment-plan",
        title: "Treatment Plan Development",
        trigger: "Assessment Complete",
        description: "Collaborate with clients to create individualized treatment plans addressing specific goals.",
        role: "Therapist",
        apps: ["Coordinator", "Education", "Costs"]
      },
      {
        id: "crisis-stabilization",
        title: "Crisis Stabilization and Safety Planning",
        trigger: "Threats of Self-Harm, Safety Situation",
        description: "Intervene during crises to stabilize the situation and develop plans to maintain safety.",
        role: "Therapist",
        apps: ["Police", "Peace", "Legal"]
      },
      {
        id: "care-coordination",
        title: "Care Coordination and Documentation",
        trigger: "Multi-Agency Involvement",
        description: "Coordinate care among providers and maintain thorough documentation of all services delivered.",
        role: "Therapist",
        apps: ["Police", "Legal", "Cyber"]
      },
      {
        id: "psychosocial-assessment",
        title: "Psychosocial Assessment",
        trigger: "Concern Ignored",
        description: "Evaluate the psychological and social factors affecting clients to inform intervention.",
        role: "Child Life Specialist",
        apps: ["Decisions", "Legal", "Peace"]
      },
      {
        id: "procedure-prep",
        title: "Procedure Preparation and Education",
        trigger: "Upcoming Procedure",
        description: "Prepare clients and families for upcoming procedures and educate them about what to expect.",
        role: "Child Life Specialist",
        apps: ["Education", "School", "Kids"]
      },
      {
        id: "coping-skills",
        title: "Coping Skills Coaching",
        trigger: "Anxiety",
        description: "Teach and reinforce coping strategies to help clients manage stress and emotional challenges.",
        role: "Child Life Specialist",
        apps: ["Mental", "Peace", "Bridges"]
      },
      {
        id: "therapeutic-play",
        title: "Therapeutic Play",
        trigger: "Expression Need",
        description: "Use play-based and creative interventions to help children express emotions.",
        role: "Child Life Specialist",
        apps: ["Kids", "Coordinator", "CASA Support"]
      }
  ], recommendedApps: ["Mental", "Peace", "Bridges", "Kids", "Decisions", "Legal", "Coordinator", "Education", "Costs", "Police", "Cyber"],
     artifacts: [
        { name: "Well-Being Support Plan", category: "Plan", workstream: "Treatment", path: "https://mental.cotrackpro.com" },
        { name: "Kid-Friendly Safety Plan", category: "Protocol", workstream: "Safety", path: "https://kids.cotrackpro.com" }
     ],
     starterKit: { title: "Clinical Implementation Guide", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Clinical_Implementationby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Therapist", description: "Therapist support for session structure reflections regulation prompts and client-ready action planning.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-therapist.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "High-Conflict Co-parents": { ...BASE_PARENT_DETAILS, id: "parent", claudeSkill: { name: "CoTrackPro Parent Co-Parent", description: "Co-parenting support for clear calm messages boundaries scheduling and child-centered tone rewrites.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-parent-coparent.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" } },
  "Survivors of Coercive Control": { ...BASE_PARENT_DETAILS, id: "survivor", title: "Survivors", heroHeadline: "Safety & Documentation First", workstreams: [
      {
        id: "safety-planning-survivor",
        title: "Advanced Safety Planning",
        trigger: "Escalation of Threat",
        description: "Comprehensive safety protocols including digital hygiene, physical security, and safe exchange procedures.",
        role: "Survivor",
        apps: ["Shield", "Peace", "Legal"]
      },
      {
        id: "evidence-collection-coercive",
        title: "Documenting Coercive Control",
        trigger: "Pattern Recognition",
        description: "Specialized logging to capture patterns of financial abuse, isolation, and intimidation.",
        role: "Survivor",
        apps: ["Evidence", "Track", "Cyber"]
      },
      {
        id: "protection-order-prep",
        title: "Protection Order Preparation",
        trigger: "Incident Requiring Legal Protection",
        description: "Organize evidence and statements specifically for obtaining or enforcing restraining orders.",
        role: "Survivor",
        apps: ["Protection Orders", "Legal", "Evidence"]
      }
  ], recommendedApps: ["Shield", "Protection Orders", "Evidence", "Track", "Cyber", "Peace"],
     claudeSkill: { name: "CoTrackPro Parent Survivor Safety", description: "Survivor safety support for incident logging evidence organization and safety-first action steps.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-parent-survivor-safety.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Safety & Boundary Plan", category: "Protocol", workstream: "Safety", path: "https://shield.cotrackpro.com" },
        { name: "Protection Order Filing Packet", category: "Legal", workstream: "Court", path: "https://po.cotrackpro.com" },
        { name: "Cyber Harassment Evidence", category: "Report", workstream: "Digital", path: "https://cyber.cotrackpro.com" }
     ]
  },
  
  "Pro-Se Litigants": { ...BASE_PARENT_DETAILS, id: "pro-se", title: "Pro-Se Litigants", heroHeadline: "Represent Yourself with Confidence", workstreams: [
      {
        id: "legal-issue-triage",
        title: "Fact Gathering and Legal Issue Triage",
        trigger: "Preparing for Hearing",
        description: "Collect all relevant facts, identify key legal issues, and prioritize them for presentation.",
        role: "Pro-Se",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "drafting-pleadings-pro-se",
        title: "Drafting Pleadings & Evidence Packets",
        trigger: "Filing Deadline",
        description: "Prepare legal pleadings and compile evidence packets in admissible formats for court submission.",
        role: "Pro-Se",
        apps: ["Legal", "Evidence", "Decisions"]
      },
      {
        id: "court-prep",
        title: "Hearing Preparation",
        trigger: "Hearing Scheduled",
        description: "Organize exhibits, outline arguments, and prepare for cross-examination.",
        role: "Pro-Se",
        apps: ["Legal", "Evidence", "Talk"]
      }
  ], recommendedApps: ["Legal", "Evidence", "Decisions", "Talk", "Track"],
     claudeSkill: { name: "CoTrackPro Parent Pro Se", description: "Pro se support for organizing facts timelines exhibits and plain-language court-ready summaries.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-parent-pro-se.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Legal Prep Binder", category: "Template", workstream: "Hearing", path: "https://legal.cotrackpro.com" },
        { name: "Exhibit List & Bundle", category: "Report", workstream: "Evidence", path: "https://evidence.cotrackpro.com" },
        { name: "Financial Hardship Packet", category: "Form", workstream: "Fees", path: "https://poor.cotrackpro.com" }
     ]
  },
  
  "Alienated Parents": { ...BASE_PARENT_DETAILS, id: "targeted-parent", title: "Targeted Parents", heroHeadline: "Document the Pattern of Alienation", workstreams: [
      {
        id: "interference-logging",
        title: "Parenting Time Interference Log",
        trigger: "Denied Access / Missed Visit",
        description: "Strict documentation of every denied visit, late arrival, or interference with communication.",
        role: "Targeted Parent",
        apps: ["Track", "Visitation", "Evidence"]
      },
      {
        id: "reunification-support",
        title: "Reunification Support Protocols",
        trigger: "Reconnection Opportunity",
        description: "Strategies and documentation to support safe, low-pressure reconnection with the child.",
        role: "Targeted Parent",
        apps: ["Bridges", "Talk", "Mental"]
      }
  ], recommendedApps: ["Track", "Visitation", "Evidence", "Bridges", "Talk", "PTP"],
     claudeSkill: { name: "CoTrackPro Parent Alienation Support", description: "Parent support for alienation dynamics documentation routines child-focused messaging and stability planning.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-parent-alienation-support.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Visitation Log & Summary", category: "Report", workstream: "Access", path: "https://visitation.cotrackpro.com" },
        { name: "Parenting Time Portfolio", category: "Report", workstream: "Pattern", path: "https://ptp.cotrackpro.com" }
     ]
  },

  "DV Shelters": { ...BASE_INSTITUTION_DETAILS, id: "dv-shelter", title: "DV Shelters", workstreams: [
      {
        id: "intake-risk-screening",
        title: "Intake and Risk Screening",
        trigger: "New Client Arrival",
        description: "Assess client risk factors and complete intake procedures to inform safety planning.",
        role: "Advocate",
        apps: ["Shield", "Decisions", "Legal"]
      },
      {
        id: "safety-planning-shelter",
        title: "Safety Planning and Protective Actions",
        trigger: "Immediate Threat",
        description: "Develop strategies to ensure immediate and ongoing safety for residents.",
        role: "Advocate",
        apps: ["Shield", "Peace", "Protection Orders"]
      },
      {
        id: "crisis-response",
        title: "Crisis Response and Escalation",
        trigger: "Emergency Situation",
        description: "Respond to crises and escalate cases as needed to ensure client safety and timely intervention.",
        role: "Advocate",
        apps: ["Police", "Peace", "Legal"]
      },
      {
        id: "digital-evidence",
        title: "Digital Evidence Collection",
        trigger: "Harassment/Stalking",
        description: "Guided workflow for collecting and preserving digital evidence of harassment or cyberstalking.",
        role: "Advocate",
        apps: ["Evidence", "Track", "Cyber"]
      },
      {
        id: "resource-referral",
        title: "Resource Navigation and Referrals",
        trigger: "Needs Assessment",
        description: "Guide clients in accessing legal, housing, and financial resources.",
        role: "Advocate",
        apps: ["Decisions", "Costs", "Poor"]
      }
  ], recommendedApps: ["Shield", "Protection Orders", "Evidence", "Track", "Cyber", "Peace", "Decisions", "Poor", "Police"],
     artifacts: [
        { name: "Safety & Boundary Plan", category: "Protocol", workstream: "Intake", path: "https://shield.cotrackpro.com" },
        { name: "Protection Order Filing", category: "Legal", workstream: "Legal", path: "https://po.cotrackpro.com" },
        { name: "Financial Hardship Packet", category: "Form", workstream: "Resources", path: "https://poor.cotrackpro.com" }
     ],
     starterKit: { title: "Advocate Coordination Strategy", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Advocate_Coordination_Strategyby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Advocate", description: "Trauma-informed advocacy support for safety planning referrals and clear client-facing next steps.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-advocate.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Victim Advocates": { ...BASE_INSTITUTION_DETAILS, id: "advocate", title: "Victim Advocates", workstreams: [
      {
        id: "needs-assessment",
        title: "Needs Assessment and Strengths Inventory",
        trigger: "Client Intake",
        description: "Assess client needs and strengths to inform service planning and intervention strategies.",
        role: "Advocate",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "crisis-response",
        title: "Crisis Response and Escalation",
        trigger: "Emergency Call",
        description: "Respond to crises and escalate cases as needed to ensure client safety and timely intervention.",
        role: "Advocate",
        apps: ["Police", "Peace", "Legal"]
      },
      {
        id: "safety-planning-advocate",
        title: "Safety Planning and Protective Actions",
        trigger: "Risk Identified",
        description: "Develop personalized safety plans with input from all stakeholders.",
        role: "Advocate",
        apps: ["Shield", "Peace", "Legal"]
      },
      {
        id: "stakeholder-comm",
        title: "Stakeholder Communication Plan",
        trigger: "Advocacy Needed",
        description: "Plan and execute communications with key stakeholders during interventions.",
        role: "Advocate",
        apps: ["Bridges", "Talk", "Peace"]
      },
      {
        id: "resource-navigation",
        title: "Resource Navigation and Referrals",
        trigger: "Support Needed",
        description: "Guide clients in accessing resources and make referrals to appropriate services.",
        role: "Advocate",
        apps: ["Decisions", "Costs", "Poor"]
      }
  ], recommendedApps: ["Decisions", "Police", "Peace", "Legal", "Shield", "Bridges", "Talk", "Costs", "Poor"],
     artifacts: [
        { name: "Safety & Boundary Plan", category: "Protocol", workstream: "Safety", path: "https://shield.cotrackpro.com" },
        { name: "Conversation Prep Sheet", category: "Script", workstream: "Advocacy", path: "https://talk.cotrackpro.com" }
     ],
     starterKit: { title: "Advocate Coordination Strategy", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Advocate_Coordination_Strategyby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Advocate", description: "Trauma-informed advocacy support for safety planning referrals and clear client-facing next steps.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-advocate.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Legal Aid Societies": { ...BASE_INSTITUTION_DETAILS, id: "legal-aid", title: "Legal Aid", workstreams: [
      {
        id: "eligibility-screening",
        title: "Eligibility Screening and Intake",
        trigger: "Application for Aid",
        description: "Assess client eligibility for services and complete the intake process to initiate support.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Peace"]
      },
      {
        id: "fact-gathering",
        title: "Fact Gathering and Legal Issue Triage",
        trigger: "Case Acceptance",
        description: "Collect relevant facts and prioritize legal issues for effective representation.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "court-rep-legal-aid",
        title: "Court Representation and Hearings",
        trigger: "Hearing Scheduled",
        description: "Represent clients in court and advocate for their interests during proceedings.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "drafting-pleadings-legal-aid",
        title: "Drafting Pleadings and Evidence Packet",
        trigger: "Filing Due",
        description: "Prepare legal pleadings and compile evidence packets for court submission.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "negotiation-settlement-legal-aid",
        title: "Negotiation and Settlement Efforts",
        trigger: "Dispute",
        description: "Lead negotiation efforts to help parties reach mutually agreeable settlements.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Costs"]
      },
      {
        id: "resource-referral-legal-aid",
        title: "Resource Referral and Post Case Follow Up",
        trigger: "Case Closure",
        description: "Refer clients to resources and conduct follow-up after case closure.",
        role: "Legal Aid Attorney",
        apps: ["Legal", "Decisions", "Clerk"]
      }
  ], recommendedApps: ["Legal", "Decisions", "Police", "Peace", "Clerk", "Poor", "Costs"],
     artifacts: [
        { name: "Legal Prep Binder", category: "Template", workstream: "Litigation", path: "https://legal.cotrackpro.com" },
        { name: "Financial Hardship Packet", category: "Form", workstream: "Eligibility", path: "https://poor.cotrackpro.com" }
     ],
     starterKit: { title: "Clinical Structure for Family Court Stability", url: "https://assets.cotrackpro.com/toolkits/Clinical_Structure_for_Family_Court_Stability_by_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Attorney", description: "Attorney workflow support for structured intake issue-spotting outlines and organized drafting assistance.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-attorney.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Family Justice Centers": { ...BASE_INSTITUTION_DETAILS, id: "fjc", title: "Family Justice Centers", workstreams: [
      {
        id: "interdisciplinary-coord",
        title: "Interdisciplinary Care Coordination",
        trigger: "Multi-Agency Case",
        description: "Facilitate collaboration among professionals from different disciplines to provide holistic support.",
        role: "Coordinator",
        apps: ["Decisions", "Bridges", "Legal"]
      },
      {
        id: "service-coordination",
        title: "Service Coordination and Assignment",
        trigger: "Intake",
        description: "Assign and coordinate services among providers to ensure clients receive comprehensive support.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "team-meeting",
        title: "Team Meeting Facilitation",
        trigger: "Case Review",
        description: "Organize and lead team meetings to coordinate care and ensure alignment among service providers.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "service-monitoring",
        title: "Monitor Service Delivery",
        trigger: "Ongoing Case Management",
        description: "Oversee the provision of services and evaluate their effectiveness in meeting client needs.",
        role: "Coordinator",
        apps: ["Legal", "Decisions", "Clerk"]
      }
  ], recommendedApps: ["Coordinator", "Decisions", "Legal", "Bridges", "Costs", "Tax", "Clerk"],
     artifacts: [
        { name: "Coordination Handoff Sheet", category: "Protocol", workstream: "Coordination", path: "https://coordinator.cotrackpro.com" },
        { name: "Integrity Packet", category: "Protocol", workstream: "Compliance", path: "https://integrity.cotrackpro.com" }
     ],
     starterKit: { title: "Advocate Coordination Strategy", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_Advocate_Coordination_Strategyby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Roles Router", description: "Single entry skill that routes users to the right role workflow and standardizes safe consistent outputs.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-roles-router.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },

  "Family Court Judges": { ...BASE_INSTITUTION_DETAILS, id: "judge", title: "Judges", workstreams: [
      {
        id: "case-management",
        title: "Case Management and Scheduling",
        trigger: "Case Assignment",
        description: "Manage case flow and schedule key events to ensure timely resolution.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "hearings",
        title: "Hearings and Due Process Management",
        trigger: "Hearing Date",
        description: "Manage hearings and ensure due process is upheld for all parties.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "orders",
        title: "Orders and Disposition Decisions",
        trigger: "Ruling Required",
        description: "Issue orders and make disposition decisions to resolve cases.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "compliance",
        title: "Compliance Monitoring",
        trigger: "Review Hearing",
        description: "Monitor compliance with court orders and schedule regular reviews.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "case-review",
        title: "Case Review and Legal Findings",
        trigger: "Review",
        description: "Review case details and make legal determinations based on evidence and applicable law.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "coordination-agencies",
        title: "Coordination With Agencies and Counsel",
        trigger: "Multi-Agency",
        description: "Work with external agencies and legal counsel to ensure comprehensive case management.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "trauma-informed",
        title: "Trauma Informed Court Practice",
        trigger: "Case Handling",
        description: "Apply trauma-informed principles to court practices to support the well-being of all participants.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "settlement-conferences",
        title: "Settlement Conferences",
        trigger: "Mediation Impasse",
        description: "Facilitate conferences to help parties reach settlements outside of court.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Police"]
      },
      {
        id: "enforcement",
        title: "Enforcement and Contempt Proceedings",
        trigger: "Violation",
        description: "Oversee proceedings related to the enforcement of court orders and address contempt issues.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "post-judgment",
        title: "Post Judgment Modifications and Reviews",
        trigger: "Modification Request",
        description: "Manage requests for changes to court orders and conduct periodic reviews.",
        role: "Judge",
        apps: ["Legal", "Decisions", "Clerk"]
      }
  ], recommendedApps: ["Legal", "Decisions", "Clerk", "Benchmark", "Judge Tools", "Police"],
     artifacts: [
        { name: "Bench Decision Aid", category: "Template", workstream: "Ruling", path: "https://judge.cotrackpro.com" },
        { name: "Court Benchmark Report", category: "Report", workstream: "Admin", path: "https://benchmark.cotrackpro.com" }
     ],
     starterKit: { title: "Judicial Protocol and Infrastructure Upgrade", url: "https://assets.cotrackpro.com/toolkits/Judicial_Protocol_and_Infrastructure_Upgradeby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Judge", description: "Judicial workflow support for neutral issue framing hearing prep outlines and clarity-focused orders support.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-judge.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Guardians ad Litem": { ...BASE_INSTITUTION_DETAILS, id: "gal", title: "Guardians ad Litem", workstreams: [
      {
        id: "child-interview",
        title: "Child Interview & Observation",
        trigger: "Investigation Phase",
        description: "Conduct age-appropriate interviews and observations to determine the child's needs and wishes.",
        role: "GAL",
        apps: ["Kids", "Decisions", "GAL Navigator"]
      },
      {
        id: "collateral-contacts",
        title: "Collateral Contact Interviews",
        trigger: "Fact Finding",
        description: "Interview teachers, doctors, and therapists to gather objective data about the child's well-being.",
        role: "GAL",
        apps: ["Track", "Evidence", "School"]
      },
      {
        id: "report-writing",
        title: "GAL Report Generation",
        trigger: "Hearing Prep",
        description: "Synthesize findings into a comprehensive report with recommendations for the court.",
        role: "GAL",
        apps: ["GAL Navigator", "Legal", "Decisions"]
      },
      {
        id: "stakeholder-comm",
        title: "Stakeholder Communication Plan",
        trigger: "Investigation",
        description: "A workflow for planning and executing communications with key stakeholders during interventions.",
        role: "GAL",
        apps: ["Peace", "Police", "Bridges"]
      }
  ], recommendedApps: ["GAL Navigator", "Kids", "Decisions", "Track", "Evidence", "School", "Legal", "Peace", "Police", "Bridges"],
     artifacts: [
        { name: "GAL Best-Interests Packet", category: "Report", workstream: "Investigation", path: "https://gal.cotrackpro.com" },
        { name: "Kid-Friendly Safety Plan", category: "Protocol", workstream: "Safety", path: "https://kids.cotrackpro.com" }
     ],
     starterKit: { title: "Advocate Ecosystem Clarity", url: "https://assets.cotrackpro.com/toolkits/Advocate_Ecosystem_Clarityby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro GAL", description: "GAL support for child-centered fact organization neutral summaries and bias-aware documentation.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-gal.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Parenting Coordinators": { ...BASE_INSTITUTION_DETAILS, id: "coordinator", title: "Parenting Coordinators", workstreams: [
      {
        id: "dispute-resolution",
        title: "Dispute Resolution Protocol",
        trigger: "Parent Disagreement",
        description: "Structured process for resolving minor disputes over schedule or decisions.",
        role: "Coordinator",
        apps: ["Coordinator", "Decisions", "Peace"]
      },
      {
        id: "plan-implementation",
        title: "Plan Implementation Support",
        trigger: "New Order",
        description: "Assist parties in understanding and carrying out the parenting plan.",
        role: "Coordinator",
        apps: ["Parenting Plan", "Coordinator", "Legal"]
      },
      {
        id: "service-coordination",
        title: "Service Coordination and Assignment",
        trigger: "Needs Identified",
        description: "Assign and coordinate services among providers to ensure clients receive comprehensive support.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "team-meeting",
        title: "Team Meeting Facilitation",
        trigger: "Coordination",
        description: "Organize and lead team meetings to coordinate care and ensure alignment among service providers.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "monitor-delivery",
        title: "Monitor Service Delivery and Outcomes",
        trigger: "Ongoing",
        description: "Oversee the provision of services and evaluate their effectiveness in meeting client needs.",
        role: "Coordinator",
        apps: ["Legal", "Decisions", "Clerk"]
      },
      {
        id: "update-plan",
        title: "Update Family Plan and Goals",
        trigger: "Review",
        description: "Regularly review and revise family plans and goals to reflect progress and changing needs.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      },
      {
        id: "barrier-removal",
        title: "Barrier Removal and Resource Navigation",
        trigger: "Obstacle",
        description: "Identify and address obstacles to service access, connecting clients with appropriate resources.",
        role: "Coordinator",
        apps: ["Legal", "Decisions", "Coordinator"]
      },
      {
        id: "quality-check",
        title: "Reporting and Documentation Quality Check",
        trigger: "Audit",
        description: "Review reports and documentation to ensure accuracy, completeness, and quality.",
        role: "Coordinator",
        apps: ["Decisions", "Costs", "Tax"]
      }
  ], recommendedApps: ["Coordinator", "Decisions", "Peace", "Parenting Plan", "Legal", "Costs", "Tax"],
     artifacts: [
        { name: "Coordination Handoff Sheet", category: "Protocol", workstream: "Resolution", path: "https://coordinator.cotrackpro.com" },
        { name: "Decision Record", category: "Form", workstream: "Dispute", path: "https://decisions.cotrackpro.com" }
     ],
     starterKit: { title: "System Architecture for Family Stability", url: "https://assets.cotrackpro.com/toolkits/CoTrackPro_System_Architecture_for_Family_Stabilityby_CoTrackPro.pdf" },
     claudeSkill: { name: "CoTrackPro Parenting Coordinator", description: "Parenting coordinator support for implementation plans conflict reduction scripts and structured follow-ups.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-parenting-coordinator.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" }
  },
  
  "Court Evaluators": { ...BASE_INSTITUTION_DETAILS, id: "evaluator", title: "Court Evaluators", workstreams: [
      {
        id: "forensic-interview",
        title: "Forensic Interviewing",
        trigger: "Evaluation Phase",
        description: "Conduct rigorous, neutral interviews with parents and children.",
        role: "Evaluator",
        apps: ["Evaluate", "Expert Prep", "Kids"]
      },
      {
        id: "psych-testing",
        title: "Psychological Testing & Analysis",
        trigger: "Assessment Phase",
        description: "Administer and interpret psychological tests to inform custody recommendations.",
        role: "Evaluator",
        apps: ["Evaluate", "Mental", "Decisions"]
      },
      {
        id: "custody-report",
        title: "Custody Evaluation Report",
        trigger: "Completion of Investigation",
        description: "Draft a comprehensive report detailing findings and recommendations for the court.",
        role: "Evaluator",
        apps: ["Evaluate", "Legal", "Decisions"]
      }
  ], recommendedApps: ["Evaluate", "Expert Prep", "Kids", "Mental", "Decisions", "Legal"],
     claudeSkill: { name: "CoTrackPro Evaluator", description: "Evaluator support for structured observations interview prompts and neutral report-ready summaries.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-evaluator.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Evaluation Summary Framework", category: "Report", workstream: "Analysis", path: "https://evaluate.cotrackpro.com" },
        { name: "Expert Interview Packet", category: "Protocol", workstream: "Interview", path: "https://expert.cotrackpro.com" }
     ]
  },

  "Court Clerks": { ...BASE_INSTITUTION_DETAILS, id: "clerk", title: "Court Clerks", heroHeadline: "Streamlining the Docket", workstreams: [
      {
        id: "filing-review",
        title: "Filing Review & Intake",
        trigger: "New Submission",
        description: "Review incoming documents for procedural compliance and completeness before docketing.",
        role: "Court Clerk",
        apps: ["Clerk", "Legal", "Decisions"]
      },
      {
        id: "public-interaction",
        title: "Public Counter & Pro-Se Support",
        trigger: "Walk-in / Call",
        description: "Provide procedural information (not legal advice) to self-represented litigants.",
        role: "Court Clerk",
        apps: ["Clerk", "Edu", "Forms"]
      },
      {
        id: "docket-management",
        title: "Docket & Calendar Management",
        trigger: "Hearing Scheduling",
        description: "Organize court calendars to ensure efficient use of judicial time.",
        role: "Court Clerk",
        apps: ["Clerk", "Calendar", "Judge Tools"]
      }
  ], recommendedApps: ["Clerk", "Legal", "Decisions", "Benchmark"],
     claudeSkill: { name: "CoTrackPro Clerk", description: "Clerk support for filing readiness document naming conventions and step-by-step submission checklists.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-clerk.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Clerk Intake Sheet", category: "Form", workstream: "Intake", path: "https://clerk.cotrackpro.com" },
        { name: "Pro-Se Procedural Guide", category: "Handout", workstream: "Support", path: "https://forms.cotrackpro.com" }
     ]
  },

  "Bailiffs": { ...BASE_INSTITUTION_DETAILS, id: "bailiff", title: "Bailiffs & Court Security", heroHeadline: "Safety in the Courtroom", workstreams: [
      {
        id: "security-screening",
        title: "Security Screening & Access",
        trigger: "Court Entry",
        description: "Ensure no prohibited items enter the facility and manage building access.",
        role: "Bailiff",
        apps: ["Shield", "Police", "Reports"]
      },
      {
        id: "courtroom-decorum",
        title: "Maintaining Courtroom Decorum",
        trigger: "Session Start",
        description: "Enforce rules of conduct and manage disruptions during proceedings.",
        role: "Bailiff",
        apps: ["Judge Tools", "Shield", "Reports"]
      },
      {
        id: "emergency-response",
        title: "Emergency Response Protocol",
        trigger: "Security Threat",
        description: "Execute safety protocols in case of violence, medical emergencies, or fire.",
        role: "Bailiff",
        apps: ["Police", "Shield", "Alerts"]
      }
  ], recommendedApps: ["Shield", "Police", "Track", "Judge Tools"],
     claudeSkill: { name: "CoTrackPro Bailiff", description: "Courtroom operations support for de-escalation language neutral incident notes and procedure-aligned checklists.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-bailiff.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Incident Report Form", category: "Report", workstream: "Security", path: "https://police.cotrackpro.com" },
        { name: "Safety Protocol Checklist", category: "Protocol", workstream: "Emergency", path: "https://shield.cotrackpro.com" }
     ]
  },

  "Visitation Supervisors": { ...BASE_INSTITUTION_DETAILS, id: "supervisor", title: "Visitation Supervisors", heroHeadline: "Neutral Observation for Safety", workstreams: [
      {
        id: "intake-safety",
        title: "Intake & Safety Assessment",
        trigger: "New Family",
        description: "Review court orders, safety concerns, and establish rules for supervised visits.",
        role: "Supervisor",
        apps: ["Visitation", "Shield", "Decisions"]
      },
      {
        id: "visit-observation",
        title: "Visit Observation & Intervention",
        trigger: "Visit Start",
        description: "Monitor interactions, intervene if safety is compromised, and maintain neutral logs.",
        role: "Supervisor",
        apps: ["Visitation", "Track", "Notes"]
      },
      {
        id: "report-writing-supervisor",
        title: "Observation Report Generation",
        trigger: "Post-Visit",
        description: "Draft objective summaries of interactions for court or counsel review.",
        role: "Supervisor",
        apps: ["Visitation", "Evidence", "Legal"]
      }
  ], recommendedApps: ["Visitation", "Track", "Evidence", "Shield", "Decisions"],
     claudeSkill: { name: "CoTrackPro Supervisor", description: "Supervisor support for oversight checklists escalation criteria audit-friendly summaries and accountability logs.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-supervisor.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Visitation Log & Summary", category: "Report", workstream: "Observation", path: "https://visitation.cotrackpro.com" },
        { name: "Intervention Protocol", category: "Protocol", workstream: "Safety", path: "https://shield.cotrackpro.com" }
     ]
  },

  "Police": { ...BASE_INSTITUTION_DETAILS, id: "police", title: "Law Enforcement", heroHeadline: "Civil Standbys & Order Enforcement", workstreams: [
      {
        id: "order-verification",
        title: "Custody Order Verification",
        trigger: "Dispute Call",
        description: "Review current court orders to determine jurisdiction and enforceability.",
        role: "Officer",
        apps: ["Police", "Legal", "Shield"]
      },
      {
        id: "civil-standby",
        title: "Civil Standby / Peacekeeping",
        trigger: "Exchange Request",
        description: "Maintain peace during custody exchanges or property retrieval.",
        role: "Officer",
        apps: ["Police", "Shield", "Track"]
      },
      {
        id: "incident-reporting-police",
        title: "Incident Documentation",
        trigger: "Crime/Violation",
        description: "Document violations of protective orders, domestic violence, or interference.",
        role: "Officer",
        apps: ["Police", "Evidence", "Reports"]
      }
  ], recommendedApps: ["Police", "Shield", "Legal", "Evidence"],
     claudeSkill: { name: "CoTrackPro Police", description: "Law enforcement support for objective report structuring evidence capture checklists and safety-aware notes.", url: "https://assets.cotrackpro.com/claude-skill/cotrackpro-police.skill", image: "https://assets.cotrackpro.com/public/assets/Claude.jpeg" },
     artifacts: [
        { name: "Incident Report Packet", category: "Report", workstream: "Documentation", path: "https://police.cotrackpro.com" },
        { name: "Order Verification Checklist", category: "Checklist", workstream: "Response", path: "https://legal.cotrackpro.com" }
     ]
  }
};
