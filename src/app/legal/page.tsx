import NavBar from "@/components/layout/NavBar";

const TOOLS = [
  { title: "Client Intake",      desc: "Structured intake forms and issue spotting" },
  { title: "Case Checklists",    desc: "Jurisdiction-specific procedural checklists" },
  { title: "Drafting Assistant", desc: "Document structure and clause organization" },
  { title: "8th Circuit Appeals", desc: "Protection order appeal workflow and deadlines" },
];

export default function LegalPage() {
  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">⚖️</span>
          <div>
            <h1 className="text-3xl font-bold text-white">Legal</h1>
            <p className="text-gray-400">Attorney support — intake, checklists &amp; drafting structure</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {TOOLS.map((card) => (
            <div
              key={card.title}
              className="bg-white/[0.03] rounded-xl border border-white/10 p-5 cursor-pointer hover:border-[#0ea5e9]/40 hover:bg-white/[0.06] transition-all duration-200"
            >
              <h3 className="font-semibold text-white mb-1">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
