import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageSquare, Mail, Phone, Users } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";

export const metadata: Metadata = {
  title: "Advocacy Scripts — CoTrackPro",
  description: "Role-specific communication scripts, templates, and documentation tools for parents, attorneys, and advocates.",
};

const SCRIPT_CATEGORIES = [
  {
    title: "Co-Parent Communication",
    icon: Users,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    items: [
      "BIFF Response Generator (Brief, Informative, Friendly, Firm)",
      "Child-Centered Message Templates",
      "Schedule Request & Confirmation Scripts",
      "Boundary-Setting Messages",
      "Grey Rock Response Library (50+ de-escalating replies)",
    ],
  },
  {
    title: "Professional Outreach",
    icon: Mail,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    items: [
      "Attorney Collaboration Proposals",
      "Firm Partnership & Pilot Emails",
      "Training Initiative Requests",
      "Professional Referral Templates",
      "Intake Documentation Scripts",
    ],
  },
  {
    title: "Text & Phone Scripts",
    icon: Phone,
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/20",
    items: [
      "Quick update texts for co-parents",
      "Phone call prep scripts for high-tension calls",
      "Boundary enforcement by text",
      "Voicemail scripts for attorney outreach",
      "De-escalation language guide",
    ],
  },
  {
    title: "Documentation Templates",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    items: [
      "Incident Log Templates",
      "Stakeholder Update Emails (school, doctor, therapist)",
      "Evidence Request Formats",
      "Communication Protocol Letters",
      "Exchange Confirmation Messages",
    ],
  },
];

export default function ScriptsPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Toolkit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Advocacy Scripts</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Say exactly the right thing under pressure. Role-specific communication scripts and
              documentation templates designed for high-conflict custody situations.
            </p>
          </div>

          {/* Script Categories */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {SCRIPT_CATEGORIES.map((cat) => (
              <div
                key={cat.title}
                className={`p-6 rounded-2xl bg-white/[0.02] border ${cat.border} transition-colors`}
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className={`w-10 h-10 rounded-xl ${cat.bg} ${cat.color} flex items-center justify-center`}>
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h2 className={`text-lg font-bold text-white`}>{cat.title}</h2>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
                      <span className={`${cat.color} mt-0.5 shrink-0`}>›</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                { step: "01", title: "Choose Your Role", desc: "Parent, attorney, advocate, or professional — scripts are tailored to your situation." },
                { step: "02", title: "Select the Context", desc: "Email, text, or phone. Urgent response or planned outreach. We have the right format." },
                { step: "03", title: "Customize & Send", desc: "Fill in the blanks, review with BIFF principles, and communicate with confidence." },
              ].map((s) => (
                <div key={s.step} className="flex gap-4">
                  <div className="text-3xl font-black text-[#0ea5e9]/20 leading-none shrink-0">{s.step}</div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{s.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Access All Scripts</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                All advocacy scripts and templates are included in your CoTrackPro membership.
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
