import {
  Shield, Brain, Megaphone, MessageCircle,
  Users, HeartHandshake, Gavel,
  Briefcase, Landmark,
  Stethoscope,
  Search, Siren, PenTool, Headphones,
} from "lucide-react";

export type NavItem = {
  label: string;
  description?: string;
  icon?: React.FC<{ className?: string }>;
  href: string;
  badge?: string;
  color?: string;
  external?: boolean;
};

export type NavCategory = {
  id: string;
  label: string;
  type: "dropdown" | "link";
  href?: string;
  items?: NavItem[];
};

export const NAV: NavCategory[] = [
  {
    id: "parents",
    label: "For Parents",
    type: "dropdown",
    items: [
      { label: "Co-Parents",  description: "High-Conflict Strategy",  icon: Users,          href: "/roles/high-conflict-co-parents", color: "text-indigo-400" },
      { label: "Survivors",   description: "Safety & Documentation",  icon: Shield,         href: "/roles/survivors",                color: "text-orange-400" },
      { label: "Pro-Se",      description: "Self-Represented",        icon: Gavel,          href: "/roles/pro-se",                   color: "text-blue-400" },
      { label: "Targeted",    description: "Alienation Support",      icon: HeartHandshake, href: "/roles/alienated-parents",        color: "text-red-400" },
    ],
  },
  {
    id: "professionals",
    label: "Professionals",
    type: "dropdown",
    items: [
      { label: "Attorneys",  icon: Briefcase,      href: "/roles/attorneys",  color: "text-[#38bdf8]" },
      { label: "Judges",     icon: Landmark,       href: "/roles/judges",     color: "text-yellow-400" },
      { label: "GALs",       icon: Search,         href: "/roles/gals",       color: "text-blue-400" },
      { label: "Therapists", icon: Stethoscope,    href: "/roles/therapists", color: "text-pink-400" },
      { label: "Mediators",  icon: HeartHandshake, href: "/roles/mediators",  color: "text-cyan-400" },
      { label: "Advocates",  icon: Shield,         href: "/roles/advocates",  color: "text-green-400" },
      { label: "Police",     icon: Siren,          href: "/roles/police",     color: "text-red-500" },
    ],
  },
  {
    id: "toolkits",
    label: "Toolkits",
    type: "dropdown",
    items: [
      { label: "The Vault",     description: "Directory of Apps",    icon: Shield,        href: "/vault",    color: "text-[#38bdf8]" },
      { label: "Advocacy",      description: "Scripts & Docs",       icon: MessageCircle, href: "/scripts",  color: "text-indigo-400" },
      { label: "Open Letter",   description: "Public Advocacy",      icon: PenTool,       href: "/letter",   badge: "NEW", color: "text-teal-400" },
      { label: "Get Social",    description: "Image Generator",      icon: Megaphone,     href: "/social",   color: "text-pink-400" },
      { label: "Skill Builder", description: "Interactive Quizzes",  icon: Brain,         href: "/quiz",     color: "text-purple-400" },
      {
        label: "Podcast",
        description: "Audio Strategy",
        icon: Headphones,
        href: "https://open.spotify.com/show/4oMoQvEqw9g3ofsCJd92Qf",
        color: "text-green-400",
        external: true,
      },
    ],
  },
  { id: "mission", label: "Mission", type: "link", href: "/mission" },
  { id: "pricing", label: "Pricing", type: "link", href: "/pricing" },
];
