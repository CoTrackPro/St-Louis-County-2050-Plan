import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CheckCircle, Download, Zap } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { ROLE_DETAILS } from "@/data/roles";
import type { RoleDetailContent } from "@/data/types";

// ── Slug → ROLE_DETAILS key mapping ─────────────────────────────────────────

const SLUG_MAP: Record<string, string> = {
  "high-conflict-co-parents": "High-Conflict Co-parents",
  "survivors": "Survivors of Coercive Control",
  "pro-se": "Pro-Se Litigants",
  "alienated-parents": "Alienated Parents",
  "attorneys": "Family Law Attorneys",
  "judges": "Family Court Judges",
  "gals": "Guardians ad Litem",
  "therapists": "Therapists",
  "mediators": "Mediators",
  "advocates": "Victim Advocates",
  "police": "Police",
};

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return Object.keys(SLUG_MAP).map((slug) => ({ slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = SLUG_MAP[slug];
  const role = key ? ROLE_DETAILS[key] : null;
  if (!role) return { title: "Not Found" };
  return {
    title: `${role.title} — CoTrackPro`,
    description: role.heroSubheadline,
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function RolePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const key = SLUG_MAP[slug];
  const role: RoleDetailContent | undefined = key ? ROLE_DETAILS[key] : undefined;

  if (!role) notFound();

  const isSubscription = role.ctaConfig.type === "subscription";

  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4 md:px-8">
        <div className="max-w-5xl mx-auto">

          {/* Back */}
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
              {role.title}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              {role.heroHeadline}
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              {role.heroSubheadline}
            </p>

            {/* Stats */}
            {role.stats && role.stats.length > 0 && (
              <div className="flex flex-wrap gap-8 mt-10">
                {role.stats.map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-bold text-[#38bdf8]">{stat.value}</div>
                    <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pain Points */}
          {role.painPoints.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">What We Solve</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {role.painPoints.map((pt, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-[#0ea5e9]/30 transition-colors"
                  >
                    <div className="text-sm font-medium text-red-400 mb-3 leading-snug">
                      {pt.problem}
                    </div>
                    <div className="text-sm text-gray-300 leading-relaxed">
                      <span className="text-[#38bdf8] font-semibold">Solution: </span>
                      {pt.solution}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Features */}
          {role.keyFeatures.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {role.keyFeatures.map((feature) => (
                  <div
                    key={feature.title}
                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0ea5e9]/10 text-[#38bdf8] flex items-center justify-center mb-4">
                      <feature.icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Workstreams */}
          {role.workstreams && role.workstreams.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Workflows</h2>
              <div className="space-y-4">
                {role.workstreams.map((ws) => (
                  <div
                    key={ws.id}
                    className="flex gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#0ea5e9]/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#0ea5e9]/10 text-[#38bdf8] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">{ws.title}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500">
                          Trigger: {ws.trigger}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400 leading-relaxed">{ws.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Artifacts */}
          {role.artifacts && role.artifacts.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Deliverables</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {role.artifacts.map((art) => (
                  <a
                    key={art.name}
                    href={art.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#0ea5e9]/30 transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-[#0ea5e9]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                      <Download className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-[#38bdf8] transition-colors truncate">
                        {art.name}
                      </div>
                      <div className="text-xs text-gray-500">{art.category}</div>
                    </div>
                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-[#38bdf8] group-hover:translate-x-1 transition-all shrink-0" />
                  </a>
                ))}
              </div>
            </section>
          )}

          {/* Testimonial */}
          {role.testimonial && (
            <section className="mb-16">
              <blockquote className="p-8 rounded-2xl bg-white/[0.03] border border-white/10 relative">
                <div className="absolute top-6 left-8 text-6xl text-[#0ea5e9]/20 font-serif leading-none select-none">
                  &ldquo;
                </div>
                <p className="text-lg text-gray-300 leading-relaxed italic relative z-10 pl-4">
                  {role.testimonial.quote}
                </p>
                <footer className="mt-4 pl-4">
                  <div className="text-sm font-bold text-white">{role.testimonial.author}</div>
                  <div className="text-xs text-gray-500">{role.testimonial.role}</div>
                </footer>
              </blockquote>
            </section>
          )}

          {/* FAQs */}
          {role.faqs && role.faqs.length > 0 && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-8">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {role.faqs.map((faq, i) => (
                  <div key={i} className="p-6 rounded-xl bg-white/[0.02] border border-white/10">
                    <h3 className="text-sm font-bold text-white mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Starter Kit */}
          {role.starterKit && (
            <section className="mb-16">
              <a
                href={role.starterKit.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl bg-[#0ea5e9]/5 border border-[#0ea5e9]/20 hover:border-[#0ea5e9]/40 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-[#0ea5e9]/10 text-[#38bdf8] flex items-center justify-center shrink-0">
                  <Download className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <div className="text-xs font-bold uppercase tracking-wider text-[#38bdf8] mb-1">
                    Free Starter Kit
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                    {role.starterKit.title}
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-[#38bdf8] group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </section>
          )}

          {/* Claude Skill */}
          {role.claudeSkill && (
            <section className="mb-16">
              <h2 className="text-2xl font-bold text-white mb-6">AI-Powered Skill</h2>
              <a
                href={role.claudeSkill.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all group"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={role.claudeSkill.image}
                  alt="Claude AI"
                  className="w-12 h-12 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-3.5 h-3.5 text-indigo-400" />
                    <div className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                      Claude Skill
                    </div>
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {role.claudeSkill.name}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{role.claudeSkill.description}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-indigo-400 group-hover:translate-x-1 transition-transform shrink-0" />
              </a>
            </section>
          )}

          {/* CTA */}
          <section className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#0ea5e9]/5 to-indigo-500/5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-3xl font-bold text-white mb-4">{role.closingCta}</h2>
              {isSubscription ? (
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                  {role.ctaConfig.monthlyUrl && (
                    <a
                      href={role.ctaConfig.monthlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-2xl border border-white/20 text-white font-bold hover:bg-white/10 transition-all"
                    >
                      Monthly Plan
                    </a>
                  )}
                  {role.ctaConfig.yearlyUrl && (
                    <a
                      href={role.ctaConfig.yearlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-3 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] transition-all"
                    >
                      Yearly Plan — Best Value
                    </a>
                  )}
                </div>
              ) : (
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] transition-all"
                >
                  Contact for {role.ctaConfig.label}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
              {role.ctaConfig.priceLabel && (
                <p className="text-xs text-gray-500 mt-4">{role.ctaConfig.priceLabel}</p>
              )}
            </div>
          </section>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
