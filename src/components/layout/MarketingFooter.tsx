"use client";

import Link from "next/link";
import { Mail, Linkedin, Instagram, Youtube, Facebook, Twitter, ShieldCheck } from "lucide-react";

const TikTok = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

const SOCIAL = [
  { href: "mailto:admin@cotrackpro.com",                    icon: Mail,      label: "Email" },
  { href: "https://linkedin.com/company/cotrackpro",        icon: Linkedin,  label: "LinkedIn" },
  { href: "https://instagram.com/cotrackpro",               icon: Instagram, label: "Instagram" },
  { href: "https://youtube.com/@cotrackpro",                icon: Youtube,   label: "YouTube" },
  { href: "https://facebook.com/cotrackpro",                icon: Facebook,  label: "Facebook" },
  { href: "https://twitter.com/cotrackpro",                 icon: Twitter,   label: "X / Twitter" },
  { href: "https://tiktok.com/@cotrackpro",                 icon: TikTok,    label: "TikTok" },
];

const COLS = [
  {
    heading: "Platform",
    links: [
      { label: "The Vault",     href: "/vault" },
      { label: "Skill Builder", href: "/quiz" },
      { label: "Advocacy",      href: "/scripts" },
      { label: "Get Social",    href: "/social" },
      { label: "Open Letter",   href: "/letter" },
    ],
  },
  {
    heading: "For Families",
    links: [
      { label: "Co-Parents",        href: "/roles/high-conflict-co-parents" },
      { label: "Survivors",         href: "/roles/survivors" },
      { label: "Pro-Se Litigants",  href: "/roles/pro-se" },
      { label: "Alienated Parents", href: "/roles/alienated-parents" },
    ],
  },
  {
    heading: "Professionals",
    links: [
      { label: "Attorneys",   href: "/roles/attorneys" },
      { label: "Judges",      href: "/roles/judges" },
      { label: "GALs",        href: "/roles/gals" },
      { label: "Therapists",  href: "/roles/therapists" },
      { label: "Mediators",   href: "/roles/mediators" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Mission",  href: "/mission" },
      { label: "Pricing",  href: "/pricing" },
      { label: "FAQ",      href: "/faq" },
      { label: "Contact",  href: "/contact" },
      { label: "Partner",  href: "/partner" },
      { label: "Privacy & Terms", href: "/privacy" },
    ],
  },
];

export default function MarketingFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0f1e] border-t border-white/5 pt-16 pb-8 overflow-hidden">
      {/* Subtle gradient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[#0ea5e9]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Newsletter strip */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-8 md:p-10 mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#0ea5e9]/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
            <div className="max-w-lg">
              <h3 className="text-2xl font-bold text-white mb-2">Free weekly tips for high-conflict families</h3>
              <p className="text-gray-400 text-sm">Practical strategies, templates, and updates — delivered every Tuesday.</p>
            </div>
            <a
              href="https://mailchi.mp/2ed059283bd7/signup"
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white font-bold hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
            >
              <Mail className="w-4 h-4" />
              Subscribe Free
            </a>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand col */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <img src="https://assets.cotrackpro.com/CoTrackPro%2BLogo.jpg" alt="CoTrackPro" className="w-8 h-8 rounded-lg object-cover" />
              <span className="font-bold text-white group-hover:text-[#38bdf8] transition-colors">CoTrackPro</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed mb-4">Child-centered tools for high-conflict families and professionals.</p>
            <div className="flex flex-wrap gap-2">
              {SOCIAL.map(({ href, icon: Icon, label }) => (
                <a key={label} href={href} target={href.startsWith("mailto") ? undefined : "_blank"} rel="noopener noreferrer" aria-label={label}
                  className="p-2 rounded-full bg-white/5 hover:bg-[#0ea5e9] text-gray-400 hover:text-white border border-white/5 hover:border-[#0ea5e9] transition-all">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Link cols */}
          {COLS.map((col) => (
            <div key={col.heading}>
              <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">{col.heading}</h4>
              <ul className="space-y-2">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm text-gray-400 hover:text-[#38bdf8] transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0ea5e9]" />
            <span>© {year} CoTrackPro. Not legal advice. All rights reserved.</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy</Link>
            <Link href="/privacy" className="hover:text-gray-400 transition-colors">Terms</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
