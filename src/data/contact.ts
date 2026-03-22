import { Mail, Calendar, MessageCircle, type LucideIcon } from "lucide-react";

export interface ContactOption {
  icon: LucideIcon;
  color: string;
  bg: string;
  border: string;
  title: string;
  desc: string;
  action: string;
  href: string;
}

export const CONTACT_OPTIONS: ContactOption[] = [
  {
    icon: Mail,
    color: "text-[#38bdf8]",
    bg: "bg-[#0ea5e9]/10",
    border: "border-[#0ea5e9]/20",
    title: "Email Support",
    desc: "General questions, billing, or technical issues.",
    action: "Send Email",
    href: "mailto:admin@cotrackpro.com",
  },
  {
    icon: Calendar,
    color: "text-yellow-400",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    title: "Book a Strategy Call",
    desc: "Talk to a high-conflict strategist directly.",
    action: "Book Now",
    href: "https://calendly.com/dougdevitre/individual-session-1-1-zoom",
  },
  {
    icon: MessageCircle,
    color: "text-green-400",
    bg: "bg-green-500/10",
    border: "border-green-500/20",
    title: "Partnership Inquiry",
    desc: "Agencies, courts, legal organizations — let's talk.",
    action: "Partner With Us",
    href: "/partner",
  },
];
