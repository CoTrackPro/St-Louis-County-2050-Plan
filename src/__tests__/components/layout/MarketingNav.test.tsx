import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

// ── Mocks ───────────────────────────────────────────────────────────────────

vi.mock("@/hooks/useScrolled", () => ({
  useScrolled: () => false,
}));

vi.mock("@/hooks/useClickOutside", () => ({
  useClickOutside: () => ({ current: null }),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

vi.mock("next/link", () => ({
  default: ({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) => (
    <a href={href} className={className}>{children}</a>
  ),
}));

vi.mock("next/image", () => ({
  default: ({ src, alt, ...rest }: { src: string; alt: string; [k: string]: unknown }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} {...rest} />
  ),
}));

import MarketingNav from "@/components/layout/MarketingNav";

describe("MarketingNav", () => {
  it("renders the CoTrackPro logo", () => {
    render(<MarketingNav />);
    expect(screen.getByAltText("CoTrackPro")).toBeInTheDocument();
  });

  it("renders top-level navigation category labels", () => {
    render(<MarketingNav />);
    expect(screen.getByText("For Parents")).toBeInTheDocument();
    expect(screen.getByText("Professionals")).toBeInTheDocument();
    expect(screen.getByText("Toolkits")).toBeInTheDocument();
    expect(screen.getByText("Mission")).toBeInTheDocument();
    expect(screen.getByText("Pricing")).toBeInTheDocument();
  });

  it("renders a mobile menu toggle button", () => {
    render(<MarketingNav />);
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });

  it("opens the mobile menu when toggle is clicked", () => {
    render(<MarketingNav />);
    const toggleBtn = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggleBtn);
    // After open, button label changes to close
    expect(screen.getByRole("button", { name: /close menu/i })).toBeInTheDocument();
  });

  it("closes the mobile menu when toggled again", () => {
    render(<MarketingNav />);
    const toggleBtn = screen.getByRole("button", { name: /open menu/i });
    fireEvent.click(toggleBtn);
    fireEvent.click(screen.getByRole("button", { name: /close menu/i }));
    expect(screen.getByRole("button", { name: /open menu/i })).toBeInTheDocument();
  });
});
