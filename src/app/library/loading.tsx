export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
      {/* Header */}
      <div className="h-8 bg-white/10 rounded w-48 mb-3" />
      <div className="h-4 bg-white/5 rounded w-72 mb-10" />

      {/* Stats strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-20 bg-white/[0.03] rounded-2xl border border-white/10" />
        ))}
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 mb-8">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="h-9 w-24 bg-white/[0.03] rounded-xl border border-white/10" />
        ))}
      </div>

      {/* Card grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-56 bg-white/[0.03] rounded-2xl border border-white/10" />
        ))}
      </div>
    </div>
  );
}
