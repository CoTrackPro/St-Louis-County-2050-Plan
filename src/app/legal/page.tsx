import NavBar from "@/components/layout/NavBar";

export default function LegalPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-4xl">⚖️</span>
          <div>
            <h1 className="text-3xl font-bold text-indigo-900">Legal</h1>
            <p className="text-gray-500">Attorney support — intake, checklists & drafting structure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[
            { title: "Client Intake",        desc: "Structured intake forms and issue spotting" },
            { title: "Case Checklists",       desc: "Jurisdiction-specific procedural checklists" },
            { title: "Drafting Assistant",    desc: "Document structure and clause organization" },
            { title: "8th Circuit Appeals",   desc: "Protection order appeal workflow and deadlines" },
          ].map((card) => (
            <div key={card.title} className="bg-white rounded-xl border border-blue-100 shadow-sm p-5 cursor-pointer hover:shadow-md transition">
              <h3 className="font-semibold text-blue-900 mb-1">{card.title}</h3>
              <p className="text-sm text-gray-500">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
