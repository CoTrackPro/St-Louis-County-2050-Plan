import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import FAQSection from "@/components/landing/FAQSection";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ — CoTrackPro",
  description: "Common questions about CoTrackPro — how it works, billing, and how the AI tools protect your privacy.",
};

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" /> Home
          </Link>
        </div>
        <FAQSection />
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm mb-4">Still have questions?</p>
          <Link href="/contact" className="text-[#38bdf8] hover:text-[#7dd3fc] font-medium transition-colors">
            Contact us →
          </Link>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
