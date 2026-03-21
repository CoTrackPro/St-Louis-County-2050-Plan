/**
 * Pull secrets from AWS SSM Parameter Store into .env.local
 *
 * Usage:
 *   node scripts/pull-secrets.mjs
 *
 * Prerequisites:
 *   AWS credentials configured (aws configure or AWS_PROFILE env var)
 *   Region: us-east-1
 *
 * Paths follow the new /cotrackpro/prod/... structure.
 * Old flat paths (/stripe/api/key, /clerk/...) are kept as
 * LEGACY fallbacks until you confirm the new params are live.
 */

import { SSMClient, GetParameterCommand, GetParametersCommand } from "@aws-sdk/client-ssm";
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ENV_FILE   = join(__dirname, "../.env.local");
const REGION     = "us-east-1";

// ─────────────────────────────────────────────────────────────────────────────
// SSM path → .env.local key
// Groups marked so you can see what maps to what at a glance
// ─────────────────────────────────────────────────────────────────────────────
const SSM_MAP = {

  // ── CORE ──────────────────────────────────────────────────────────────────
  "/cotrackpro/prod/core/app/name":                   "NEXT_PUBLIC_APP_NAME",
  "/cotrackpro/prod/core/app/base_url":               "NEXT_PUBLIC_URL",
  "/cotrackpro/prod/core/app/environment":            "APP_ENVIRONMENT",
  "/cotrackpro/prod/core/security/jwt_secret":        "JWT_SECRET",
  "/cotrackpro/prod/core/security/encryption_key":    "ENCRYPTION_KEY",
  "/cotrackpro/prod/core/security/session_secret":    "SESSION_SECRET",

  // ── STRIPE — PRODUCTS ─────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/stripe/products/parent":        "STRIPE_PRODUCT_PARENT",
  "/cotrackpro/prod/integrations/stripe/products/professional":  "STRIPE_PRODUCT_PROFESSIONAL",

  // ── STRIPE — PRICES ───────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/stripe/prices/parent/monthly":        "STRIPE_PRICE_PARENT_MONTHLY",
  "/cotrackpro/prod/integrations/stripe/prices/parent/annual":         "STRIPE_PRICE_PARENT_ANNUAL",
  "/cotrackpro/prod/integrations/stripe/prices/professional/monthly":  "STRIPE_PRICE_PROFESSIONAL_MONTHLY",
  "/cotrackpro/prod/integrations/stripe/prices/professional/annual":   "STRIPE_PRICE_PROFESSIONAL_ANNUAL",

  // ── STRIPE — KEYS ─────────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/stripe/publishable_key":  "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY",
  "/cotrackpro/prod/integrations/stripe/secret_key":       "STRIPE_SECRET_KEY",
  "/cotrackpro/prod/integrations/stripe/webhook_secret":   "STRIPE_WEBHOOK_SECRET",

  // ── AI — PROVIDER SWITCH ──────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/ai/default_provider":  "AI_DEFAULT_PROVIDER",
  "/cotrackpro/prod/integrations/ai/anthropic_api_key": "ANTHROPIC_API_KEY",
  "/cotrackpro/prod/integrations/ai/openai_api_key":    "OPENAI_API_KEY",
  "/cotrackpro/prod/integrations/ai/gemini_api_key":    "GEMINI_API_KEY",

  // ── ELEVENLABS ────────────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/elevenlabs/api_key":  "ELEVENLABS_API_KEY",
  "/cotrackpro/prod/integrations/elevenlabs/voice_id": "ELEVENLABS_VOICE_ID",

  // ── CLERK ─────────────────────────────────────────────────────────────────
  "/cotrackpro/prod/platform/clerk/publishable_key":  "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "/cotrackpro/prod/platform/clerk/secret_key":       "CLERK_SECRET_KEY",

  // ── VERCEL ────────────────────────────────────────────────────────────────
  "/cotrackpro/prod/platform/vercel/project_id":  "VERCEL_PROJECT_ID",
  "/cotrackpro/prod/platform/vercel/api_token":   "VERCEL_API_TOKEN",

  // ── MAILCHIMP ─────────────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/mailchimp/api_key": "MAILCHIMP_API_KEY",

  // ── SES ───────────────────────────────────────────────────────────────────
  "/cotrackpro/prod/integrations/ses/from_address": "SES_FROM_ADDRESS",

  // ── INFRASTRUCTURE ────────────────────────────────────────────────────────
  "/cotrackpro/prod/infrastructure/s3/assets_bucket":       "S3_ASSETS_BUCKET",
  "/cotrackpro/prod/infrastructure/dynamodb/users_table":   "DYNAMODB_USERS_TABLE",

  // ── HIGHLIGHT.IO ──────────────────────────────────────────────────────────
  "/cotrackpro/prod/monitoring/highlight/project_id": "HIGHLIGHT_PROJECT_ID",
};

// Legacy paths — kept until new /cotrackpro/prod paths are confirmed live.
// These will be skipped automatically if they no longer exist in SSM.
const LEGACY_MAP = {
  "/stripe/api/key":                          "STRIPE_SECRET_KEY",
  "/stripe/webhook/secret":                   "STRIPE_WEBHOOK_SECRET",
  "/clerk/CLERK_SECRET_KEY":                  "CLERK_SECRET_KEY",
  "/clerk/NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY": "NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY",
  "/ses/from_address":                        "SES_FROM_ADDRESS",
  "/ses/aws_access_key_id":                   "SES_AWS_ACCESS_KEY_ID",
  "/ses/aws_secret_access_key":               "SES_AWS_SECRET_ACCESS_KEY",
};

// ─────────────────────────────────────────────────────────────────────────────

const client = new SSMClient({ region: REGION });

