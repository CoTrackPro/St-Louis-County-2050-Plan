import type { Metadata } from "next";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import { LEGAL_TOOLS } from "@/data/modules";

export const metadata: Metadata = {
  title: "Legal — CoTrackPro",
  description: "Attorney-focused tools for client intake, case checklists, drafting, and 8th Circuit appeal workflows.",
};

export default async function LegalPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  if (!access?.legal) redirect("/billing?upgrade=professional");

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
          {LEGAL_TOOLS.map((card) => (
            <a
              key={card.title}
              href={card.href}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/[0.03] rounded-xl border border-white/10 p-5 hover:border-[#0ea5e9]/40 hover:bg-white/[0.06] transition-all duration-200 group"
            >
              <h3 className="font-semibold text-white mb-1 group-hover:text-[#38bdf8] transition-colors">{card.title}</h3>
              <p className="text-sm text-gray-400">{card.desc}</p>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
