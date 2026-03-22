/**
 * Unit tests for the Stripe portal API route.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

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
    billingPortal: {
      sessions: { create: (...args: unknown[]) => mockSessionCreate(...args) },
    },
  },
}));

vi.mock("@/lib/monitoring", () => ({
  captureError: (...args: unknown[]) => mockCaptureError(...args),
}));

const { POST } = await import("@/app/api/stripe/portal/route");

describe("POST /api/stripe/portal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.NEXT_PUBLIC_URL = "https://cotrackpro.com";
  });

  it("returns 401 when user is not authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null });

    const res = await POST();
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("Unauthorized");
  });

  it("returns 400 when user has no stripeCustomerId", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({ publicMetadata: {} });

    const res = await POST();
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("No billing account");
  });

  it("returns portal URL when customer exists", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({
      publicMetadata: { stripeCustomerId: "cus_test123" },
    });
    mockSessionCreate.mockResolvedValue({ url: "https://billing.stripe.com/session_abc" });

    const res = await POST();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.url).toBe("https://billing.stripe.com/session_abc");
  });

  it("passes the correct customer id and return_url to Stripe", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({
      publicMetadata: { stripeCustomerId: "cus_test123" },
    });
    mockSessionCreate.mockResolvedValue({ url: "https://billing.stripe.com/session_abc" });

    await POST();

    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        customer:   "cus_test123",
        return_url: "https://cotrackpro.com/billing",
      }),
    );
  });

  it("returns 500 and calls captureError when Stripe throws", async () => {
    mockAuth.mockResolvedValue({ userId: "user_abc" });
    mockCurrentUser.mockResolvedValue({
      publicMetadata: { stripeCustomerId: "cus_test123" },
    });
    mockSessionCreate.mockRejectedValue(new Error("Stripe portal error"));

    const res = await POST();
    expect(res.status).toBe(500);
    expect(mockCaptureError).toHaveBeenCalled();
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});
