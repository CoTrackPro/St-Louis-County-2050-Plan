import NavBar from "@/components/layout/NavBar";

export default function BridgesPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">🌉</span>
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Bridges</h1>
            <p className="text-gray-500">Co-parenting communication & documentation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Incident Log",       desc: "Document exchanges, violations, or concerns" },
            { title: "Communication Tracker", desc: "Log co-parent messages and responses" },
            { title: "Court-Ready Summary",   desc: "Generate neutral narrative from your notes" },
            { title: "Evidence Timeline",     desc: "Build a chronological evidence record" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl border border-indigo-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition">
              <h3 className="font-semibold text-indigo-900 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
