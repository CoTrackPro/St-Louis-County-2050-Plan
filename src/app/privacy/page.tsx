import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy & Terms — CoTrackPro",
  description: "CoTrackPro privacy policy, terms of service, and data handling practices.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" /> Home
          </Link>

          <div className="flex items-center gap-3 mb-8">
            <div className="p-2.5 rounded-xl bg-[#0ea5e9]/10 text-[#38bdf8]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-3xl font-extrabold text-white">Privacy & Terms</h1>
          </div>

          <div className="prose prose-invert max-w-none space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-bold text-white mb-3">Not Legal Advice</h2>
              <p className="leading-relaxed">
                CoTrackPro is an educational and organizational platform. Nothing on this platform — including AI-generated content, templates, or checklists — constitutes legal advice. Always consult a licensed attorney for legal strategy specific to your situation.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Privacy Policy</h2>
              <p className="leading-relaxed mb-3">
                We take your privacy seriously. Your case data, logs, and documents belong to you. We do not sell, share, or mine your personal data.
              </p>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>Authentication is handled by Clerk (SOC2 certified)</li>
                <li>Payments are processed by Stripe (PCI-DSS compliant)</li>
                <li>Your vault content is encrypted at rest and in transit</li>
                <li>AI tools process your text to provide responses; data is not retained by the AI provider after processing</li>
                <li>We use Highlight.io for error monitoring; no personally identifiable case data is included</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Terms of Service</h2>
              <ul className="space-y-2 text-sm list-disc pl-5">
                <li>You must be 18 or older to create an account</li>
                <li>You are responsible for the accuracy of information you enter</li>
                <li>CoTrackPro may not be used to harass, intimidate, or build false evidence</li>
                <li>We reserve the right to suspend accounts that violate these terms</li>
                <li>Subscriptions are billed via Stripe and can be cancelled at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Data Deletion</h2>
              <p className="leading-relaxed">
                To request deletion of your account and all associated data, email{" "}
                <a href="mailto:admin@cotrackpro.com" className="text-[#38bdf8] hover:underline">admin@cotrackpro.com</a>{" "}
                with the subject line &quot;Data Deletion Request.&quot; We will process your request within 30 days.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-white mb-3">Contact</h2>
              <p className="leading-relaxed">
                Questions about this policy?{" "}
                <Link href="/contact" className="text-[#38bdf8] hover:underline">Contact us</Link> or email{" "}
                <a href="mailto:admin@cotrackpro.com" className="text-[#38bdf8] hover:underline">admin@cotrackpro.com</a>.
              </p>
            </section>

            <p className="text-xs text-gray-600 border-t border-white/5 pt-6">
              Last updated: March 2026
            </p>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
