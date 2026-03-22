import NavBar from "@/components/layout/NavBar";

export default function DashboardLoading() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="animate-pulse space-y-6">
          <div className="h-9 bg-white/10 rounded-lg w-64" />
          <div className="h-5 bg-white/5 rounded w-48" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-2">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 bg-white/[0.03] rounded-2xl border border-white/10" />
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