async function fetchParam(path) {
  const res = await client.send(
    new GetParameterCommand({ Name: path, WithDecryption: true })
  );
  return res.Parameter?.Value ?? "";
}

function parseEnv(content) {
  const map = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const idx = trimmed.indexOf("=");
    if (idx === -1) continue;
    map[trimmed.slice(0, idx)] = trimmed.slice(idx + 1);
  }
  return map;
}

function serializeEnv(map) {
  const sections = {
    "# App": ["NEXT_PUBLIC_APP_NAME", "NEXT_PUBLIC_URL", "APP_ENVIRONMENT"],
    "# Security": ["JWT_SECRET", "ENCRYPTION_KEY", "SESSION_SECRET"],
    "# Stripe — Products": ["STRIPE_PRODUCT_PARENT", "STRIPE_PRODUCT_PROFESSIONAL"],
    "# Stripe — Prices": [
      "STRIPE_PRICE_PARENT_MONTHLY", "STRIPE_PRICE_PARENT_ANNUAL",
      "STRIPE_PRICE_PROFESSIONAL_MONTHLY", "STRIPE_PRICE_PROFESSIONAL_ANNUAL",
    ],
    "# Stripe — Keys": [
      "NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET",
    ],
    "# AI": ["AI_DEFAULT_PROVIDER", "ANTHROPIC_API_KEY", "OPENAI_API_KEY", "GEMINI_API_KEY"],
    "# ElevenLabs": ["ELEVENLABS_API_KEY", "ELEVENLABS_VOICE_ID"],
    "# Clerk": ["NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY", "CLERK_SECRET_KEY"],
    "# Vercel": ["VERCEL_PROJECT_ID", "VERCEL_API_TOKEN"],
    "# Mailchimp": ["MAILCHIMP_API_KEY"],
    "# SES": ["SES_FROM_ADDRESS", "SES_AWS_ACCESS_KEY_ID", "SES_AWS_SECRET_ACCESS_KEY"],
    "# Infrastructure": ["S3_ASSETS_BUCKET", "DYNAMODB_USERS_TABLE"],
    "# Highlight.io": ["HIGHLIGHT_PROJECT_ID"],
    "# Clerk routing (static)": [
      "NEXT_PUBLIC_CLERK_SIGN_IN_URL",
      "NEXT_PUBLIC_CLERK_SIGN_UP_URL",
      "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL",
      "NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL",
    ],
  };

  const written = new Set();
  let out = "";

  for (const [header, keys] of Object.entries(sections)) {
    const lines = keys
      .filter(k => map[k] !== undefined)
      .map(k => { written.add(k); return `${k}=${map[k]}`; });
    if (lines.length) {
      out += `\n${header}\n${lines.join("\n")}\n`;
    }
  }

  // Append any remaining keys not in sections
  const remaining = Object.entries(map)
    .filter(([k]) => !written.has(k))
    .map(([k, v]) => `${k}=${v}`);
  if (remaining.length) {
    out += `\n# Other\n${remaining.join("\n")}\n`;
  }

  return out.trimStart();
}

async function pullMap(label, map, existing) {
  console.log(`\n${label}`);
  let ok = 0, skip = 0, fail = 0;

  for (const [ssmPath, envKey] of Object.entries(map)) {
    try {
      const value = await fetchParam(ssmPath);
      if (value === "REPLACE_ME" || value === "") {
        console.log(`  ⚠   ${envKey.padEnd(42)} ← skipped (REPLACE_ME / empty)`);
        skip++;
      } else {
        existing[envKey] = value;
        console.log(`  ✓   ${envKey.padEnd(42)} ← ${ssmPath}`);
        ok++;
      }
    } catch (err) {
      if (err.name === "ParameterNotFound") {
        console.log(`  –   ${envKey.padEnd(42)} ← not found in SSM (skipped)`);
      } else {
        console.error(`  ✗   ${envKey.padEnd(42)} ← ${err.message}`);
        fail++;
      }
    }
  }

  return { ok, skip, fail };
}

async function main() {
  const existing = existsSync(ENV_FILE)
    ? parseEnv(readFileSync(ENV_FILE, "utf8"))
    : {};

  // Preserve static Clerk routing keys if already set
  const STATIC_DEFAULTS = {
    NEXT_PUBLIC_CLERK_SIGN_IN_URL:         "/sign-in",
    NEXT_PUBLIC_CLERK_SIGN_UP_URL:         "/sign-up",
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:   "/dashboard",
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:   "/billing",
  };
  for (const [k, v] of Object.entries(STATIC_DEFAULTS)) {
    if (!existing[k]) existing[k] = v;
  }

  console.log("═══════════════════════════════════════════════════════");
  console.log("  CoTrackPro — SSM → .env.local                       ");
  console.log("  Region: us-east-1                                    ");
  console.log("═══════════════════════════════════════════════════════");

  const newStats    = await pullMap("▶ New paths (/cotrackpro/prod/...)", SSM_MAP, existing);
  const legacyStats = await pullMap("▶ Legacy paths (fallback)", LEGACY_MAP, existing);

  writeFileSync(ENV_FILE, serializeEnv(existing));

  const total = newStats.ok + legacyStats.ok;
  const skipped = newStats.skip + legacyStats.skip;
  const failed = newStats.fail + legacyStats.fail;

  console.log("\n═══════════════════════════════════════════════════════");
  console.log(`  ✅  ${total} secrets written to .env.local`);
  if (skipped) console.log(`  ⚠   ${skipped} skipped (REPLACE_ME or empty)`);
  if (failed)  console.log(`  ✗   ${failed} errors — check AWS credentials/permissions`);
  console.log("═══════════════════════════════════════════════════════\n");

  if (skipped > 0) {
    console.log("Next: fill the REPLACE_ME values in SSM, then re-run.");
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
