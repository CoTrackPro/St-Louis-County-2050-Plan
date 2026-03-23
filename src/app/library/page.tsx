import type { Metadata } from "next";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import NavBar from "@/components/layout/NavBar";
import LibraryGrid from "@/components/library/LibraryGrid";
import { LIBRARY } from "@/data/library";

export const metadata: Metadata = {
  title: "Content Library — CoTrackPro",
  description:
    "Your member library — slide decks, videos, audio sessions, and downloadable guides for every stage of your case.",
};

export default async function LibraryPage() {
  const { userId, sessionClaims } = await auth();
  if (!userId) redirect("/sign-in");

  const user = await currentUser();

  // Tier is set in Clerk publicMetadata by the Stripe webhook on checkout/subscription events
  const meta  = sessionClaims?.metadata as Record<string, unknown> | undefined;
  const tier  = (meta?.tier as string | null | undefined) ?? null;

  // Counts for the stats strip
  const byType = {
    slides: LIBRARY.filter((i) => i.type === "slides").length,
    video:  LIBRARY.filter((i) => i.type === "video").length,
    audio:  LIBRARY.filter((i) => i.type === "audio").length,
    guide:  LIBRARY.filter((i) => i.type === "guide").length,
  };

  return (
    <>
      <NavBar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-white mb-2">
            Content Library
          </h1>
          <p className="text-gray-400">
            Welcome back, {user?.firstName ?? "there"}. Here&apos;s everything included in your plan.
          </p>
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
          {[
            { label: "Slide Decks",  value: byType.slides, color: "text-[#38bdf8]"  },
            { label: "Videos",       value: byType.video,  color: "text-purple-400" },
            { label: "Audio Sessions",value: byType.audio,  color: "text-teal-400"   },
            { label: "PDF Guides",   value: byType.guide,  color: "text-amber-400"  },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/[0.02] border border-white/10 px-5 py-4"
            >
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Library grid with tabs */}
        <LibraryGrid userTier={tier} />
      </main>
    </>
  );
}
