import NavBar from "@/components/layout/NavBar";

export default function MentalPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">🧠</span>
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Mental</h1>
            <p className="text-gray-500">Trauma-informed wellness and safety documentation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Safety Plan",           desc: "Build a personalized crisis safety plan" },
            { title: "Wellness Journal",      desc: "Private, encrypted emotional health log" },
            { title: "De-escalation Tools",   desc: "Rewrite triggering messages to calm tone" },
            { title: "Resource Navigator",    desc: "Local and national support resources" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl border border-purple-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition">
              <h3 className="font-semibold text-purple-900 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
