import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useAudienceCarousel } from "@/hooks/useAudienceCarousel";

describe("useAudienceCarousel", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  const ITEMS = ["Alpha", "Beta", "Gamma"];

  it("starts with the first item and animating=false", () => {
    const { result } = renderHook(() => useAudienceCarousel(ITEMS));
    expect(result.current.current).toBe("Alpha");
    expect(result.current.animating).toBe(false);
  });

  it("sets animating=true immediately after the interval fires", () => {
    const { result } = renderHook(() => useAudienceCarousel(ITEMS, 3000, 500));

    act(() => { vi.advanceTimersByTime(3000); });
    expect(result.current.animating).toBe(true);
    // item has NOT changed yet (waiting for transitionMs)
    expect(result.current.current).toBe("Alpha");
  });

  it("advances to the next item after interval + transition", () => {
    const { result } = renderHook(() => useAudienceCarousel(ITEMS, 3000, 500));

    act(() => { vi.advanceTimersByTime(3500); });
    expect(result.current.current).toBe("Beta");
    expect(result.current.animating).toBe(false);
  });

  it("wraps around to the first item after the last", () => {
    const { result } = renderHook(() => useAudienceCarousel(ITEMS, 1000, 100));

    // Advance through all 3 items back to the first
    act(() => { vi.advanceTimersByTime(3 * 1100); });
    expect(result.current.current).toBe("Alpha");
  });

  it("does not advance when given a single item", () => {
    const { result } = renderHook(() => useAudienceCarousel(["Only"], 1000, 100));

    act(() => { vi.advanceTimersByTime(5000); });
    expect(result.current.current).toBe("Only");
    expect(result.current.animating).toBe(false);
  });

  it("cleans up on unmount (no setInterval leak)", () => {
    const clearSpy = vi.spyOn(globalThis, "clearInterval");
    const { unmount } = renderHook(() => useAudienceCarousel(ITEMS));

    unmount();
    expect(clearSpy).toHaveBeenCalled();
    clearSpy.mockRestore();
  });
});
