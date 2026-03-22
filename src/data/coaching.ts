import { Calendar, Zap, Layers, Rocket, type LucideIcon } from "lucide-react";

export interface CoachingPackage {
  title: string;
  subtitle: string;
  sessions: string;
  description: string;
  url: string;
  Icon: LucideIcon;
  color: string;
  border: string;
  bg: string;
}

export const COACHING_PACKAGES: CoachingPackage[] = [
  {
    title: "Individual Session",
    subtitle: "Strategic Triage",
    sessions: "1 Session",
    description: "Deep dive into a specific issue or strategy session via Zoom.",
    url: "https://calendly.com/dougdevitre/individual-session-1-1-zoom",
    Icon: Calendar,
    color: "text-blue-400",
    border: "border-blue-500/20 hover:border-blue-500/50",
    bg: "bg-blue-500/10",
  },
  {
    title: "Momentum Pack",
    subtitle: "Action Plan",
    sessions: "3 Sessions",
    description: "Get moving with a short-term action plan and accountability.",
    url: "https://calendly.com/dougdevitre/cotrackpro-member-momentum-pack-3-sessions",
    Icon: Zap,
    color: "text-yellow-400",
    border: "border-yellow-500/20 hover:border-yellow-500/50",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Build Pack",
    subtitle: "System Building",
    sessions: "6 Sessions",
    description: "Establish strong habits and build your documentation system.",
    url: "https://calendly.com/dougdevitre/cotrackpro-member-build-pack-6-sessions",
    Icon: Layers,
    color: "text-purple-400",
    border: "border-purple-500/20 hover:border-purple-500/50",
    bg: "bg-purple-500/10",
  },
  {
    title: "Transform Pack",
    subtitle: "Complete Overhaul",
    sessions: "12 Sessions",
    description: "Complete strategic overhaul and ongoing high-conflict management.",
    url: "https://calendly.com/dougdevitre/cotrackpro-member-transform-pack-12-sessions",
    Icon: Rocket,
    color: "text-[#0ea5e9]",
    border: "border-[#0ea5e9]/20 hover:border-[#0ea5e9]/50",
    bg: "bg-[#0ea5e9]/10",
  },
];
