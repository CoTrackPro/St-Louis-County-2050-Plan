/**
 * Unit tests for the Stripe webhook API route.
 *
 * WEBHOOK_SECRET is a module-level constant, so it must be set in the
 * environment BEFORE the module is imported.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockConstructEvent = vi.fn();
const mockCaptureError   = vi.fn();
const mockSendWelcome    = vi.fn();
const mockSendRevoked    = vi.fn();
const mockSendFailed     = vi.fn();
const mockUpdateMetadata = vi.fn();
const mockGetUser        = vi.fn();

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: { constructEvent: (...args: unknown[]) => mockConstructEvent(...args) },
  },
}));

vi.mock("@clerk/nextjs/server", () => ({
  clerkClient: () =>
    Promise.resolve({
      users: {
        updateUserMetadata: (...args: unknown[]) => mockUpdateMetadata(...args),
        getUser:            (...args: unknown[]) => mockGetUser(...args),
      },
    }),
}));

vi.mock("@/lib/email", () => ({
  sendWelcomeEmail:       (...args: unknown[]) => mockSendWelcome(...args),
  sendAccessRevokedEmail: (...args: unknown[]) => mockSendRevoked(...args),
  sendPaymentFailedEmail: (...args: unknown[]) => mockSendFailed(...args),
}));

vi.mock("@/lib/monitoring", () => ({
  captureError: (...args: unknown[]) => mockCaptureError(...args),
}));

// Must be set BEFORE import — WEBHOOK_SECRET is captured at module load time
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
const { POST } = await import("@/app/api/stripe/webhook/route");

function makeReq(body: string, sig: string | null = "valid-sig") {
  const headers: Record<string, string> = { "Content-Type": "text/plain" };
  if (sig) headers["stripe-signature"] = sig;
  return new NextRequest("http://localhost/api/stripe/webhook", { method: "POST", body, headers });
}

describe("POST /api/stripe/webhook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUpdateMetadata.mockResolvedValue({});
    mockGetUser.mockResolvedValue({
      emailAddresses: [{ emailAddress: "user@example.com" }],
      firstName: "Test",
    });
  });

  it("returns 400 when stripe-signature header is missing", async () => {
    const res = await POST(makeReq("body", null));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Missing stripe-signature");
  });

  it("returns 400 when Stripe signature verification fails", async () => {
    mockConstructEvent.mockImplementation(() => {
      throw new Error("Invalid signature");
    });
    const res = await POST(makeReq("body"));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("Invalid signature");
  });

  it("handles checkout.session.completed and updates Clerk metadata", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: { userId: "user_123", modules: "bridges,mental", tier: "parent" },
          customer:     "cus_abc",
          subscription: "sub_abc",
        },
      },
    });

    const res = await POST(makeReq("body"));
    expect(res.status).toBe(200);
    expect(mockUpdateMetadata).toHaveBeenCalledWith(
      "user_123",
      expect.objectContaining({
        publicMetadata: expect.objectContaining({ tier: "parent" }),
      }),
    );
    expect(mockSendWelcome).toHaveBeenCalled();
  });

  it("handles customer.subscription.deleted — clears metadata and sends revoke email", async () => {
    mockConstructEvent.mockReturnValue({
      type: "customer.subscription.deleted",
      data: { object: { metadata: { userId: "user_123" } } },
    });

    const res = await POST(makeReq("body"));
    expect(res.status).toBe(200);
    expect(mockUpdateMetadata).toHaveBeenCalledWith(
      "user_123",
      expect.objectContaining({
        publicMetadata: expect.objectContaining({ access: {}, tier: null }),
      }),
    );
    expect(mockSendRevoked).toHaveBeenCalled();
  });

  it("returns 200 for unrecognised event types (no-op)", async () => {
    mockConstructEvent.mockReturnValue({
      type: "payment_intent.created",
      data: { object: {} },
    });

    const res = await POST(makeReq("body"));
    expect(res.status).toBe(200);
  });

  it("returns 500 and calls captureError when a handler throws", async () => {
    mockConstructEvent.mockReturnValue({
      type: "checkout.session.completed",
      data: {
        object: {
          metadata: { userId: "user_123", modules: "bridges", tier: "parent" },
          customer: "cus_abc",
          subscription: "sub_abc",
        },
      },
    });
    mockUpdateMetadata.mockRejectedValue(new Error("Clerk API failure"));

    const res = await POST(makeReq("body"));
    expect(res.status).toBe(500);
    expect(mockCaptureError).toHaveBeenCalled();
  });
});
