import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { mcpCall, McpModule } from "@/lib/mcp";
import { captureError } from "@/lib/monitoring";

export async function POST(req: NextRequest) {
  // ── Auth ─────────────────────────────────────────────────────────────────
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // ── Parse body ───────────────────────────────────────────────────────────
  let body: { module: McpModule; action: string; payload: Record<string, unknown> };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (!body.module || !body.action) {
    return NextResponse.json({ error: "Missing required fields: module, action" }, { status: 400 });
  }

  // ── Access check ─────────────────────────────────────────────────────────
  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  if (body.module !== "core" && !access?.[body.module]) {
    return NextResponse.json({ error: "Access denied — upgrade your plan" }, { status: 403 });
  }

  // ── Call MCP ─────────────────────────────────────────────────────────────
  try {
    const result = await mcpCall({ ...body, userId });
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }
    return NextResponse.json(result.data);
  } catch (err) {
    captureError(err, { context: "mcp-call", module: body.module, action: body.action, userId });
    const message = err instanceof Error ? err.message : "MCP call failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
