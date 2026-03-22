/**
 * Merges class names, filtering out falsy values.
 * Lightweight drop-in for clsx/classnames — no extra dependency needed.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
