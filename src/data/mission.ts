import { Shield, Scale, Heart, Users, BookOpen, type LucideIcon } from "lucide-react";

export interface MissionValue {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  title: string;
  desc: string;
}

export const VALUES: MissionValue[] = [
  {
    icon: Shield,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    title: "Child First",
    desc: "Every feature, every template, and every AI prompt is filtered through one question: does this protect the child?",
  },
  {
    icon: Scale,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Court-Ready Clarity",
    desc: "We don't enable drama. We document facts, reduce noise, and help families speak the language courts understand.",
  },
  {
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-500/10",
    border: "border-pink-500/20",
    title: "Trauma-Informed",
    desc: "High-conflict isn't just legal — it's psychological. Our tools are built with that reality front of mind.",
  },
  {
    icon: Users,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Built for Everyone",
    desc: "From self-represented parents to seasoned family law attorneys — we serve every role in the ecosystem.",
  },
  {
    icon: BookOpen,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    title: "Education Over Emotion",
    desc: "Knowing what to do, how to say it, and when to escalate is the difference between winning and losing.",
  },
];
