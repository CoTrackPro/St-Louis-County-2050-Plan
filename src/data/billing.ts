export type Plan = {
  key: string;
  /** Matches the Stripe tier used in access claims */
  tier: string;
  billing: "monthly" | "annual";
  name: string;
  icon: string;
  badge?: string;
  features: string[];
  /** Renders the card with a highlight ring */
  highlight?: boolean;
};

export const PLANS: Plan[] = [
  {
    key: "parent_monthly",
    tier: "parent",
    billing: "monthly",
    name: "Parent",
    icon: "👨‍👧",
    features: [
      "Bridges — co-parenting docs",
      "Mental — wellness & safety plans",
      "Incident & communication logs",
      "Court-ready summaries",
    ],
  },
  {
    key: "parent_annual",
    tier: "parent",
    billing: "annual",
    name: "Parent",
    icon: "👨‍👧",
    badge: "Save ~17%",
    features: [
      "Everything in Parent Monthly",
      "2 months free",
      "Annual receipt for records",
    ],
  },
  {
    key: "professional_monthly",
    tier: "professional",
    billing: "monthly",
    name: "Professional",
    icon: "⚖️",
    features: [
      "All Parent features",
      "Legal — attorney tools",
      "Case checklists & drafting",
      "8th Circuit appeal workflow",
    ],
    highlight: true,
  },
  {
    key: "professional_annual",
    tier: "professional",
    billing: "annual",
    name: "Professional",
    icon: "⚖️",
    badge: "Best value",
    features: [
      "Everything in Professional Monthly",
      "2 months free",
      "Priority support",
    ],
  },
];

/** Mailchimp newsletter URL — single source of truth */
export const NEWSLETTER_URL = "https://mailchi.mp/2ed059283bd7/signup";
