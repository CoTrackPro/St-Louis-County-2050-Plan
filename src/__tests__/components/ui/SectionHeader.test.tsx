import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SectionHeader } from "@/components/ui/SectionHeader";

describe("SectionHeader", () => {
  it("renders the title", () => {
    render(<SectionHeader title="My Title" />);
    expect(screen.getByText("My Title")).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(<SectionHeader title="Title" subtitle="My subtitle" />);
    expect(screen.getByText("My subtitle")).toBeInTheDocument();
  });

  it("does not render a subtitle element when omitted", () => {
    const { container } = render(<SectionHeader title="Title" />);
    // The subtitle p tag should not exist
    expect(container.querySelector("p")).not.toBeInTheDocument();
  });

  it("renders a Badge when badge prop is provided", () => {
    render(<SectionHeader title="Title" badge="Section Label" />);
    expect(screen.getByText("Section Label")).toBeInTheDocument();
  });

  it("does not render a Badge when badge prop is omitted", () => {
    const { container } = render(<SectionHeader title="Title" />);
    // Badge renders a div with rounded-full — should not exist when badge is absent
    expect(container.querySelector(".rounded-full")).not.toBeInTheDocument();
  });

  it("applies extra className to the wrapper", () => {
    const { container } = render(
      <SectionHeader title="Title" className="extra-class" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.className).toContain("extra-class");
  });
});
