import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// vi.hoisted runs before vi.mock hoisting so we can reference MOCK_FAQ in the factory
const { MOCK_FAQ } = vi.hoisted(() => ({
  MOCK_FAQ: [
    {
      id: "general",
      label: "General",
      items: [
        { question: "What is CoTrackPro?",  answer: "A documentation platform." },
        { question: "Is it free to start?", answer: "There is a free trial." },
      ],
    },
    {
      id: "billing",
      label: "Billing",
      items: [
        { question: "How do I cancel?", answer: "Cancel anytime in billing settings." },
      ],
    },
  ],
}));

vi.mock("@/data/content", () => ({
  FAQ_CATEGORIES:   MOCK_FAQ,
  TESTIMONIALS:     [],
  IMPACT_METRICS:   [],
  DETAILED_SCHEDULE: [],
}));

import FAQSection from "@/components/landing/FAQSection";

describe("FAQSection", () => {
  it("renders nothing when FAQ_CATEGORIES is empty", () => {
    // Temporarily empty the mock array
    const saved = MOCK_FAQ.splice(0);
    const { container } = render(<FAQSection />);
    expect(container.firstChild).toBeNull();
    MOCK_FAQ.push(...saved);
  });

  it("renders tabs for each FAQ category", () => {
    render(<FAQSection />);
    expect(screen.getByRole("tab", { name: "General" })).toBeInTheDocument();
    expect(screen.getByRole("tab", { name: "Billing" })).toBeInTheDocument();
  });

  it("displays items from the first category by default", () => {
    render(<FAQSection />);
    expect(screen.getByText("What is CoTrackPro?")).toBeInTheDocument();
    expect(screen.getByText("Is it free to start?")).toBeInTheDocument();
    expect(screen.queryByText("How do I cancel?")).not.toBeInTheDocument();
  });

  it("expands an accordion item when clicked", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByText("What is CoTrackPro?"));
    expect(screen.getByText("A documentation platform.")).toBeInTheDocument();
  });

  it("collapses an open accordion item when clicked again", () => {
    render(<FAQSection />);
    const btn = screen.getByText("What is CoTrackPro?");
    fireEvent.click(btn);
    expect(screen.getByText("A documentation platform.")).toBeInTheDocument();
    fireEvent.click(btn);
    expect(screen.queryByText("A documentation platform.")).not.toBeInTheDocument();
  });

  it("switches category and shows new items when tab is clicked", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.getByText("How do I cancel?")).toBeInTheDocument();
    expect(screen.queryByText("What is CoTrackPro?")).not.toBeInTheDocument();
  });

  it("closes open item when switching categories", () => {
    render(<FAQSection />);
    fireEvent.click(screen.getByText("What is CoTrackPro?"));
    expect(screen.getByText("A documentation platform.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("tab", { name: "Billing" }));
    expect(screen.queryByText("A documentation platform.")).not.toBeInTheDocument();
  });

  it("marks the active tab with aria-selected=true", () => {
    render(<FAQSection />);
    const generalTab = screen.getByRole("tab", { name: "General" });
    const billingTab = screen.getByRole("tab", { name: "Billing" });
    expect(generalTab).toHaveAttribute("aria-selected", "true");
    expect(billingTab).toHaveAttribute("aria-selected", "false");
    fireEvent.click(billingTab);
    expect(generalTab).toHaveAttribute("aria-selected", "false");
    expect(billingTab).toHaveAttribute("aria-selected", "true");
  });
});
