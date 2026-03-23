"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 text-center">
      <h2 className="text-2xl font-bold text-white mb-2">Library unavailable</h2>
      <p className="text-gray-400 mb-6">{error.message}</p>
      <button
        onClick={reset}
        className="bg-[#0ea5e9] text-white px-6 py-2 rounded-lg hover:bg-[#0284c7] transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
