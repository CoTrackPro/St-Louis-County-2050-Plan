"use client";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/bridges",   label: "Bridges" },
  { href: "/legal",     label: "Legal" },
  { href: "/mental",    label: "Mental" },
  { href: "/billing",   label: "Billing" },
];

export default function NavBar() {
  const pathname = usePathname();
  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <Link href="/" className="text-xl font-bold text-indigo-900">CoTrackPro</Link>
      <div className="flex items-center gap-6">
        {NAV.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            className={`text-sm font-medium transition-colors ${
              pathname.startsWith(n.href)
                ? "text-indigo-600"
                : "text-gray-600 hover:text-indigo-600"
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
