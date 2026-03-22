import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// ── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@/hooks/useMouseSpotlight", () => ({
  useMouseSpotlight: () => vi.fn(),
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

// Minimal ROLES stub — enough structure for RoleCard + BillingToggle tests
vi.mock("@/data/roles", () => ({
  ROLES: [
    {
      id: "co-parent",
      title: "Co-Parent",
      icon: () => <svg />,
      description: "High-conflict co-parenting strategy",
      whyNow: ["Reduce chaos"],
      gradient: "linear-gradient(135deg, #0ea5e9, #0284c7)",
      accentColor: "text-[#38bdf8]",
      primaryAction:   { label: "Monthly Plan", url: "https://checkout.stripe.com/monthly" },
      secondaryAction: { label: "Yearly Plan",  url: "https://checkout.stripe.com/yearly" },
    },
  ],
}));

import RolesSection from "@/components/landing/RolesSection";

describe("RolesSection", () => {
  it("renders the section heading", () => {
    render(<RolesSection />);
    expect(screen.getByText("Choose Your Path")).toBeInTheDocument();
  });

  it("renders the billing toggle with Monthly and Yearly buttons", () => {
    render(<RolesSection />);
    expect(screen.getByRole("button", { name: /Monthly/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Yearly/i })).toBeInTheDocument();
  });

  it("defaults to yearly billing (Yearly button has aria-pressed=true)", () => {
    render(<RolesSection />);
    expect(screen.getByRole("button", { name: /Yearly/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Monthly/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches to monthly when Monthly button is clicked", () => {
    render(<RolesSection />);
    fireEvent.click(screen.getByRole("button", { name: /Monthly/i }));
    expect(screen.getByRole("button", { name: /Monthly/i })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: /Yearly/i })).toHaveAttribute("aria-pressed", "false");
  });

  it("switches back to yearly when Yearly button is clicked", () => {
    render(<RolesSection />);
    fireEvent.click(screen.getByRole("button", { name: /Monthly/i }));
    fireEvent.click(screen.getByRole("button", { name: /Yearly/i }));
    expect(screen.getByRole("button", { name: /Yearly/i })).toHaveAttribute("aria-pressed", "true");
  });

  it("renders a role card for each role in ROLES", () => {
    render(<RolesSection />);
    expect(screen.getByText("Co-Parent")).toBeInTheDocument();
  });
});
