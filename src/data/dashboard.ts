export type DashboardModule = {
  key: string;
  href: string;
  icon: string;
  label: string;
  desc: string;
};

export const MODULES: DashboardModule[] = [
  { key: "bridges", href: "/bridges", icon: "🌉", label: "Bridges", desc: "Co-parenting docs & communication logs" },
  { key: "legal",   href: "/legal",   icon: "⚖️",  label: "Legal",   desc: "Attorney intake, checklists, drafting" },
  { key: "mental",  href: "/mental",  icon: "🧠",  label: "Mental",  desc: "Wellness plans & safety documentation" },
];

export type DashboardNavItem = {
  href: string;
  label: string;
};

export const DASHBOARD_NAV: DashboardNavItem[] = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/library",   label: "Library" },
  { href: "/bridges",   label: "Bridges" },
  { href: "/legal",     label: "Legal" },
  { href: "/mental",    label: "Mental" },
  { href: "/billing",   label: "Billing" },
];
