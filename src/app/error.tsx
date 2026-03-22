"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to monitoring in production
    if (process.env.NODE_ENV === "production") {
      console.error("[GlobalError]", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-5xl mb-6">⚠️</div>
        <h1 className="text-2xl font-bold text-white mb-3">Something went wrong</h1>
        <p className="text-gray-400 mb-8 leading-relaxed">
          An unexpected error occurred. Your data is safe — please try again or return to the
          dashboard.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-xl bg-[#0ea5e9] text-white font-medium hover:bg-[#0284c7] transition"
          >
            Try again
          </button>
          <Link
            href="/dashboard"
            className="px-6 py-2.5 rounded-xl border border-white/20 text-gray-300 font-medium hover:border-white/40 hover:text-white transition"
          >
            Go to dashboard
          </Link>
        </div>
        {error.digest && (
          <p className="mt-6 text-xs text-gray-600">Error ID: {error.digest}</p>
        )}
      </div>
    </div>
  );
}
