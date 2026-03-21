"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_CATEGORIES } from "@/data/content";

export default function FAQSection() {
  // Guard: nothing to render if data is empty
  if (!FAQ_CATEGORIES.length) return null;

  const [activeCategory, setActiveCategory] = useState(FAQ_CATEGORIES[0].id);
  const [openItem, setOpenItem] = useState<string | null>(null);

  // Safe fallback — never throws even if state is stale after a hot-reload
  const active = FAQ_CATEGORIES.find((c) => c.id === activeCategory) ?? FAQ_CATEGORIES[0];

  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex gap-2 mb-8 flex-wrap justify-center" role="tablist" aria-label="FAQ categories">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => { setActiveCategory(cat.id); setOpenItem(null); }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-[#0ea5e9] text-white"
                  : "bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="space-y-3">
          {active.items.map((item, i) => {
            const itemKey = `${activeCategory}-${i}`;
            const isOpen = openItem === itemKey;
            return (
              <div key={itemKey} className="rounded-2xl border border-white/10 overflow-hidden">
                <button
                  onClick={() => setOpenItem(isOpen ? null : itemKey)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-medium text-white pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-gray-400 shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5">
                    <div className="pt-4">{item.answer}</div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
