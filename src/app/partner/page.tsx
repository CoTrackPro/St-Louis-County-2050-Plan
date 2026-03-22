import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { ArrowLeft, HeartHandshake, CheckCircle2 } from "lucide-react";
import { PARTNER_TYPES, BENEFITS } from "@/data/partner";

export const metadata: Metadata = {
  title: "Partner With Us — CoTrackPro",
  description: "Bring CoTrackPro to your organization. We partner with courts, legal aid societies, DV shelters, and family service agencies.",
};

export default function PartnerPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" /> Home
          </Link>

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-semibold mb-6">
              <HeartHandshake className="w-4 h-4" /> Partnership Program
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">Partner With CoTrackPro</h1>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              Bring child-centered, trauma-informed tools to your organization. We work with courts, nonprofits, legal aid societies, and family service agencies.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-14">
            {PARTNER_TYPES.map((p) => {
              const Icon = p.icon;
              return (
                <div key={p.title} className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-white/20 transition-all">
                  <div className={`${p.color} mb-3`}><Icon className="w-6 h-6" /></div>
                  <h3 className="font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-sm text-gray-400">{p.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">What Partnerships Include</h2>
            <ul className="space-y-3">
              {BENEFITS.map((b) => (
                <li key={b} className="flex items-center gap-3 text-gray-300">
                  <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          <div className="text-center">
            <a
              href="mailto:admin@cotrackpro.com?subject=Partnership%20Inquiry"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1"
            >
              Start a Conversation
            </a>
            <p className="text-gray-500 text-sm mt-4">Or email us directly at admin@cotrackpro.com</p>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
