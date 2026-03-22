"use client";

import { useRef, useEffect, useCallback } from "react";

/**
 * Returns a throttled `onMouseMove` handler that writes `--mouse-x` and
 * `--mouse-y` CSS custom properties on the target element relative to its
 * own bounding box.  Uses `requestAnimationFrame` to cap updates to one
 * per frame, avoiding layout-thrash on fast pointer events.
 */
export function useMouseSpotlight() {
  const rafRef = useRef<number | null>(null);

  // Cancel any pending frame when the component unmounts
  useEffect(() => {
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      // Drop events that arrive before the previous frame has painted
      if (rafRef.current !== null) return;

      const target = e.currentTarget;
      const cx = e.clientX;
      const cy = e.clientY;

      rafRef.current = requestAnimationFrame(() => {
        const { left, top } = target.getBoundingClientRect();
        target.style.setProperty("--mouse-x", `${cx - left}px`);
        target.style.setProperty("--mouse-y", `${cy - top}px`);
        rafRef.current = null;
      });
    },
    [],
  );

  return handleMouseMove;
}
