import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useMouseSpotlight } from "@/hooks/useMouseSpotlight";

describe("useMouseSpotlight", () => {
  afterEach(() => vi.restoreAllMocks());

  it("returns a function (the mousemove handler)", () => {
    const { result } = renderHook(() => useMouseSpotlight());
    expect(typeof result.current).toBe("function");
  });

  it("cancels pending RAF on unmount", () => {
    const cancelSpy = vi.spyOn(globalThis, "cancelAnimationFrame");
    // Stub RAF to return a non-zero id so the cancel guard fires
    vi.spyOn(globalThis, "requestAnimationFrame").mockReturnValue(42);

    const { result, unmount } = renderHook(() => useMouseSpotlight());

    // Trigger the handler so rafRef.current becomes 42
    const el = document.createElement("div");
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue(
      { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) }
    );

    act(() => {
      result.current({
        currentTarget: el,
        clientX: 50,
        clientY: 50,
      } as unknown as React.MouseEvent<HTMLDivElement>);
    });

    unmount();
    expect(cancelSpy).toHaveBeenCalledWith(42);
  });

  it("throttles: drops a second event while the first frame is pending", () => {
    const rafSpy = vi.spyOn(globalThis, "requestAnimationFrame").mockReturnValue(99);
    const { result } = renderHook(() => useMouseSpotlight());

    const el = document.createElement("div");
    vi.spyOn(el, "getBoundingClientRect").mockReturnValue(
      { left: 0, top: 0, right: 100, bottom: 100, width: 100, height: 100, x: 0, y: 0, toJSON: () => ({}) }
    );

    act(() => {
      result.current({ currentTarget: el, clientX: 10, clientY: 10 } as unknown as React.MouseEvent<HTMLDivElement>);
      result.current({ currentTarget: el, clientX: 20, clientY: 20 } as unknown as React.MouseEvent<HTMLDivElement>);
    });

    // RAF should only have been called once — the second event was dropped
    expect(rafSpy).toHaveBeenCalledTimes(1);
  });
});
