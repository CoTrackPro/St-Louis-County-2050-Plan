"use client";

import { useState, useEffect } from "react";

/**
 * Returns true once the page scrolls past `threshold` pixels.
 * Uses a passive scroll listener so it never blocks scrolling.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    // Check immediately in case the page is already scrolled (e.g. back navigation)
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
