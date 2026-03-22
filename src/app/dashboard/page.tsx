import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import Link from "next/link";
import { MODULES } from "@/data/dashboard";

export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");
  const user = await currentUser();
  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-white mb-2">
          Welcome back, {user?.firstName ?? "there"} 👋
        </h1>
        <p className="text-gray-400 mb-8">Your CoTrackPro dashboard</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MODULES.map((m) => {
            const hasAccess = !!access?.[m.key];
            return (
              <div
                key={m.key}
                className={`rounded-2xl border p-6 transition-all ${
                  hasAccess
                    ? "bg-white/[0.04] border-[#0ea5e9]/30 hover:border-[#0ea5e9]/60 hover:bg-white/[0.06]"
                    : "bg-white/[0.02] border-white/10 opacity-60"
                }`}
              >
                <div className="text-3xl mb-3" aria-hidden="true">{m.icon}</div>
                <h2 className="text-lg font-semibold text-white">{m.label}</h2>
                <p className="text-sm text-gray-400 mb-4">{m.desc}</p>
                {hasAccess ? (
                  <Link
                    href={m.href}
                    className="text-sm font-medium text-[#38bdf8] hover:text-white transition-colors"
                  >
                    Open →
                  </Link>
                ) : (
                  <Link
                    href={`/billing?module=${m.key}`}
                    className="text-sm font-medium text-gray-500 hover:text-[#38bdf8] transition-colors"
                  >
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
