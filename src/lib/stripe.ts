import Stripe from "stripe";

// Lazy singleton — safe at build time, validated at runtime
let _stripe: Stripe | null = null;

export function getStripe(): Stripe {
  if (!_stripe) {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("STRIPE_SECRET_KEY is not set");
    }
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    });
  }
  return _stripe;
}

/** @deprecated use getStripe() for lazy initialization */
export const stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return getStripe()[prop as keyof Stripe];
  },
});

/**
 * CoTrackPro subscription tiers.
 *
 * access.tier stored in Clerk publicMetadata:
 *   "parent"       → Bridges + Mental modules
 *   "professional" → all modules (Bridges + Legal + Mental)
 */
export const PLANS = {
  parent_monthly: {
    name: "Parent — Monthly",
    priceId: process.env.STRIPE_PRICE_PARENT_MONTHLY!,
    billing: "monthly",
    tier: "parent",
    modules: "bridges,mental",
  },
  parent_annual: {
    name: "Parent — Annual",
    priceId: process.env.STRIPE_PRICE_PARENT_ANNUAL!,
    billing: "annual",
    tier: "parent",
    modules: "bridges,mental",
  },
  professional_monthly: {
    name: "Professional — Monthly",
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL_MONTHLY!,
    billing: "monthly",
    tier: "professional",
    modules: "bridges,legal,mental",
  },
  professional_annual: {
    name: "Professional — Annual",
    priceId: process.env.STRIPE_PRICE_PROFESSIONAL_ANNUAL!,
    billing: "annual",
    tier: "professional",
    modules: "bridges,legal,mental",
  },
} as const;

export type PlanKey = keyof typeof PLANS;
