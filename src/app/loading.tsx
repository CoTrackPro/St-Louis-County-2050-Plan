export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        {/* Animated brand spinner */}
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-t-[#0ea5e9] animate-spin" />
        </div>
        <p className="text-gray-500 text-sm">Loading…</p>
      </div>
    </div>
  );
}
