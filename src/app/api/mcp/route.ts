import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { mcpCall, McpModule } from "@/lib/mcp";

export async function POST(req: NextRequest) {
  const { userId, sessionClaims } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await req.json()) as {
    module: McpModule;
    action: string;
    payload: Record<string, unknown>;
  };

  // Verify user has access to the requested module
  const access = (sessionClaims?.metadata as Record<string, unknown>)?.access as
    | Record<string, boolean>
    | undefined;

  if (body.module !== "core" && !access?.[body.module]) {
    return NextResponse.json({ error: "Access denied — upgrade your plan" }, { status: 403 });
  }

  const result = await mcpCall({ ...body, userId });
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(result.data);
}
