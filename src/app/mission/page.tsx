import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { ArrowLeft, Heart } from "lucide-react";
import { VALUES } from "@/data/mission";

export const metadata: Metadata = {
  title: "Our Mission — CoTrackPro",
  description: "Why CoTrackPro exists — a child-centered platform built to protect families navigating high-conflict situations.",
};

export default function MissionPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" /> Home
          </Link>

          {/* Hero */}
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#38bdf8] text-sm font-semibold mb-6">
              <Heart className="w-4 h-4" /> Our Mission
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Why CoTrackPro Exists
            </h1>
            <p className="text-xl text-gray-300 leading-relaxed max-w-3xl mb-6">
              Children caught in high-conflict custody battles are among the most vulnerable people in the legal system. They didn&apos;t choose the conflict. They shouldn&apos;t pay the price for it.
            </p>
            <p className="text-gray-400 leading-relaxed max-w-3xl">
              CoTrackPro was built because the tools didn&apos;t exist. Protective parents were drowning in scattered text messages and inconsistent documentation. Attorneys were wasting billable hours untangling chaos that could have been organized. Court systems were making decisions on incomplete records. We decided to fix that.
            </p>
          </div>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8">What We Stand For</h2>
            <div className="grid sm:grid-cols-2 gap-5">
              {VALUES.map((v) => (
                <div key={v.title} className={`p-6 rounded-2xl bg-white/[0.02] border ${v.border} hover:border-opacity-50 transition-all`}>
                  <div className={`w-10 h-10 rounded-xl ${v.bg} ${v.color} flex items-center justify-center mb-4`}>
                    <v.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Story */}
          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 sm:p-12 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">The Story Behind CoTrackPro</h2>
            <div className="space-y-4 text-gray-400 leading-relaxed">
              <p>
                CoTrackPro grew out of direct experience with the family court system — watching well-intentioned people fail not because they lacked evidence, but because they lacked structure. The chaos of co-parenting under conflict is real, and it&apos;s expensive in every sense of the word.
              </p>
              <p>
                We built the tools we wished existed: a vault of resources, AI-powered communication tools that strip out emotion, documentation logs that hold up in court, and learning modules that teach people to think clearly under pressure.
              </p>
              <p>
                The mission is simple: <strong className="text-white">every child deserves to be protected by people who know what they&apos;re doing.</strong> CoTrackPro helps make that possible.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link href="/pricing" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1">
              Start Protecting Your Family
            </Link>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
