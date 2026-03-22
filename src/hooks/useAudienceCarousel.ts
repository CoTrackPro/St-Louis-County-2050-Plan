"use client";

import { useState, useEffect } from "react";

interface CarouselResult {
  current: string;
  /** True during the 500 ms fade-out/slide-up transition between items */
  animating: boolean;
}

/**
 * Cycles through `items` on a fixed interval with a brief animation
 * window so consumers can play an exit animation before swapping text.
 *
 * @param items      Array of strings to cycle through
 * @param intervalMs How long each item is displayed (default 3 000 ms)
 * @param transitionMs How long the exit animation lasts (default 500 ms)
 */
export function useAudienceCarousel(
  items: string[],
  intervalMs = 3_000,
  transitionMs = 500,
): CarouselResult {
  const [idx, setIdx]           = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (items.length <= 1) return;

    let swap: ReturnType<typeof setTimeout> | undefined;

    const timer = setInterval(() => {
      setAnimating(true);
      swap = setTimeout(() => {
        setIdx((prev) => (prev + 1) % items.length);
        setAnimating(false);
      }, transitionMs);
    }, intervalMs);

    return () => {
      clearInterval(timer);
      clearTimeout(swap);
    };
  }, [items.length, intervalMs, transitionMs]);

  return { current: items[idx], animating };
}
