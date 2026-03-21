import Link from "next/link";

const PLANS = [
  { key: "bridges", name: "Bridges", icon: "🌉", price: "$19/mo", desc: "Co-parenting documentation" },
  { key: "legal",   name: "Legal",   icon: "⚖️",  price: "$29/mo", desc: "Attorney tools" },
  { key: "mental",  name: "Mental",  icon: "🧠",  price: "$19/mo", desc: "Wellness & safety" },
  { key: "pro",     name: "Pro",     icon: "🚀",  price: "$59/mo", desc: "All modules", highlight: true },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-6 py-16">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <Link href="/" className="text-indigo-600 text-sm hover:underline mb-4 inline-block">← Home</Link>
        <h1 className="text-4xl font-bold text-indigo-900 mb-3">Simple, transparent pricing</h1>
        <p className="text-indigo-700">Subscribe to the modules you need. Cancel anytime.</p>
      </div>

      <div className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PLANS.map((p) => (
          <div
            key={p.key}
            className={`rounded-2xl p-6 ${
              p.highlight ? "bg-indigo-600 text-white" : "bg-white text-gray-900"
            } shadow-lg`}
          >
            <div className="text-3xl mb-2">{p.icon}</div>
            <h2 className={`text-xl font-bold mb-1 ${p.highlight ? "text-white" : "text-indigo-900"}`}>{p.name}</h2>
            <p className={`text-2xl font-semibold mb-2 ${p.highlight ? "text-indigo-200" : "text-indigo-600"}`}>{p.price}</p>
            <p className={`text-sm mb-4 ${p.highlight ? "text-indigo-100" : "text-gray-500"}`}>{p.desc}</p>
            <Link
              href="/sign-up"
              className={`inline-block w-full text-center py-2.5 rounded-xl font-medium transition ${
                p.highlight
                  ? "bg-white text-indigo-600 hover:bg-indigo-50"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              Get started
            </Link>
          </div>
        ))}
      </div>
    </main>
  );
}
