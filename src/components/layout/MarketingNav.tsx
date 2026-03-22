"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { useScrolled } from "@/hooks/useScrolled";
import { useClickOutside } from "@/hooks/useClickOutside";
import { NAV } from "@/data/nav";
import type { NavCategory } from "@/data/nav";

// ─── Shared dropdown item renderer ──────────────────────────────────────────

function DropdownItem({
  item,
  compact = false,
  onClick,
}: {
  item: NonNullable<NavCategory["items"]>[number];
  compact?: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <>
      {item.icon && (
        <item.icon
          className={`w-4 h-4 shrink-0 ${compact ? "" : "mt-0.5"} ${item.color ?? ""}`}
        />
      )}
      <div>
        <div className="flex items-center gap-2">
          <span
            className={`${
              compact ? "text-sm text-gray-400" : "text-sm font-medium text-white"
            }`}
          >
            {item.label}
          </span>
          {item.badge && (
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-400">
              {item.badge}
            </span>
          )}
        </div>
        {!compact && item.description && (
          <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>
        )}
      </div>
    </>
  );

  const baseClass = compact
    ? "flex items-center gap-3 px-4 py-2.5 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
    : "flex items-start gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors";

  return item.external ? (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className={baseClass}
      onClick={onClick}
    >
      {inner}
    </a>
  ) : (
    <Link href={item.href} className={baseClass} onClick={onClick}>
      {inner}
    </Link>
  );
}

// ─── Main component ──────────────────────────────────────────────────────────

export default function MarketingNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDD, setActiveDD]     = useState<string | null>(null);

  const scrolled = useScrolled(20);
  // Close all on route change
  usePathname(); // consumed solely to trigger re-render on navigation

  const closeAll  = useCallback(() => { setActiveDD(null); setMobileOpen(false); }, []);
  const navRef    = useClickOutside<HTMLDivElement>(() => setActiveDD(null));

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
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group" onClick={closeAll}>
          <Image
            src="https://assets.cotrackpro.com/CoTrackPro%2BLogo.jpg"
            alt="CoTrackPro"
            width={32}
            height={32}
            className="rounded-lg object-cover"
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
                  aria-expanded={activeDD === cat.id}
                  aria-haspopup="true"
                  className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors rounded-xl hover:bg-white/5"
                >
                  {cat.label}
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      activeDD === cat.id ? "rotate-180" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                {activeDD === cat.id && (
                  <div
                    onMouseLeave={() => setActiveDD(null)}
                    className="absolute top-full left-0 mt-2 w-64 bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                  >
                    <div className="p-2">
                      {cat.items?.map((item) => (
                        <DropdownItem
                          key={item.label}
                          item={item}
                          onClick={() => setActiveDD(null)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ),
          )}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <Link
            href="/sign-in"
            className="text-sm font-medium text-gray-300 hover:text-white px-4 py-2 rounded-xl hover:bg-white/5 transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-bold text-white px-5 py-2 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all"
          >
            Get Access
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0f1e]/98 backdrop-blur-xl border-t border-white/5 max-h-[80vh] overflow-y-auto">
          <div className="px-4 py-6 space-y-1">
            {NAV.map((cat) =>
              cat.type === "link" ? (
                <Link
                  key={cat.id}
                  href={cat.href!}
                  onClick={closeAll}
                  className="block px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                >
                  {cat.label}
                </Link>
              ) : (
                <div key={cat.id}>
                  <button
                    onClick={() => setActiveDD(activeDD === cat.id ? null : cat.id)}
                    aria-expanded={activeDD === cat.id}
                    aria-haspopup="true"
                    className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                  >
                    {cat.label}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${
                        activeDD === cat.id ? "rotate-180" : ""
                      }`}
                      aria-hidden="true"
                    />
                  </button>
                  {activeDD === cat.id && (
                    <div className="ml-4 mt-1 space-y-0.5">
                      {cat.items?.map((item) => (
                        <DropdownItem
                          key={item.label}
                          item={item}
                          compact
                          onClick={closeAll}
                        />
                      ))}
                    </div>
                  )}
                </div>
              ),
            )}

            <div className="pt-4 border-t border-white/5 flex flex-col gap-2">
              <Link
                href="/sign-in"
                onClick={closeAll}
                className="block text-center py-3 text-sm font-medium text-gray-300 border border-white/10 rounded-xl hover:bg-white/5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/pricing"
                onClick={closeAll}
                className="block text-center py-3 text-sm font-bold text-white bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] rounded-xl"
              >
                Get Access
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
