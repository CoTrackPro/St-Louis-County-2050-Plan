import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("@clerk/nextjs", () => ({
  UserButton: () => <button aria-label="User menu" />,
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/dashboard",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

import NavBar from "@/components/layout/NavBar";

describe("NavBar", () => {
  it("renders the CoTrackPro logo link", () => {
    render(<NavBar />);
    expect(screen.getByText("CoTrackPro")).toBeInTheDocument();
  });

  it("renders all navigation items", () => {
    render(<NavBar />);
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Bridges")).toBeInTheDocument();
    expect(screen.getByText("Legal")).toBeInTheDocument();
    expect(screen.getByText("Mental")).toBeInTheDocument();
    expect(screen.getByText("Billing")).toBeInTheDocument();
  });

  it("marks the active route with the active colour class", () => {
    render(<NavBar />);
    const dashLink = screen.getByText("Dashboard").closest("a");
    expect(dashLink?.className).toContain("text-[#38bdf8]");
  });

  it("marks inactive routes with the inactive colour class", () => {
    render(<NavBar />);
    const bridgesLink = screen.getByText("Bridges").closest("a");
    expect(bridgesLink?.className).toContain("text-gray-400");
  });

  it("renders the UserButton", () => {
    render(<NavBar />);
    expect(screen.getByRole("button", { name: "User menu" })).toBeInTheDocument();
  });
});
