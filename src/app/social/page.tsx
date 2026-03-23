import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Megaphone, Image, Share2, Download } from "lucide-react";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";

export const metadata: Metadata = {
  title: "Get Social — CoTrackPro",
  description: "Generate shareable social media images and advocacy graphics for awareness campaigns.",
};

const ASSET_TYPES = [
  {
    icon: Image,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    title: "Awareness Graphics",
    desc: "Bold, shareable images that educate your network about high-conflict family dynamics, coercive control, and children's rights.",
    formats: ["Instagram Post", "Story", "Facebook Cover"],
  },
  {
    icon: Share2,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    title: "Advocacy Quote Cards",
    desc: "Turn powerful statistics, policy statements, or personal truths into impactful quote graphics ready to share.",
    formats: ["Twitter/X Card", "LinkedIn Post", "Pinterest"],
  },
  {
    icon: Megaphone,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    title: "Campaign Assets",
    desc: "Coordinated multi-image sets for awareness months, reform campaigns, and community mobilization efforts.",
    formats: ["Carousel Sets", "Event Flyers", "Email Headers"],
  },
  {
    icon: Download,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/20",
    title: "Resource Cards",
    desc: "Professional-looking cards that share CoTrackPro tools, tips, and resources with parents and professionals in your network.",
    formats: ["Resource Lists", "How-To Guides", "Fact Sheets"],
  },
];

const FEATURES = [
  "No design experience needed — templates handle the layout",
  "Brand-consistent styles aligned with CoTrackPro identity",
  "Customizable text, colors, and fonts",
  "High-resolution downloads for print and digital",
  "Role-specific content for parents, professionals, and advocates",
  "Trauma-informed messaging review before export",
];

export default function SocialPage() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-xs font-semibold uppercase tracking-wider mb-6">
              Toolkit
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Get Social</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Create powerful, shareable graphics that amplify awareness, advocate for reform,
              and connect your community — no design skills required.
            </p>
          </div>

          {/* Asset Types */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">What You Can Create</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {ASSET_TYPES.map((t) => (
                <div
                  key={t.title}
                  className={`p-6 rounded-2xl bg-white/[0.02] border ${t.border} transition-colors`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-10 h-10 rounded-xl ${t.bg} ${t.color} flex items-center justify-center shrink-0`}>
                      <t.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white mb-1">{t.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{t.desc}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {t.formats.map((f) => (
                      <span
                        key={f}
                        className="text-xs px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-400"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Features */}
          <section className="mb-16 p-8 rounded-2xl bg-white/[0.02] border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">Built for Impact</h2>
            <ul className="grid sm:grid-cols-2 gap-3">
              {FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                  <span className="text-pink-400 mt-0.5 shrink-0">›</span>
                  {f}
                </li>
              ))}
            </ul>
          </section>

          {/* CTA */}
          <div className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-3">Start Creating</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                The Social Image Generator is included in every CoTrackPro membership.
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_24px_rgba(14,165,233,0.4)] transition-all"
              >
                Get Access
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
