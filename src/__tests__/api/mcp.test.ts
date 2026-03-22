/**
 * Unit tests for the MCP API route.
 *
 * Verifies auth, body validation, module access-control, and MCP dispatch.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { NextRequest } from "next/server";

const mockAuth        = vi.fn();
const mockMcpCall     = vi.fn();
const mockCaptureError = vi.fn();

vi.mock("@clerk/nextjs/server", () => ({
  auth: () => mockAuth(),
}));

vi.mock("@/lib/mcp", () => ({
  mcpCall: (...args: unknown[]) => mockMcpCall(...args),
}));

vi.mock("@/lib/monitoring", () => ({
  captureError: (...args: unknown[]) => mockCaptureError(...args),
}));

const { POST } = await import("@/app/api/mcp/route");

function makeReq(body: unknown): NextRequest {
  return new NextRequest("http://localhost/api/mcp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

function withAccess(modules: string[]) {
  const access = Object.fromEntries(modules.map((m) => [m, true]));
  return {
    userId: "user_123",
    sessionClaims: { metadata: { access } },
  };
}

describe("POST /api/mcp", () => {
  beforeEach(() => vi.clearAllMocks());

  // ── Auth ────────────────────────────────────────────────────────────────────

  it("returns 401 when user is not authenticated", async () => {
    mockAuth.mockResolvedValue({ userId: null, sessionClaims: null });

    const res = await POST(makeReq({ module: "bridges", action: "test", payload: {} }));
    expect(res.status).toBe(401);
    const body = await res.json();
    expect(body.error).toContain("Unauthorized");
  });

  // ── Body validation ─────────────────────────────────────────────────────────

  it("returns 400 for invalid JSON body", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"]));

    const req = new NextRequest("http://localhost/api/mcp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not-json",
    });
    const res = await POST(req);
    expect(res.status).toBe(400);
  });

  it("returns 400 when module field is missing", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"]));

    const res = await POST(makeReq({ action: "test", payload: {} }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("module");
  });

  it("returns 400 when action field is missing", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"]));

    const res = await POST(makeReq({ module: "bridges", payload: {} }));
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("action");
  });

  // ── Access control ──────────────────────────────────────────────────────────

  it("returns 403 when user lacks access to the requested module", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"])); // no 'legal' access

    const res = await POST(makeReq({ module: "legal", action: "checklist", payload: {} }));
    expect(res.status).toBe(403);
    const body = await res.json();
    expect(body.error).toContain("Access denied");
  });

  it("allows 'core' module regardless of access map", async () => {
    mockAuth.mockResolvedValue({ userId: "user_123", sessionClaims: { metadata: { access: {} } } });
    mockMcpCall.mockResolvedValue({ ok: true, data: { result: "ok" } });

    const res = await POST(makeReq({ module: "core", action: "ping", payload: {} }));
    expect(res.status).toBe(200);
  });

  it("allows access when user has the requested module in their access map", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges", "mental"]));
    mockMcpCall.mockResolvedValue({ ok: true, data: { summary: "test summary" } });

    const res = await POST(makeReq({ module: "bridges", action: "court_neutral_narrative_summary", payload: { notes: "..." } }));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.summary).toBe("test summary");
  });

  // ── MCP dispatch ────────────────────────────────────────────────────────────

  it("passes userId and body fields to mcpCall", async () => {
    mockAuth.mockResolvedValue(withAccess(["mental"]));
    mockMcpCall.mockResolvedValue({ ok: true, data: {} });

    await POST(makeReq({ module: "mental", action: "safety_plan", payload: { notes: "urgent" } }));

    expect(mockMcpCall).toHaveBeenCalledWith(
      expect.objectContaining({
        module:  "mental",
        action:  "safety_plan",
        userId:  "user_123",
        payload: { notes: "urgent" },
      }),
    );
  });

  it("returns 500 when MCP responds with ok: false", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"]));
    mockMcpCall.mockResolvedValue({ ok: false, error: "MCP upstream error" });

    const res = await POST(makeReq({ module: "bridges", action: "summary", payload: {} }));
    expect(res.status).toBe(500);
    const body = await res.json();
    expect(body.error).toContain("MCP upstream error");
  });

  it("returns 500 and calls captureError when mcpCall throws", async () => {
    mockAuth.mockResolvedValue(withAccess(["bridges"]));
    mockMcpCall.mockRejectedValue(new Error("Network failure"));

    const res = await POST(makeReq({ module: "bridges", action: "summary", payload: {} }));
    expect(res.status).toBe(500);
    expect(mockCaptureError).toHaveBeenCalled();
    const body = await res.json();
    expect(body.error).toBeTruthy();
  });
});
