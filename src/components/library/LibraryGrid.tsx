"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FileText, Play, Headphones, BookOpen,
  Lock, Download, ExternalLink, ArrowRight,
  Clock, BookMarked,
} from "lucide-react";
import { LIBRARY, canAccess } from "@/data/library";
import type { ContentType, LibraryItem } from "@/data/library";

// ── Tab config ────────────────────────────────────────────────────────────────

const TABS: { id: ContentType; label: string; icon: React.FC<{ className?: string }> }[] = [
  { id: "slides", label: "Slides",  icon: FileText   },
  { id: "video",  label: "Videos",  icon: Play       },
  { id: "audio",  label: "Audio",   icon: Headphones },
  { id: "guide",  label: "Guides",  icon: BookOpen   },
];

// ── Type-specific config ──────────────────────────────────────────────────────

const TYPE_CONFIG: Record<
  ContentType,
  { color: string; bg: string; border: string; actionLabel: string; isExternal?: boolean }
> = {
  slides: { color: "text-[#38bdf8]",  bg: "bg-[#0ea5e9]/10",  border: "border-[#0ea5e9]/20",  actionLabel: "View Slides" },
  video:  { color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", actionLabel: "Watch" },
  audio:  { color: "text-teal-400",   bg: "bg-teal-500/10",   border: "border-teal-500/20",   actionLabel: "Listen", isExternal: true },
  guide:  { color: "text-amber-400",  bg: "bg-amber-500/10",  border: "border-amber-500/20",  actionLabel: "Download PDF" },
};

const TYPE_META_ICON: Record<ContentType, React.FC<{ className?: string }>> = {
  slides: BookMarked,
  video:  Clock,
  audio:  Clock,
  guide:  BookMarked,
};

function metaLabel(item: LibraryItem): string {
  if (item.duration) return item.duration;
  if (item.pages)    return `${item.pages} ${item.type === "slides" ? "slides" : "pages"}`;
  return "";
}

// ── Locked card overlay ───────────────────────────────────────────────────────

function LockedOverlay({ itemTier }: { itemTier: "parent" | "professional" }) {
  const label = itemTier === "professional" ? "Professional Plan" : "Parent Plan";
  return (
    <div className="absolute inset-0 rounded-2xl flex flex-col items-center justify-center gap-3 bg-[#0a0f1e]/80 backdrop-blur-[2px] z-10">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
        <Lock className="w-5 h-5 text-white/60" />
      </div>
      <p className="text-xs font-semibold text-white/60">Requires {label}</p>
      <Link
        href="/billing"
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white text-xs font-bold hover:shadow-[0_0_16px_rgba(14,165,233,0.35)] transition-all"
      >
        Upgrade <ArrowRight className="w-3 h-3" />
      </Link>
    </div>
  );
}

// ── Single card ───────────────────────────────────────────────────────────────

function LibraryCard({ item, accessible }: { item: LibraryItem; accessible: boolean }) {
  const cfg  = TYPE_CONFIG[item.type];
  const Icon = TABS.find((t) => t.id === item.type)!.icon;
  const MetaIcon = TYPE_META_ICON[item.type];
  const meta = metaLabel(item);
  const isExternal = item.type === "audio";

  return (
    <div className={`relative rounded-2xl bg-white/[0.02] border ${accessible ? cfg.border : "border-white/10"} flex flex-col overflow-hidden transition-colors ${accessible ? "hover:border-opacity-60" : ""}`}>
      {/* Locked overlay */}
      {!accessible && item.tier !== "free" && (
        <LockedOverlay itemTier={item.tier as "parent" | "professional"} />
      )}

      <div className={`p-6 flex flex-col flex-1 ${!accessible ? "opacity-40 select-none pointer-events-none" : ""}`}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className={`w-10 h-10 rounded-xl ${cfg.bg} ${cfg.color} flex items-center justify-center shrink-0`}>
            <Icon className="w-5 h-5" />
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-end">
            {item.isNew && (
              <span className="px-2 py-0.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-[10px] font-bold uppercase tracking-wider">
                New
              </span>
            )}
            {meta && (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[10px] font-medium">
                <MetaIcon className="w-2.5 h-2.5" />
                {meta}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-sm font-bold text-white mb-2 leading-snug">{item.title}</h3>
        <p className="text-xs text-gray-400 leading-relaxed flex-1 mb-4">{item.description}</p>

        {/* Role chips */}
        {item.roles && item.roles.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {item.roles.map((r) => (
              <span
                key={r}
                className="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-gray-500 text-[10px]"
              >
                {r}
              </span>
            ))}
          </div>
        )}

        {/* Action */}
        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 text-xs font-bold transition-colors mt-auto ${cfg.color} hover:text-white`}
        >
          {item.type === "guide" ? (
            <Download className="w-3.5 h-3.5" />
          ) : isExternal ? (
            <ExternalLink className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5" />
          )}
          {cfg.actionLabel}
        </a>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface LibraryGridProps {
  userTier: string | null;
}

export default function LibraryGrid({ userTier }: LibraryGridProps) {
  const [activeTab, setActiveTab] = useState<ContentType>("slides");

  const items = LIBRARY.filter((item) => item.type === activeTab);

  return (
    <div>
      {/* Tier badge */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <p className="text-gray-500 text-sm">
          {LIBRARY.length} resources across slides, videos, audio, and guides
        </p>
        {userTier ? (
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
            userTier === "professional"
              ? "bg-[#0ea5e9]/10 border-[#0ea5e9]/30 text-[#38bdf8]"
              : "bg-indigo-500/10 border-indigo-500/30 text-indigo-400"
          }`}>
            {userTier === "professional" ? "Professional" : "Parent"} Plan
          </span>
        ) : (
          <Link
            href="/billing"
            className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border bg-white/5 border-white/10 text-gray-400 hover:text-[#38bdf8] hover:border-[#0ea5e9]/30 transition-colors"
          >
            Subscribe to access →
          </Link>
        )}
      </div>

      {/* Tabs */}
      <div role="tablist" className="flex gap-2 mb-8 flex-wrap">
        {TABS.map((tab) => {
          const count = LIBRARY.filter((i) => i.type === tab.id).length;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              role="tab"
              aria-selected={isActive}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
                isActive
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-transparent border-transparent text-gray-500 hover:text-gray-300 hover:bg-white/5"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${isActive ? "bg-white/20 text-white" : "bg-white/5 text-gray-600"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Grid */}
      <div
        id={`tabpanel-${activeTab}`}
        role="tabpanel"
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {items.map((item) => (
          <LibraryCard
            key={item.id}
            item={item}
            accessible={canAccess(userTier, item.tier)}
          />
        ))}
      </div>

      {/* Upgrade CTA — only if user has no tier or parent (to upsell professional) */}
      {userTier !== "professional" && (
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-white/[0.02] border border-[#0ea5e9]/20 flex flex-col sm:flex-row items-center gap-6">
          <div className="flex-1">
            <h3 className="text-base font-bold text-white mb-1">
              {userTier ? "Unlock professional content" : "Subscribe to access the library"}
            </h3>
            <p className="text-sm text-gray-400">
              {userTier
                ? "Professional plan includes 8th Circuit appeal decks, forensic psych Q&As, clinical guides, and more."
                : "All slides, videos, audio sessions, and PDF guides are included with a Parent or Professional plan."}
            </p>
          </div>
          <Link
            href="/billing"
            className="shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white text-sm font-bold hover:shadow-[0_0_20px_rgba(14,165,233,0.35)] transition-all"
          >
            {userTier ? "Upgrade Plan" : "See Plans"}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
