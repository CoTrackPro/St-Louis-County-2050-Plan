import Link from "next/link";

const MODULES = [
  { href: "/bridges", label: "Bridges", icon: "🌉", desc: "Co-parenting communication & documentation" },
  { href: "/legal",   label: "Legal",   icon: "⚖️",  desc: "Attorney tools, intake, and drafting support" },
  { href: "/mental",  label: "Mental",  icon: "🧠",  desc: "Trauma-informed wellness and safety plans" },
  { href: "/dashboard", label: "Dashboard", icon: "📊", desc: "Unified case overview and analytics" },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <div className="max-w-4xl w-full text-center mb-12">
        <h1 className="text-5xl font-bold text-indigo-900 mb-4">CoTrackPro</h1>
        <p className="text-xl text-indigo-700">
          Child-centered co-parenting, legal, and wellness platform
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-3xl mb-12">
        {MODULES.map((m) => (
          <Link
            key={m.href}
            href={m.href}
            className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition-all border border-indigo-100"
          >
            <div className="text-4xl mb-3">{m.icon}</div>
            <h2 className="text-xl font-semibold text-indigo-900 mb-1">{m.label}</h2>
            <p className="text-sm text-gray-500">{m.desc}</p>
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link href="/sign-in" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition">
          Sign In
        </Link>
        <Link href="/sign-up" className="px-6 py-3 bg-white text-indigo-600 border border-indigo-300 rounded-xl font-medium hover:bg-indigo-50 transition">
          Get Started
        </Link>
        <Link href="/pricing" className="px-6 py-3 text-indigo-600 font-medium hover:underline">
          Pricing
        </Link>
      </div>
    </main>
  );
}
