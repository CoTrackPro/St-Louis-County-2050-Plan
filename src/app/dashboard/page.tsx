import { auth, currentUser } from "@clerk/nextjs/server";
import NavBar from "@/components/layout/NavBar";
import Link from "next/link";

const MODULES = [
  { key: "bridges", href: "/bridges", icon: "🌉", label: "Bridges", desc: "Co-parenting docs & communication logs" },
  { key: "legal",   href: "/legal",   icon: "⚖️",  label: "Legal",   desc: "Attorney intake, checklists, drafting" },
  { key: "mental",  href: "/mental",  icon: "🧠",  label: "Mental",  desc: "Wellness plans & safety documentation" },
];

export default async function DashboardPage() {
  const { sessionClaims } = await auth();
  const user = await currentUser();
  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-indigo-900 mb-2">
          Welcome back, {user?.firstName ?? "there"} 👋
        </h1>
        <p className="text-gray-500 mb-8">Your CoTrackPro dashboard</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MODULES.map((m) => {
            const hasAccess = !!access?.[m.key];
            return (
              <div
                key={m.key}
                className={`rounded-2xl border p-6 ${
                  hasAccess ? "bg-white border-indigo-100 shadow-sm" : "bg-gray-50 border-gray-200 opacity-70"
                }`}
              >
                <div className="text-3xl mb-3">{m.icon}</div>
                <h2 className="text-lg font-semibold text-indigo-900">{m.label}</h2>
                <p className="text-sm text-gray-500 mb-4">{m.desc}</p>
                {hasAccess ? (
                  <Link href={m.href} className="text-sm font-medium text-indigo-600 hover:underline">
                    Open →
                  </Link>
                ) : (
                  <Link href={`/billing?module=${m.key}`} className="text-sm font-medium text-gray-400 hover:text-indigo-600">
                    Upgrade to unlock →
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
