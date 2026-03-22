"use client";

import Link from "next/link";

export default function DashboardError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-sm w-full text-center">
        <div className="text-4xl mb-4">⚠️</div>
        <h2 className="text-xl font-bold text-white mb-2">Dashboard failed to load</h2>
        <p className="text-gray-400 text-sm mb-6">Please try again or contact support if this persists.</p>
        <div className="flex gap-3 justify-center">
          <button
            onClick={reset}
            className="px-5 py-2 rounded-xl bg-[#0ea5e9] text-white text-sm font-medium hover:bg-[#0284c7] transition"
          >
            Retry
          </button>
          <Link
            href="/"
            className="px-5 py-2 rounded-xl border border-white/20 text-gray-300 text-sm font-medium hover:border-white/40 transition"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
