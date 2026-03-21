"use client";
import { useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import NavBar from "@/components/layout/NavBar";

const PLANS: { key: string; name: string; tier: string; billing: string; icon: string; price: string; badge?: string; features: string[]; highlight?: boolean }[] = [
  {
    key: "parent_monthly",
    tier: "parent",
    billing: "monthly",
    name: "Parent",
    icon: "👨‍👧",
    price: "Monthly",
    features: ["Bridges — co-parenting docs", "Mental — wellness & safety plans", "Incident & communication logs", "Court-ready summaries"],
  },
  {
    key: "parent_annual",
    tier: "parent",
    billing: "annual",
    name: "Parent",
    icon: "👨‍👧",
    price: "Annual",
    badge: "Save ~17%",
    features: ["Everything in Parent Monthly", "2 months free", "Annual receipt for records"],
    highlight: false,
  },
  {
    key: "professional_monthly",
    tier: "professional",
    billing: "monthly",
    name: "Professional",
    icon: "⚖️",
    price: "Monthly",
    features: ["All Parent features", "Legal — attorney tools", "Case checklists & drafting", "8th Circuit appeal workflow"],
    highlight: true,
  },
  {
    key: "professional_annual",
    tier: "professional",
    billing: "annual",
    name: "Professional",
    icon: "⚖️",
    price: "Annual",
    badge: "Best value",
    features: ["Everything in Professional Monthly", "2 months free", "Priority support"],
    highlight: false,
  },
];

function BillingContent() {
  const params = useSearchParams();
  const upgrade = params.get("upgrade"); // "parent" or "professional"
  const [loading, setLoading] = useState<string | null>(null);

  async function checkout(plan: string) {
    setLoading(plan);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoading(null);
    }
  }

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">Choose your plan</h1>
        <p className="text-gray-500 mb-8">Cancel anytime. Secure payments via Stripe.</p>

        {upgrade && (
          <div className="mb-6 px-4 py-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800">
            You need a <strong className="capitalize">{upgrade}</strong> plan to access that feature.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PLANS.map((plan) => {
            const isHighlighted = plan.highlight || plan.tier === upgrade;
            return (
              <div
                key={plan.key}
                className={`rounded-2xl border p-6 flex flex-col ${
                  isHighlighted
                    ? "border-indigo-400 bg-indigo-50 ring-2 ring-indigo-400"
                    : "border-gray-200 bg-white"
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <span className="text-3xl">{plan.icon}</span>
                  {plan.badge && (
                    <span className="text-xs font-semibold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <h2 className="text-lg font-bold text-indigo-900">{plan.name}</h2>
                <p className="text-sm text-indigo-500 mb-4 capitalize">{plan.billing}</p>
                <ul className="text-sm text-gray-600 space-y-1 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span> {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => checkout(plan.key)}
                  disabled={loading === plan.key}
                  className="w-full py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading === plan.key ? "Redirecting…" : "Subscribe"}
                </button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

function BillingFallback() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-indigo-100 rounded w-48" />
          <div className="h-4 bg-indigo-50 rounded w-64" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="h-64 bg-indigo-50 rounded-2xl border border-indigo-100" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}

export default function BillingPage() {
  return (
    <Suspense fallback={<BillingFallback />}>
      <BillingContent />
    </Suspense>
  );
}
