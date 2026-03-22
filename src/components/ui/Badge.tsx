import { cn } from "@/lib/utils";

type BadgeColor = "brand" | "gold" | "green" | "purple";

const COLOR_MAP: Record<BadgeColor, { wrapper: string; dot: string }> = {
  brand:  { wrapper: "bg-[#0ea5e9]/10 border-[#0ea5e9]/20 text-[#38bdf8]", dot: "bg-[#0ea5e9]" },
  gold:   { wrapper: "bg-[#f59e0b]/10 border-[#f59e0b]/20 text-[#fbbf24]", dot: "bg-[#f59e0b]" },
  green:  { wrapper: "bg-emerald-500/10 border-emerald-500/20 text-emerald-400", dot: "bg-emerald-400" },
  purple: { wrapper: "bg-purple-500/10 border-purple-500/20 text-purple-400", dot: "bg-purple-400" },
};

interface BadgeProps {
  children: React.ReactNode;
  color?: BadgeColor;
  pulse?: boolean;
  className?: string;
}

/**
 * Pulsing-dot badge used as section labels across the marketing site.
 * Keeps colour, sizing, and shape consistent in one place.
 */
export function Badge({ children, color = "brand", pulse = true, className }: BadgeProps) {
  const { wrapper, dot } = COLOR_MAP[color];
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold",
        wrapper,
        className,
      )}
    >
      <span className={cn("w-2 h-2 rounded-full shrink-0", dot, pulse && "animate-pulse")} />
      {children}
    </div>
  );
}
