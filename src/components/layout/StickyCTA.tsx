"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

export default function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (!dismissed) setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed]);

  if (!visible || dismissed) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-[#0f172a]/95 backdrop-blur-xl border border-white/10 shadow-2xl">
        <p className="text-sm text-gray-300 font-medium">
          Ready to protect what matters?
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/pricing"
            className="flex items-center gap-1 px-4 py-2 rounded-xl bg-gradient-to-br from-[#0284c7] to-[#0ea5e9] text-white text-sm font-bold hover:shadow-[0_0_15px_rgba(14,165,233,0.4)] transition-all"
          >
            Get Access <ChevronRight className="w-3.5 h-3.5" />
          </Link>
          <button
            onClick={() => setDismissed(true)}
            className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
