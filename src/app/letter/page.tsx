import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, PenTool, FileText, Users, Scale } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";

export const metadata: Metadata = {
  title: "Open Letter — CoTrackPro",
  description: "Generate court-neutral public advocacy letters for legislators, institutions, and community stakeholders.",
};

const LETTER_TYPES = [
  {
    icon: Scale,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    title: "Legislative Advocacy",
    desc: "Letters to state legislators calling for family court reform, transparency, and child-centered policy.",
  },
  {
    icon: FileText,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    title: "Institutional Accountability",
    desc: "Formal requests to courts, agencies, and oversight bodies demanding process improvements.",
  },
  {
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    title: "Community Awareness",
    desc: "Open letters to the public, media, and stakeholders about systemic gaps in high-conflict case handling.",
  },
  {
    icon: PenTool,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "Professional Community",
    desc: "Letters to bar associations, licensing boards, and professional organizations advocating for best practices.",
  },
];

const FEATURES = [
  { label: "Tone Selector", desc: "Choose formal, firm, or conciliatory — always court-neutral" },
  { label: "Role Templates", desc: "Tailored for parents, professionals, advocates, and survivors" },
  { label: "Signature Block", desc: "Multi-signer support with QR code and contact options" },
  { label: "PDF Export", desc: "Print-ready, properly formatted for official distribution" },
  { label: "Version Control", desc: "Track iterations and keep a dated archive of your letters" },
  { label: "Evidence Links", desc: "Attach supporting documents and citations to any section" },
];

export default function LetterPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-semibold uppercase tracking-wider mb-6">
              New · Toolkit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Open Letter Generator</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Turn your experience into public advocacy. Generate structured, court-neutral letters
              that speak truth to power — for legislators, institutions, and the community.
            </p>
          </div>

          {/* Letter Types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Letter Types</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {LETTER_TYPES.map((t) => (
                <div
                  key={t.title}
                  className={`p-6 rounded-2xl bg-white/[0.02] border ${t.border} transition-colors`}
                >
                  <div className={`w-10 h-10 rounded-xl ${t.bg} ${t.color} flex items-center justify-center mb-4`}>
                    <t.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{t.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Built-In Features</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {FEATURES.map((f) => (
                <div key={f.label} className="p-5 rounded-xl bg-white/[0.02] border border-white/10">
                  <div className="text-sm font-bold text-white mb-1">{f.label}</div>
                  <div className="text-sm text-gray-400">{f.desc}</div>
                </div>
              ))}
            </div>
          </section>

          {/* How It Works */}
          <section className="mb-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="grid sm:grid-cols-4 gap-6">
              {[
                { step: "01", title: "Pick a Template", desc: "Choose from legislative, institutional, or community letter types." },
                { step: "02", title: "Fill in Your Story", desc: "Answer guided prompts — we handle the structure and tone." },
                { step: "03", title: "Review & Refine", desc: "Adjust tone, length, and signature options to match your intent." },
                { step: "04", title: "Publish or Send", desc: "Export as PDF, share publicly, or submit directly to your target." },
              ].map((s) => (
                <div key={s.step} className="flex flex-col gap-2">
                  <div className="text-3xl font-black text-[#0ea5e9]/20 leading-none">{s.step}</div>
                  <h3 className="text-sm font-bold text-white">{s.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Your Voice Matters</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The Open Letter Generator is included in every CoTrackPro plan. Start advocating today.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] transition-all"
              >
                Get Started
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
