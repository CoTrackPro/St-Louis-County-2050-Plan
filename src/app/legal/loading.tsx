export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="animate-pulse space-y-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/10" />
          <div className="space-y-2">
            <div className="h-6 w-24 bg-white/10 rounded" />
            <div className="h-4 w-72 bg-white/10 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-white/[0.03] rounded-xl border border-white/10" />
          ))}
        </div>
      </div>
    </div>
  );
}
