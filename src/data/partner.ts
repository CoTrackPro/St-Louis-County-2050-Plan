import { Building2, Gavel, HeartHandshake, Users, type LucideIcon } from "lucide-react";

export interface PartnerType {
  icon: LucideIcon;
  color: string;
  title: string;
  desc: string;
}

export const PARTNER_TYPES: PartnerType[] = [
  { icon: Gavel,          color: "text-yellow-400", title: "Courts & Judiciary",     desc: "Standardize documentation and reduce court-time waste." },
  { icon: Building2,      color: "text-[#38bdf8]",  title: "Legal Aid Societies",    desc: "Extend your reach with AI-assisted tools for pro-se clients." },
  { icon: HeartHandshake, color: "text-pink-400",   title: "DV Shelters & Advocacy", desc: "Give survivors a structured, private path to safety." },
  { icon: Users,          color: "text-green-400",  title: "Family Service Agencies", desc: "Equip case managers with trauma-informed tools." },
];

export const BENEFITS: string[] = [
  "Bulk licensing for your staff or clients",
  "White-label options available",
  "Staff onboarding and training",
  "API access for system integration",
  "Dedicated account support",
];
