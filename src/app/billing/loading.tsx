export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="animate-pulse space-y-4">
        <div className="h-8 bg-white/10 rounded w-48" />
        <div className="h-4 bg-white/5 rounded w-64" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-8">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="h-64 bg-white/[0.03] rounded-2xl border border-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
