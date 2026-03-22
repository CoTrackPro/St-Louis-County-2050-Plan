import { describe, it, expect } from "vitest";
import { cn } from "@/lib/utils";

describe("cn()", () => {
  it("joins two strings", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("filters out falsy values (false, null, undefined)", () => {
    expect(cn("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns empty string when all args are falsy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });

  it("returns empty string for zero arguments", () => {
    expect(cn()).toBe("");
  });

  it("keeps a single class unchanged", () => {
    expect(cn("only")).toBe("only");
  });

  it("handles conditional class correctly (truthy condition)", () => {
    const active = true;
    expect(cn("base", active && "active")).toBe("base active");
  });

  it("handles conditional class correctly (falsy condition)", () => {
    const active = false;
    expect(cn("base", active && "active")).toBe("base");
  });
});
