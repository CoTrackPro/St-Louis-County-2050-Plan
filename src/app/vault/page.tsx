import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { VAULT_ITEMS } from "@/data/apps";

export const metadata: Metadata = {
  title: "The Vault — CoTrackPro",
  description: "Your directory of apps, tools, pathways, playbooks, and resources for high-conflict custody cases.",
};

export default function VaultPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-white font-medium mb-10 transition-colors hover:-translate-x-1 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#38bdf8] text-xs font-semibold uppercase tracking-wider mb-6">
              Toolkit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">The Vault</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Every resource you need — pathways, playbooks, checklists, infographics, and more —
              organized by format so you can find what you need when you need it.
            </p>
          </div>

          {/* Vault Items Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {VAULT_ITEMS.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0ea5e9]/30 transition-colors group"
              >
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white mb-1">{item.title}</h2>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-2">
                    {item.details.subtitle}
                  </div>
                  <ul className="space-y-1.5">
                    {item.details.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                        <span className="text-[#0ea5e9] mt-0.5 shrink-0">›</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-2">
                  <div className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-400">Best for:</span>{" "}
                    {item.details.bestFor}
                  </div>
                  <div className="text-xs text-gray-600 italic">{item.details.example}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 rounded-3xl bg-white/[0.03] border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Access the Full Vault</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                All resources are included in your CoTrackPro membership. No extras, no add-ons.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] transition-all"
              >
                View Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
