import { Mail, Linkedin, Instagram, Youtube, Facebook, Twitter } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { TikTokIcon } from "@/components/icons/TikTokIcon";

export type SocialLink = {
  href: string;
  icon: LucideIcon | typeof TikTokIcon;
  label: string;
};

export const SOCIAL: SocialLink[] = [
  { href: "mailto:admin@cotrackpro.com",             icon: Mail,       label: "Email" },
  { href: "https://linkedin.com/company/cotrackpro", icon: Linkedin,   label: "LinkedIn" },
  { href: "https://instagram.com/cotrackpro",        icon: Instagram,  label: "Instagram" },
  { href: "https://youtube.com/@cotrackpro",         icon: Youtube,    label: "YouTube" },
  { href: "https://facebook.com/cotrackpro",         icon: Facebook,   label: "Facebook" },
  { href: "https://twitter.com/cotrackpro",          icon: Twitter,    label: "X / Twitter" },
  { href: "https://tiktok.com/@cotrackpro",          icon: TikTokIcon, label: "TikTok" },
];

export type FooterColumn = {
  heading: string;
  links: { label: string; href: string }[];
};

export const FOOTER_COLS: FooterColumn[] = [
  {
    heading: "Platform",
    links: [
      { label: "The Vault",     href: "/vault" },
      { label: "Skill Builder", href: "/quiz" },
      { label: "Advocacy",      href: "/scripts" },
      { label: "Get Social",    href: "/social" },
      { label: "Open Letter",   href: "/letter" },
    ],
  },
  {
    heading: "For Families",
    links: [
      { label: "Co-Parents",        href: "/roles/high-conflict-co-parents" },
      { label: "Survivors",         href: "/roles/survivors" },
      { label: "Pro-Se Litigants",  href: "/roles/pro-se" },
      { label: "Alienated Parents", href: "/roles/alienated-parents" },
    ],
  },
  {
    heading: "Professionals",
    links: [
      { label: "Attorneys",  href: "/roles/attorneys" },
      { label: "Judges",     href: "/roles/judges" },
      { label: "GALs",       href: "/roles/gals" },
      { label: "Therapists", href: "/roles/therapists" },
      { label: "Mediators",  href: "/roles/mediators" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Mission",         href: "/mission" },
      { label: "Pricing",         href: "/pricing" },
      { label: "FAQ",             href: "/faq" },
      { label: "Contact",         href: "/contact" },
      { label: "Partner",         href: "/partner" },
      { label: "Privacy & Terms", href: "/privacy" },
    ],
  },
];

/** Mailchimp newsletter URL — single source of truth */
export const NEWSLETTER_URL = "https://mailchi.mp/2ed059283bd7/signup";
