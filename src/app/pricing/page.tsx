import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import RolesSection from "@/components/landing/RolesSection";
import { ArrowLeft, Heart, Zap, ArrowRight } from "lucide-react";
import { COACHING_PACKAGES } from "@/data/coaching";

export const metadata: Metadata = {
  title: "Pricing — CoTrackPro",
  description: "Affordable tools for high-conflict custody. Monthly and annual plans for parents and professionals.",
};

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Link>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Membership Plans</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Choose the plan that fits your situation. All plans include full access to the Vault, AI tools, and secure logging.
            </p>
          </div>
        </div>

        {/* Roles + pricing section */}
        <RolesSection />

        {/* 1:1 Coaching */}
        <div className="max-w-7xl mx-auto mb-24">
          <div className="text-center mb-12">
            <div className="inline-flex p-3 rounded-full bg-indigo-500/10 text-indigo-400 mb-6 border border-indigo-500/20">
              <Zap className="w-8 h-8" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">1:1 Strategy Coaching</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Accelerate your results with personalized guidance. Choose a package to work directly with a high-conflict strategist.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACHING_PACKAGES.map((pkg) => (
              <a
                key={pkg.title}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col p-6 rounded-2xl bg-white/[0.02] border ${pkg.border} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group`}
              >
                <div className={`w-12 h-12 rounded-xl ${pkg.bg} ${pkg.color} flex items-center justify-center mb-6`}>
                  <pkg.Icon className="w-6 h-6" />
                </div>
                <div className="mb-4">
                  <div className={`text-xs font-bold uppercase tracking-wider mb-1 ${pkg.color}`}>{pkg.subtitle}</div>
                  <h3 className="text-xl font-bold text-white">{pkg.title}</h3>
                </div>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 w-fit mb-6">
                  {pkg.sessions}
                </span>
                <p className="text-sm text-gray-400 leading-relaxed mb-8 flex-1">{pkg.description}</p>
                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-[#fbbf24] transition-colors mt-auto">
                  Book Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Pay What You Can */}
        <div className="max-w-3xl mx-auto text-center bg-white/[0.03] border border-white/10 rounded-3xl p-8 sm:p-12 relative overflow-hidden mb-12">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex p-3 rounded-full bg-pink-500/10 text-pink-500 mb-6 border border-pink-500/20">
              <Heart className="w-8 h-8 fill-current" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Support Our Mission</h2>
            <p className="text-gray-400 mb-8 leading-relaxed max-w-xl mx-auto">
              We believe safety shouldn&apos;t have a price tag. If our standard plans are out of reach, or if you simply want to help us support families in crisis, please consider a contribution.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-pink-500/20 border border-pink-500/30 text-pink-400 font-bold hover:bg-pink-500/30 transition-all"
            >
              <Heart className="w-4 h-4" />
              Pay What You Can
            </a>
            <p className="text-xs text-gray-500 mt-4">Reach out — we&apos;ll work with you.</p>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
