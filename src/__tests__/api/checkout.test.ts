/**
 * Unit tests for the Stripe checkout API route.
 *
 * Mocks:
 *   - @clerk/nextjs/server  → controls auth() / currentUser() returns
 *   - @/lib/stripe          → prevents real Stripe calls
 *   - @/lib/monitoring      → silences captureError
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

// ─── Mocks ────────────────────────────────────────────────────────────────────

const mockAuth        = vi.fn();
const mockCurrentUser = vi.fn();
const mockSessionCreate = vi.fn();
const mockCaptureError  = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({
  auth:        () => mockAuth(),
  currentUser: () => mockCurrentUser(),
}));

vi.mock("@/lib/stripe", () => ({
  stripe: {
    checkout: {
      sessions: { create: (...args: unknown[]) => mockSessionCreate(...args) },
    },
  },
  PLANS: {
    parent_monthly: {
      priceId: "price_parent_monthly",
      tier:    "parent",
      modules: "bridges,mental",
    },
    parent_annual: {
      priceId: "price_parent_annual",
      tier:    "parent",
      modules: "bridges,mental",
    },
    professional_monthly: {
      priceId: "price_pro_monthly",
      tier:    "professional",
      modules: "bridges,mental,legal",
    },
    professional_annual: {
      priceId: "price_pro_annual",
      tier:    "professional",
      modules: "bridges,mental,legal",
    },
  },
}));

vi.mock("@/lib/monitoring", () => ({
  captureError: (...args: unknown[]) => mockCaptureError(...args),
}));

// ─── Import route AFTER mocks are registered ─────────────────────────────────

const { POST } = await import("@/app/api/stripe/checkout/route");

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeReq(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/stripe/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe("POST /api/stripe/checkout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_URL = "https://cotrackpro.com";
  });

  it("returns 401 when user is not authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const res = await POST(makeReq({ plan: "parent_monthly" }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("Unauthorized");
  });

  it("returns 400 when request body is invalid JSON", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });

    const req = new NextRequest("http://localhost/api/stripe/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });

    const res = await POST(req);
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });

  it("returns 400 for an unknown plan key", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });

    const res = await POST(makeReq({ plan: "nonexistent_plan" }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid plan");
  });

  it("returns 400 when plan field is missing", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });

    const res = await POST(makeReq({}));
    expect(res.status).toBe(400);
  });

  it("creates a Stripe session and returns the redirect URL for valid plan", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: "test@example.com" }],
    });
    mockSessionCreate.mockResolvedValue({ url: "https://checkout.stripe.com/session123" });

    const res = await POST(makeReq({ plan: "parent_monthly" }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toBe("https://checkout.stripe.com/session123");
  });

  it("passes correct metadata to Stripe for the parent tier", async () => {
    mockAuth.mockResolvedValue({ userId: "user_xyz" });
    mockCurrentUser.mockResolvedValue({ emailAddresses: [] });
    mockSessionCreate.mockResolvedValue({ url: "https://stripe.test" });

    await POST(makeReq({ plan: "parent_monthly" }));

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        metadata: expect.objectContaining({ tier: "parent", userId: "user_xyz" }),
      }),
    );
  });

  it("returns 500 and calls captureError when Stripe throws", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({ emailAddresses: [] });
    mockSessionCreate.mockRejectedValue(new Error("Stripe network error"));

    const res = await POST(makeReq({ plan: "professional_monthly" }));
    expect(res.status).toBe(500);
    expect(mockCaptureError).toHaveBeenCalled();
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});
