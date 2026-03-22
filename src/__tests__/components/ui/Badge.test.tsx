import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Badge } from "@/components/ui/Badge";

describe("Badge", () => {
  it("renders its children", () => {
    render(<Badge>Hello World</Badge>);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("uses brand color by default (bg-[#0ea5e9]/10 wrapper)", () => {
    const { container } = render(<Badge>Label</Badge>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("bg-[#0ea5e9]/10");
  });

  it("applies gold color classes when color='gold'", () => {
    const { container } = render(<Badge color="gold">Save</Badge>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("bg-[#f59e0b]/10");
    expect(wrapper.className).toContain("text-[#fbbf24]");
  });

  it("applies green color classes when color='green'", () => {
    const { container } = render(<Badge color="green">Active</Badge>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("text-emerald-400");
  });

  it("applies purple color classes when color='purple'", () => {
    const { container } = render(<Badge color="purple">Quiz</Badge>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("text-purple-400");
  });

  it("renders the pulse dot by default", () => {
    const { container } = render(<Badge>Dot</Badge>);
    // The dot span has animate-pulse class
    const dot = container.querySelector(".animate-pulse");
    expect(dot).toBeInTheDocument();
  });

  it("omits animate-pulse when pulse=false", () => {
    const { container } = render(<Badge pulse={false}>Static</Badge>);
    const dot = container.querySelector(".animate-pulse");
    expect(dot).not.toBeInTheDocument();
  });

  it("passes extra className to the wrapper", () => {
    const { container } = render(<Badge className="my-custom-class">Extra</Badge>);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("my-custom-class");
  });
});
