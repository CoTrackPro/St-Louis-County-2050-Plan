import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Brain, Trophy, Clock, Target } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { QUIZ_BANK } from "@/data/quizBank";

export const metadata: Metadata = {
  title: "Skill Builder — CoTrackPro",
  description: "Interactive quizzes and skill-building exercises for parents, attorneys, advocates, and family court professionals.",
};

const ROLE_CONFIG: Record<string, { color: string; border: string; bg: string }> = {
  Parent:                    { color: "text-indigo-400",   border: "border-indigo-500/20",   bg: "bg-indigo-500/10" },
  Survivor:                  { color: "text-orange-400",   border: "border-orange-500/20",   bg: "bg-orange-500/10" },
  "Family Supporter":        { color: "text-teal-400",     border: "border-teal-500/20",     bg: "bg-teal-500/10" },
  Attorney:                  { color: "text-[#38bdf8]",    border: "border-[#0ea5e9]/20",    bg: "bg-[#0ea5e9]/10" },
  "Guardian ad Litem (GAL)": { color: "text-blue-400",     border: "border-blue-500/20",     bg: "bg-blue-500/10" },
  "Mental Health Professional": { color: "text-pink-400",  border: "border-pink-500/20",     bg: "bg-pink-500/10" },
  "School Administrator / Educator": { color: "text-yellow-400", border: "border-yellow-500/20", bg: "bg-yellow-500/10" },
  "Judge / Court Role":      { color: "text-amber-400",    border: "border-amber-500/20",    bg: "bg-amber-500/10" },
  "Coordinator (Parenting Coordinator / Mediator)": { color: "text-cyan-400", border: "border-cyan-500/20", bg: "bg-cyan-500/10" },
  "Supervisor (Supervised Visitation / Exchanges)": { color: "text-purple-400", border: "border-purple-500/20", bg: "bg-purple-500/10" },
  "Advocate (Nonprofit / Community / Victim Advocate)": { color: "text-green-400", border: "border-green-500/20", bg: "bg-green-500/10" },
  "Police / Law Enforcement": { color: "text-red-400",     border: "border-red-500/20",      bg: "bg-red-500/10" },
  "Court Clerk / Administrative": { color: "text-gray-400", border: "border-gray-500/20",   bg: "bg-gray-500/10" },
};

const QUIZ_ROLES = Object.keys(QUIZ_BANK);

const BENEFITS = [
  { icon: Brain, title: "Scenario-Based Learning", desc: "Questions drawn from real high-conflict custody situations — not abstract theory." },
  { icon: Target, title: "Role-Specific", desc: "Each quiz is tailored to the skills and knowledge gaps most common in your role." },
  { icon: Clock, title: "10 Minutes or Less", desc: "Short, focused modules you can complete on a break or between hearings." },
  { icon: Trophy, title: "Actionable Outcomes", desc: "Every wrong answer comes with an explanation and a concrete next step." },
];

export default function QuizPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Toolkit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Skill Builder</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Interactive quizzes that sharpen your documentation, communication, and advocacy skills —
              tailored to your exact role in the family court system.
            </p>
          </div>

          {/* Benefits */}
          <section className="mb-16">
            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-white/[0.02] border border-white/10">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                    <b.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1">{b.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quiz Tracks */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-3">Quiz Tracks</h2>
            <p className="text-gray-500 mb-8">
              {QUIZ_ROLES.length} role-specific tracks · {Object.values(QUIZ_BANK).reduce((acc, qs) => acc + qs.length, 0)} total questions
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {QUIZ_ROLES.map((role) => {
                const config = ROLE_CONFIG[role] ?? { color: "text-gray-400", border: "border-white/10", bg: "bg-white/5" };
                const count = QUIZ_BANK[role].length;
                return (
                  <div
                    key={role}
                    className={`p-5 rounded-xl bg-white/[0.02] border ${config.border} transition-colors`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${config.color}`}>
                          {count} Questions
                        </div>
                        <h3 className="text-sm font-bold text-white leading-snug">{role}</h3>
                      </div>
                      <div className={`w-8 h-8 rounded-lg ${config.bg} ${config.color} flex items-center justify-center shrink-0`}>
                        <Brain className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Sample Question */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">Sample Question</h2>
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-purple-500/20">
              <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-4">
                Documentation & Evidence · Parent Track
              </div>
              <p className="text-base font-semibold text-white mb-6">
                Which detail makes an incident log more credible: feelings, opinions, or time-stamped observations?
              </p>
              <div className="space-y-3 mb-6">
                {["Your feelings about what happened", "Your interpretation of their motives", "Time-stamped observations a camera could verify", "A summary written the next day"].map((opt, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl border text-sm font-medium transition-colors ${
                      i === 2
                        ? "border-purple-500/40 bg-purple-500/10 text-white"
                        : "border-white/10 bg-white/[0.01] text-gray-400"
                    }`}
                  >
                    {String.fromCharCode(65 + i)}. {opt}
                  </div>
                ))}
              </div>
              <div className="p-4 rounded-xl bg-purple-500/5 border border-purple-500/20">
                <div className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-1">Why it matters</div>
                <p className="text-sm text-gray-300">
                  Time-stamped observations create a timeline the court can verify. Feelings and interpretations are subjective and invite challenge — facts stand on their own.
                </p>
              </div>
            </div>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Build Your Skills</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                All quiz tracks are included in your CoTrackPro membership.
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
