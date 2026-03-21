/**
 * CoTrackPro MCP (Model Context Protocol) integration layer.
 *
 * Provides a typed client for calling the CoTrackPro MCP skill server.
 * All AI-powered features (incident summaries, de-escalation rewrites,
 * legal checklists, safety plans, etc.) route through this module.
 */

export type McpModule = "bridges" | "legal" | "mental" | "core";

export interface McpRequest {
  module: McpModule;
  action: string;
  payload: Record<string, unknown>;
  userId: string;
}

export interface McpResponse<T = unknown> {
  ok: boolean;
  data?: T;
  error?: string;
}

/** Route a request to the MCP content layer */
export async function mcpCall<T = unknown>(req: McpRequest): Promise<McpResponse<T>> {
  const endpoint = process.env.MCP_SERVER_URL;
  if (!endpoint) {
    // Development fallback — return mock response
    console.warn("[MCP] MCP_SERVER_URL not set — returning mock response");
    return { ok: true, data: { mock: true, ...req.payload } as T };
  }

  const res = await fetch(`${endpoint}/invoke`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MCP_API_KEY ?? ""}`,
    },
    body: JSON.stringify(req),
  });

  if (!res.ok) {
    const text = await res.text();
    return { ok: false, error: text };
  }

  const data = (await res.json()) as T;
  return { ok: true, data };
}

// ─── Convenience helpers per module ───────────────────────────────────────────

/** Generate a court-neutral narrative summary from raw notes */
export function bridgesSummary(userId: string, notes: string) {
  return mcpCall<{ summary: string; gaps: string[] }>({
    module: "bridges",
    action: "court_neutral_narrative_summary",
    payload: { notes },
    userId,
  });
}

/** Rewrite a message in a de-escalated, child-centered tone */
export function bridgesDeescalate(userId: string, message: string) {
  return mcpCall<{ rewritten: string; options: string[] }>({
    module: "bridges",
    action: "de_escalation_rewrite",
    payload: { message },
    userId,
  });
}

/** Generate a legal checklist for a given jurisdiction and case type */
export function legalChecklist(userId: string, jurisdiction: string, caseType: string) {
  return mcpCall<{ checklist: string[]; warnings: string[] }>({
    module: "legal",
    action: "case_checklist",
    payload: { jurisdiction, caseType },
    userId,
  });
}

/** Build a safety plan for a mental health session */
export function mentalSafetyPlan(userId: string, context: Record<string, unknown>) {
  return mcpCall<{ plan: string; resources: string[] }>({
    module: "mental",
    action: "safety_plan",
    payload: context,
    userId,
  });
}
