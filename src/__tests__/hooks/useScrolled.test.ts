import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrolled } from "@/hooks/useScrolled";

describe("useScrolled", () => {
  // jsdom doesn't support real scrolling but we can set window.scrollY manually
  beforeEach(() => {
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns false initially when scrollY is 0", () => {
    const { result } = renderHook(() => useScrolled());
    expect(result.current).toBe(false);
  });

  it("returns true when scrollY already exceeds threshold on mount", () => {
    Object.defineProperty(window, "scrollY", { value: 100, writable: true, configurable: true });
    const { result } = renderHook(() => useScrolled(20));
    expect(result.current).toBe(true);
  });

  it("returns false when scrollY is exactly at threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 20, writable: true, configurable: true });
    const { result } = renderHook(() => useScrolled(20));
    // scrollY > threshold (strictly greater), so 20 > 20 is false
    expect(result.current).toBe(false);
  });

  it("updates to true when a scroll event fires past threshold", () => {
    const { result } = renderHook(() => useScrolled(20));
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 50, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(true);
  });

  it("updates back to false when scrolled back above threshold", () => {
    Object.defineProperty(window, "scrollY", { value: 50, writable: true, configurable: true });
    const { result } = renderHook(() => useScrolled(20));
    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });

    expect(result.current).toBe(false);
  });

  it("respects a custom threshold", () => {
    const { result } = renderHook(() => useScrolled(100));

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 50, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(false);

    act(() => {
      Object.defineProperty(window, "scrollY", { value: 101, writable: true, configurable: true });
      window.dispatchEvent(new Event("scroll"));
    });
    expect(result.current).toBe(true);
  });

  it("removes the scroll listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");
    const { unmount } = renderHook(() => useScrolled());

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));
  });
});
