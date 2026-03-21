import type { Metadata } from "next";
import Link from "next/link";
import MarketingNav from "@/components/layout/MarketingNav";
import MarketingFooter from "@/components/layout/MarketingFooter";
import { ArrowLeft, Mail, Calendar, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — CoTrackPro",
  description: "Get in touch with the CoTrackPro team for support, partnerships, or press inquiries.",
};

const CONTACT_OPTIONS = [
  {
    icon: Mail,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    title: "Email Support",
    desc: "General questions, billing, or technical issues.",
    action: "Send Email",
    href: "mailto:admin@cotrackpro.com",
  },
  {
    icon: Calendar,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Book a Strategy Call",
    desc: "Talk to a high-conflict strategist directly.",
    action: "Book Now",
    href: "https://calendly.com/dougdevitre/individual-session-1-1-zoom",
  },
  {
    icon: MessageCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Partnership Inquiry",
    desc: "Agencies, courts, legal organizations — let&apos;s talk.",
    action: "Partner With Us",
    href: "/partner",
  },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      <MarketingNav />

      <main className="pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="inline-flex items-center gap-2 text-[#fbbf24] hover:text-[#f59e0b] font-bold mb-8 transition-all hover:-translate-x-1">
            <ArrowLeft className="w-5 h-5" /> Home
          </Link>

          <div className="text-center mb-12">
            <h1 className="text-4xl font-extrabold text-white mb-4">Get in Touch</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              We&apos;re here to help. Choose the best way to reach us below.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5 mb-12">
            {CONTACT_OPTIONS.map((opt) => (
              <a
                key={opt.title}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className={`flex flex-col p-6 rounded-2xl bg-white/[0.02] border ${opt.border} hover:bg-white/[0.04] hover:-translate-y-1 transition-all group`}
              >
                <div className={`w-10 h-10 rounded-xl ${opt.bg} ${opt.color} flex items-center justify-center mb-4`}>
                  <opt.icon className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-white mb-2">{opt.title}</h3>
                <p className="text-sm text-gray-400 mb-4 flex-1">{opt.desc}</p>
                <span className={`text-sm font-semibold ${opt.color} group-hover:underline`}>{opt.action} →</span>
              </a>
            ))}
          </div>

          <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-8 text-center">
            <p className="text-gray-400 text-sm mb-2">Direct email</p>
            <a href="mailto:admin@cotrackpro.com" className="text-xl font-bold text-white hover:text-[#38bdf8] transition-colors">
              admin@cotrackpro.com
            </a>
            <p className="text-gray-500 text-xs mt-3">We respond within 1 business day.</p>
          </div>
        </div>
      </main>

      <MarketingFooter />
    </div>
  );
}
