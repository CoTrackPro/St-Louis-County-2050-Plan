import type { Metadata } from "next";
import Link from "next/link";
import dynamic from "next/dynamic";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import StickyCTA from "@/components/layout/StickyCTA";
import Hero from "@/components/landing/Hero";
import ImpactMetrics from "@/components/landing/ImpactMetrics";
import WhyThisExists from "@/components/landing/WhyThisExists";
import { NEWSLETTER_URL } from "@/data/billing";

// Defer heavy below-the-fold client components so the hero paints first.
// SSR is preserved (ssr: true) for SEO; the skeleton prevents layout shift.
const RolesSection  = dynamic(() => import("@/components/landing/RolesSection"),  { ssr: true });
const Testimonials  = dynamic(() => import("@/components/landing/Testimonials"),  { ssr: true });
const FAQSection    = dynamic(() => import("@/components/landing/FAQSection"),    { ssr: true });

export const metadata: Metadata = {
  title: "CoTrackPro — Protect What Matters",
  description:
    "Child-centered toolkits for high-conflict families and family-law professionals. Evidence logs, BIFF templates, AI tools, and more.",
  openGraph: {
    title: "CoTrackPro — Protect What Matters",
    description: "Child-centered toolkits for high-conflict families and professionals.",
    url: "https://cotrackpro.com",
    siteName: "CoTrackPro",
    images: [{ url: "https://assets.cotrackpro.com/CoTrackPro%2BLogo.jpg" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoTrackPro",
    description: "Protect What Matters.",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main>
        {/* Above-the-fold: statically imported for fastest initial render */}
        <Hero />
        <ImpactMetrics />
        <WhyThisExists />

        {/* Below-the-fold: dynamically imported to defer JS parsing */}
        <RolesSection />
        <Testimonials />
        <FAQSection />

        {/* Final CTA */}
        <section className="py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0ea5e9]/10 border border-[#0ea5e9]/20 text-[#38bdf8] text-sm font-semibold mb-8">
              <span className="w-2 h-2 rounded-full bg-[#0ea5e9] animate-pulse" aria-hidden="true" />
              Start Today
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
              Your child&apos;s safety can&apos;t wait.
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Join thousands of parents and professionals using CoTrackPro to protect children
              and reduce conflict in family courts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/pricing"
                className="px-8 py-4 rounded-2xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(14,165,233,0.4)] transition-all transform hover:-translate-y-1"
              >
                Get Access Now
              </Link>
              <a
                href={NEWSLETTER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 rounded-2xl border border-white/10 bg-white/5 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/20 transition-all transform hover:-translate-y-1"
              >
                Free Weekly Tips
              </a>
            </div>
          </div>
        </section>
      </main>

      <MarketingFooter />
      <StickyCTA />
    </div>
  );
}
