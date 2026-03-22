"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { DASHBOARD_NAV } from "@/data/dashboard";

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bg-[#0f172a] border-b border-white/10 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-white">CoTrackPro</Link>
      <div className="flex items-center gap-6">
        {DASHBOARD_NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith(n.href)
                ? "text-[#38bdf8]"
                : "text-gray-400 hover:text-[#38bdf8]"
            }`}
          >
            {n.label}
          </Link>
        ))}
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}
