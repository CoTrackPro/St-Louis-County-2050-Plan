import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import { MENTAL_TOOLS } from "@/data/modules";

export const metadata: Metadata = {
  title: "Mental — CoTrackPro",
  description: "Trauma-informed wellness plans, safety documentation, and de-escalation tools.",
};

export default async function MentalPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  if (!access?.mental) redirect("/billing?module=mental");

  return (
    <>
      <NavBar />
      <main className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-4xl">🧠</span>
          <div>
            <h1 className="text-3xl font-bold text-white">Mental</h1>
            <p className="text-gray-400">Trauma-informed wellness and safety documentation</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MENTAL_TOOLS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.03] rounded-xl border border-white/10 p-5 hover:border-purple-500/40 hover:bg-white/[0.06] transition-all duration-200 group"
            >
              <h3 className="font-semibold text-white mb-1 group-hover:text-purple-400 transition-colors">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
