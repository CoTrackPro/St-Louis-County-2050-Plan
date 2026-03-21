"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu, X, ChevronDown,
  Shield, Brain, Megaphone, MessageCircle,
  Users, HeartHandshake, Gavel,
  Briefcase, Landmark,
  Stethoscope, ClipboardList,
  Search, Siren, PenTool, Headphones,
} from "lucide-react";

type NavItem = {
  label: string;
  description?: string;
  icon?: React.FC<{ className?: string }>;
  href: string;
  badge?: string;
  color?: string;
  external?: boolean;
};

type NavCategory = {
  id: string;
  label: string;
  type: "dropdown" | "link";
  href?: string;
  items?: NavItem[];
};

const NAV: NavCategory[] = [
  {
    id: "parents",
    label: "For Parents",
    type: "dropdown",
    items: [
      { label: "Co-Parents",  description: "High-Conflict Strategy",  icon: Users,          href: "/roles/high-conflict-co-parents",      color: "text-indigo-400" },
      { label: "Survivors",   description: "Safety & Documentation",  icon: Shield,         href: "/roles/survivors",                    color: "text-orange-400" },
      { label: "Pro-Se",      description: "Self-Represented",        icon: Gavel,          href: "/roles/pro-se",                       color: "text-blue-400" },
      { label: "Targeted",    description: "Alienation Support",      icon: HeartHandshake, href: "/roles/alienated-parents",            color: "text-red-400" },
    ],
  },
  {
    id: "professionals",
    label: "Professionals",
    type: "dropdown",
    items: [
      { label: "Attorneys",  icon: Briefcase,      href: "/roles/attorneys",   color: "text-[#38bdf8]" },
      { label: "Judges",     icon: Landmark,       href: "/roles/judges",      color: "text-yellow-400" },
      { label: "GALs",       icon: Search,         href: "/roles/gals",        color: "text-blue-400" },
      { label: "Therapists", icon: Stethoscope,    href: "/roles/therapists",  color: "text-pink-400" },
      { label: "Mediators",  icon: HeartHandshake, href: "/roles/mediators",   color: "text-cyan-400" },
      { label: "Advocates",  icon: Shield,         href: "/roles/advocates",   color: "text-green-400" },
      { label: "Police",     icon: Siren,          href: "/roles/police",      color: "text-red-500" },
    ],
  },
  {
    id: "toolkits",
    label: "Toolkits",
    type: "dropdown",
    items: [
      { label: "The Vault",     description: "Directory of Apps",    icon: Shield,        href: "/vault",    color: "text-[#38bdf8]" },
      { label: "Advocacy",      description: "Scripts & Docs",       icon: MessageCircle, href: "/scripts",  color: "text-indigo-400" },
      { label: "Open Letter",   description: "Public Advocacy",      icon: PenTool,       href: "/letter",   badge: "NEW", color: "text-teal-400" },
      { label: "Get Social",    description: "Image Generator",      icon: Megaphone,     href: "/social",   color: "text-pink-400" },
      { label: "Skill Builder", description: "Interactive Quizzes",  icon: Brain,         href: "/quiz",     color: "text-purple-400" },
      { label: "Podcast",       description: "Audio Strategy",       icon: Headphones,    href: "https://open.spotify.com/show/4oMoQvEqw9g3ofsCJd92Qf", color: "text-green-400", external: true },
    ],
  },
  { id: "mission",  label: "Mission",  type: "link", href: "/mission" },
  { id: "pricing",  label: "Pricing",  type: "link", href: "/pricing" },
];

export default function MarketingNav() {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD]     = useState<string | null>(null);
  const navRef                      = useRef<HTMLDivElement>(null);
  const pathname                    = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setActiveDD(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => { setMobileOpen(false); setActiveDD(null); }, [pathname]);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0f1e]/95 backdrop-blur-xl border-b border-white/5 shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <img
            src="https://assets.cotrackpro.com/CoTrackPro%2BLogo.jpg"
            alt="CoTrackPro"
            className="w-8 h-8 rounded-lg object-cover"
          />
          <span className="font-bold text-white text-lg tracking-tight group-hover:text-[#38bdf8] transition-colors">
            CoTrackPro
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map((cat) =>
            cat.type === "link" ? (
              <Link
                key={cat.id}
                href={cat.href!}
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
              >
                {cat.label}
              </Link>
            ) : (
              <div key={cat.id} className="relative">
                <button
                  onMouseEnter={() => setActiveDD(cat.id)}
                  onClick={() => setActiveDD(activeDD === cat.id ? null : cat.id)}
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                >
                  {cat.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDD === cat.id ? "rotate-180" : ""}`} />
                </button>

                {activeDD === cat.id && (
                  <div
                    onMouseLeave={() => setActiveDD(null)}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {cat.items?.map((item) =>
                        item.external ? (
                          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                            {item.icon && <item.icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.color}`} />}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{item.label}</span>
                                {item.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400">{item.badge}</span>}
                              </div>
                              {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                            </div>
                          </a>
                        ) : (
                          <Link key={item.label} href={item.href}
                            className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors">
                            {item.icon && <item.icon className={`w-4 h-4 mt-0.5 shrink-0 ${item.color}`} />}
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-white">{item.label}</span>
                                {item.badge && <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400">{item.badge}</span>}
                              </div>
                              {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          )}
        </div>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link href="/sign-in" className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-colors">
            Sign In
          </Link>
          <Link href="/pricing" className="text-sm font-bold text-white px-5 py-2 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all">
            Get Access
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden p-2 text-gray-400 hover:text-white" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0f1e]/98 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {NAV.map((cat) =>
              cat.type === "link" ? (
                <Link key={cat.id} href={cat.href!} className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">
                  {cat.label}
                </Link>
              ) : (
                <div key={cat.id}>
                  <button onClick={() => setActiveDD(activeDD === cat.id ? null : cat.id)}
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl">
                    {cat.label}
                    <ChevronDown className={`w-4 h-4 transition-transform ${activeDD === cat.id ? "rotate-180" : ""}`} />
                  </button>
                  {activeDD === cat.id && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {cat.items?.map((item) =>
                        item.external ? (
                          <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
                            {item.icon && <item.icon className={`w-4 h-4 ${item.color}`} />}
                            {item.label}
                          </a>
                        ) : (
                          <Link key={item.label} href={item.href}
                            className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl">
                            {item.icon && <item.icon className={`w-4 h-4 ${item.color}`} />}
                            {item.label}
                          </Link>
                        )
                      )}
                    </div>
                  )}
                </div>
              )
            )}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <Link href="/sign-in" className="block text-center py-3 text-sm font-medium text-gray-300 border border-white/10 rounded-xl hover:bg-white/5">Sign In</Link>
              <Link href="/pricing" className="block text-center py-3 text-sm font-bold text-white bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] rounded-xl">Get Access</Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
