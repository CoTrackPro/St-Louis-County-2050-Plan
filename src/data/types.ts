
import React from 'react';
import { LucideIcon } from 'lucide-react';

// Removed conflicting module augmentations to restore standard JSX elements.
// Custom elements (like stripe-pricing-table) will be handled by default React behavior 
// or can be explicitly typed in a d.ts file if strict checking is required.

export interface VaultItemDetail {
  subtitle: string;
  features: string[];
  bestFor: string;
  example: string;
}

export interface VaultItem {
  title: string;
  description: string;
  icon: LucideIcon;
  fullWidth?: boolean;
  url?: string; // Kept optional for backward compatibility, though unused in Vault view now
  details: VaultItemDetail; // New detailed content
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQCategory {
  id: string;
  label: string;
  items: FAQItem[];
}

export interface RoleAction {
  label: string;
  url: string;
  triggerModal?: boolean;
}

export interface Role {
  id: string;
  title: string;
  icon: LucideIcon;
  description: string;
  subRoles?: string[];
  whyNow: string[];
  gradient: string;
  accentColor: string;
  primaryAction?: RoleAction;
  secondaryAction?: RoleAction;
  singleAction?: RoleAction;
}

export interface Artifact {
  name: string;
  category: string;
  workstream: string;
  path: string;
}

export interface Workstream {
  id: string;
  title: string;
  trigger: string;
  description: string;
  role: string; // The specific role name from the CSV for reference
  apps?: string[]; // List of App names (e.g., "Legal", "Peace") used in this workstream
}

export interface RoleDetailContent {
  id: string;
  title: string;
  heroHeadline: string;
  heroSubheadline: string;
  painPoints: {
    problem: string;
    solution: string;
  }[];
  keyFeatures: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  closingCta: string;
  stats?: {
    value: string;
    label: string;
  }[];
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
  faqs?: {
    question: string;
    answer: string;
  }[];
  artifacts?: Artifact[];
  workstreams?: Workstream[]; // Role-specific workflows
  recommendedApps?: string[]; // Array of app names from APP_DIRECTORY to cross-reference
  starterKit?: {
    title: string;
    url: string;
  };
  ctaConfig: {
    type: 'subscription' | 'contact';
    label: string;
    monthlyUrl?: string;
    yearlyUrl?: string;
    contactUrl?: string;
    priceLabel?: string;
  };
  claudeSkill?: {
    name: string;
    description: string;
    url: string;
    image: string;
  };
}

export interface ScheduleItem {
  day: string;
  activity: string;
}

export interface RichScheduleItem {
  day: string;
  title: string;
  icon: LucideIcon;
  color: string;
  action: string;
  tool: string;
  win: string;
}

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
}

export interface MetricItem {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
}

export interface AppDirectoryItem {
  name: string;
  url: string;
  category: string;
  audience: string[];
  description: string;
  tags: string[];
  artifact?: string;
  steps?: string[];
}

export interface CustomResource {
  id: string;
  title: string;
  url?: string;
  description: string;
  category: string;
  dateAdded: number;
}

// --- Quiz System Types ---

export interface QuizOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface QuizQuestion {
  id: number;
  type: 'single' | 'multi';
  prompt: string;
  options: QuizOption[];
  correctAnswerIds: string[]; // Array of option IDs
  explanation: string; // The "Why it matters"
  correction?: string; // "If wrong, try this"
  nextAction: string; // Practical step
  tags?: string[];
}

export interface QuizModule {
  id: string;
  title: string;
  roleId: string;
  format: 'Diagnostic' | 'Scenario' | 'Knowledge' | 'Evidence';
  difficulty: 1 | 2 | 3 | 4 | 5;
  timeEstimate: string;
  description: string;
  questions: QuizQuestion[];
  outcome: string; // What user gets at end
}

// --- Open Letter Types ---

export interface LetterBlock {
  type: 'heading' | 'paragraph' | 'bullets' | 'signatureBlock';
  level?: number;
  text?: string;
  items?: string[];
  label?: string;
}

export interface GeneratedLetter {
  templateId: string;
  meta: { title: string; createdAt: string; version: number };
  signer: {
    name: string;
    roleOrg: string;
    cityState: string;
    specialty?: string;
    contact?: string;
  };
  recipient?: {
    name: string;
    organization: string;
    address: string;
  };
  options: {
    tone: string;
    length: string;
    includeSignaturePage: boolean;
    signatureLines: number;
    includeQr: boolean;
    qrUrl?: string;
  };
  blocks: LetterBlock[];
}
