/**
 * Environment variable validation
 *
 * Validated once at module load — throws a clear error immediately
 * if any required variable is missing or malformed, rather than
 * failing silently at runtime.
 *
 * Import from here instead of process.env directly:
 *   import { env } from "@/lib/env"
 */

import { z } from "zod";

// ─── Schema ───────────────────────────────────────────────────────────────────

const serverSchema = z.object({

  // App
  NODE_ENV:        z.enum(["development", "test", "production"]).default("development"),
  APP_ENVIRONMENT: z.enum(["prod", "staging", "development"]).default("development"),

  // Security
  JWT_SECRET:       z.string().min(32, "JWT_SECRET must be at least 32 chars"),
  ENCRYPTION_KEY:   z.string().min(32, "ENCRYPTION_KEY must be at least 32 chars"),
  SESSION_SECRET:   z.string().min(32, "SESSION_SECRET must be at least 32 chars"),

  // Stripe — keys
  STRIPE_SECRET_KEY:      z.string().startsWith("sk_", "Must be a Stripe secret key (sk_...)"),
  STRIPE_WEBHOOK_SECRET:  z.string().startsWith("whsec_", "Must be a Stripe webhook secret (whsec_...)"),

  // Stripe — prices
  STRIPE_PRICE_PARENT_MONTHLY:        z.string().startsWith("price_"),
  STRIPE_PRICE_PARENT_ANNUAL:         z.string().startsWith("price_"),
  STRIPE_PRICE_PROFESSIONAL_MONTHLY:  z.string().startsWith("price_"),
  STRIPE_PRICE_PROFESSIONAL_ANNUAL:   z.string().startsWith("price_"),

  // Clerk
  CLERK_SECRET_KEY: z.string().startsWith("sk_", "Must be a Clerk secret key (sk_...)"),

  // SES — credentials optional (email logs to console in dev if missing)
  SES_FROM_ADDRESS:          z.string().default("CoTrackPro <admin@cotrackpro.com>"),
  SES_REGION:                z.string().default("us-east-1"),
  SES_AWS_ACCESS_KEY_ID:     z.string().optional(),
  SES_AWS_SECRET_ACCESS_KEY: z.string().optional(),

  // DynamoDB — optional dedicated credentials (falls back to SES creds then
  // to the default AWS credential chain, e.g. an IAM role on EC2/ECS)
  DYNAMODB_AWS_ACCESS_KEY_ID:     z.string().optional(),
  DYNAMODB_AWS_SECRET_ACCESS_KEY: z.string().optional(),
  DYNAMODB_REGION:                z.string().default("us-east-1"),

  // AI — optional (app runs in mock mode without them)
  // empty string treated as "not set" via .transform
  AI_DEFAULT_PROVIDER: z.enum(["anthropic", "openai", "gemini"]).default("anthropic"),
  ANTHROPIC_API_KEY:   z.string().optional().transform(v => v || undefined),
  OPENAI_API_KEY:      z.string().optional().transform(v => v || undefined),
  GEMINI_API_KEY:      z.string().optional().transform(v => v || undefined),

  // ElevenLabs — optional
  ELEVENLABS_API_KEY:  z.string().optional().transform(v => v || undefined),
  ELEVENLABS_VOICE_ID: z.string().optional().transform(v => v || undefined),

  // MCP — optional (mock mode if missing)
  MCP_SERVER_URL: z.string().optional().transform(v => v || undefined),
  MCP_API_KEY:    z.string().optional().transform(v => v || undefined),

  // Infrastructure
  S3_ASSETS_BUCKET:      z.string().default("cotrackpro-assets"),
  DYNAMODB_USERS_TABLE:  z.string().default("cotrackpro-users"),

  // Highlight.io — optional (monitoring disabled if missing)
  HIGHLIGHT_PROJECT_ID: z.string().optional(),
});

const clientSchema = z.object({
  NEXT_PUBLIC_URL:                      z.string().url("NEXT_PUBLIC_URL must be a valid URL"),
  NEXT_PUBLIC_APP_NAME:                 z.string().default("CoTrackPro"),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:    z.string().startsWith("pk_", "Must be a Clerk publishable key (pk_...)"),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY:   z.string().startsWith("pk_").optional().transform(v => v || undefined),
  NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID:     z.string().optional(),
});

// ─── Validation ───────────────────────────────────────────────────────────────

function validateEnv() {
  // Client schema is safe to validate anywhere
  const clientResult = clientSchema.safeParse({
    NEXT_PUBLIC_URL:                    process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_APP_NAME:               process.env.NEXT_PUBLIC_APP_NAME,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID:   process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID,
  });

  // Server schema only available server-side
  if (typeof window !== "undefined") {
    if (!clientResult.success) {
      throw new Error(
        `❌ Invalid client env vars:\n${clientResult.error.issues
          .map((i) => `  ${i.path.join(".")}: ${i.message}`)
          .join("\n")}`
      );
    }
    return { ...clientResult.data } as typeof clientResult.data & z.infer<typeof serverSchema>;
  }

  const serverResult = serverSchema.safeParse(process.env);

  const errors = [
    ...(clientResult.success ? [] : clientResult.error.issues),
    ...(serverResult.success ? [] : serverResult.error.issues),
  ];

  if (errors.length > 0) {
    throw new Error(
      `❌ Invalid environment variables — fix before deploying:\n\n` +
      errors.map((i) => `  ${i.path.join(".")}: ${i.message}`).join("\n") +
      `\n\nRun: npm run secrets  (to pull from AWS SSM)`
    );
  }

  return {
    ...clientResult.data,
    ...serverResult.data,
  };
}

export const env = validateEnv();
