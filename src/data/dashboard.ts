export type DashboardModule = {
  key: string;
  href: string;
  icon: string;
  label: string;
  desc: string;
  /** Minimum tier required — mirrors ROUTE_TIER in middleware.ts */
  requiredTier: "parent" | "professional";
};

export const MODULES: DashboardModule[] = [
  { key: "bridges", href: "/bridges", icon: "🌉", label: "Bridges", desc: "Co-parenting docs & communication logs", requiredTier: "parent"       },
  { key: "legal",   href: "/legal",   icon: "⚖️",  label: "Legal",   desc: "Attorney intake, checklists, drafting",  requiredTier: "professional" },
  { key: "mental",  href: "/mental",  icon: "🧠",  label: "Mental",  desc: "Wellness plans & safety documentation",  requiredTier: "parent"       },
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
