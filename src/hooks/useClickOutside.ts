"use client";

import { useRef, useEffect } from "react";

/**
 * Returns a ref that, when attached to an element, calls `callback`
 * whenever a mousedown event fires outside that element.
 */
export function useClickOutside<T extends HTMLElement>(callback: () => void) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [callback]);

  return ref;
}
