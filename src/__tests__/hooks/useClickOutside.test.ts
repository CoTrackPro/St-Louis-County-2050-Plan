import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useClickOutside } from "@/hooks/useClickOutside";

describe("useClickOutside", () => {
  afterEach(() => vi.restoreAllMocks());

  function setup() {
    const callback = vi.fn();
    const { result, unmount } = renderHook(() => useClickOutside<HTMLDivElement>(callback));
    return { ref: result.current, callback, unmount };
  }

  it("calls callback when clicking outside the ref element", () => {
    const { ref, callback } = setup();

    const el = document.createElement("div");
    document.body.appendChild(el);
    // @ts-expect-error — manually attaching ref for testing
    ref.current = el;

    act(() => {
      // Click somewhere NOT inside el — use document.body as target
      const outside = document.createElement("span");
      document.body.appendChild(outside);
      outside.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
      document.body.removeChild(outside);
    });

    expect(callback).toHaveBeenCalledOnce();
    document.body.removeChild(el);
  });

  it("does NOT call callback when clicking inside the ref element", () => {
    const { ref, callback } = setup();

    const el = document.createElement("div");
    document.body.appendChild(el);
    // @ts-expect-error
    ref.current = el;

    act(() => {
      el.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    expect(callback).not.toHaveBeenCalled();
    document.body.removeChild(el);
  });

  it("does NOT call callback when ref is null (guard prevents call)", () => {
    const { ref, callback } = setup();
    expect(ref.current).toBeNull();

    act(() => {
      document.dispatchEvent(new MouseEvent("mousedown", { bubbles: true }));
    });

    // The hook checks `ref.current &&` first — when null, callback is never invoked
    expect(callback).not.toHaveBeenCalled();
  });

  it("removes the mousedown listener on unmount", () => {
    const removeSpy = vi.spyOn(document, "removeEventListener");
    const { unmount } = setup();

    unmount();
    expect(removeSpy).toHaveBeenCalledWith("mousedown", expect.any(Function));
  });
});
