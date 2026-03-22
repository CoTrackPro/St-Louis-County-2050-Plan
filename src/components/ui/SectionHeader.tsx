import { cn } from "@/lib/utils";
import { Badge } from "./Badge";
import type { ComponentProps } from "react";

interface SectionHeaderProps {
  /** Small badge label displayed above the title (optional) */
  badge?: string;
  badgeColor?: ComponentProps<typeof Badge>["color"];
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Extra classes on the outer wrapper div */
  className?: string;
}

/**
 * Reusable centred section header used across the landing page sections.
 * Keeps heading hierarchy, spacing, and colour consistent.
 */
export function SectionHeader({
  badge,
  badgeColor,
  title,
  subtitle,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      {badge && (
        <div className="mb-4 flex justify-center">
          <Badge color={badgeColor}>{badge}</Badge>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>
      {subtitle && (
        <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
