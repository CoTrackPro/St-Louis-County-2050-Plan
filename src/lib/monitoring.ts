/**
 * CoTrackPro error monitoring — Highlight.io
 *
 * Free tier: unlimited errors, 500 sessions/mo, 1 month retention
 * Upgrade path: self-host on EC2 if you outgrow free tier (open source)
 *
 * Setup:
 *   1. Sign up at app.highlight.io
 *   2. Create project "cotrackpro"
 *   3. Copy your Project ID (numeric, e.g. "1jdkoe52")
 *   4. Add to SSM: /cotrackpro/prod/monitoring/highlight/project_id
 *
 * Usage (server-side):
 *   import { captureError } from "@/lib/monitoring"
 *   captureError(err, { context: "stripe-webhook", userId })
 *
 * Client-side is handled automatically by <HighlightInit /> in layout.tsx
 */

import { H } from "@highlight-run/next/server";

const PROJECT_ID = process.env.HIGHLIGHT_PROJECT_ID ?? "";
const isProd     = process.env.NODE_ENV === "production";

/** Initialize Highlight on the server (call once at module load) */
export function initHighlight() {
  if (!isProd || !PROJECT_ID) return;
  H.init({ projectID: PROJECT_ID });
}

/**
 * Capture an error with optional metadata.
 * Falls back to console.error in dev or if Highlight is not configured.
 */
export function captureError(
  err: unknown,
  meta: Record<string, string | number | boolean> = {}
) {
  const error = err instanceof Error ? err : new Error(String(err));

  if (!isProd || !PROJECT_ID) {
    console.error("[captureError]", error.message, meta);
    return;
  }

  // Signature: consumeError(error, secureSessionId?, requestId?, metadata?)
  H.consumeError(error, undefined, undefined, meta);
}

/**
 * Identify a user in Highlight (client-side only).
 * Call this from a client component after Clerk auth resolves.
 * Uses the browser-side Highlight SDK, not the server H interface.
 *
 * Example in a client component:
 *   import { identifyUser } from "@/lib/monitoring"
 *   identifyUser(userId, email)
 */
export function identifyUser(userId: string, email?: string) {
  if (typeof window === "undefined") return; // server-safe guard
  if (!PROJECT_ID) return;
  // Dynamically import client SDK to avoid server-side type conflicts
  import("highlight.run").then(({ H: ClientH }) => {
    ClientH.identify(email ?? userId, { id: userId });
  }).catch(() => {/* silently ignore if not loaded */});
}

// Initialize on import (server-side only)
initHighlight();
