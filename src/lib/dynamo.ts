/**
 * DynamoDB client + user-record helpers
 *
 * Table: cotrackpro-users  (env: DYNAMODB_USERS_TABLE)
 * Partition key: userId  (string — Clerk userId)
 *
 * Schema is aligned with:
 *  - Stripe metadata: plan, tier, modules, billing
 *  - Clerk publicMetadata: access, tier, stripeCustomerId, subscriptionId
 *  - SES emails: email, firstName
 *
 * Attribute mapping:
 *   userId             PK (String)   — Clerk userId
 *   email              String        — primary email address
 *   firstName          String        — Clerk firstName (nullable)
 *   lastName           String        — Clerk lastName (nullable)
 *   plan               String        — Stripe plan key, e.g. "parent_monthly"
 *   tier               String        — "parent" | "professional" | null
 *   billing            String        — "monthly" | "annual" | null
 *   access             Map           — { bridges: true, mental: true, legal: true }
 *   stripeCustomerId   String        — cus_xxx
 *   subscriptionId     String        — sub_xxx
 *   subscriptionStatus String        — active | trialing | cancelled | past_due | …
 *   createdAt          String        — ISO-8601, set once, never overwritten
 *   updatedAt          String        — ISO-8601, refreshed on every mutation
 *
 * GSI recommendations (create in AWS Console / IaC):
 *   email-index        — PK: email       (for admin lookups by email)
 *   tier-index         — PK: tier        (for cohort analytics / bulk emails)
 *   stripeCustomer-index — PK: stripeCustomerId  (for Stripe webhook fallback lookups)
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// ─── Client ───────────────────────────────────────────────────────────────────

function getClient(): DynamoDBDocumentClient | null {
  const keyId  = process.env.DYNAMODB_AWS_ACCESS_KEY_ID  ?? process.env.SES_AWS_ACCESS_KEY_ID;
  const secret = process.env.DYNAMODB_AWS_SECRET_ACCESS_KEY ?? process.env.SES_AWS_SECRET_ACCESS_KEY;
  const region = process.env.DYNAMODB_REGION ?? process.env.SES_REGION ?? "us-east-1";

  const base = new DynamoDBClient({
    region,
    // If no explicit credentials are provided the SDK falls through to the
    // default credential chain: env vars → ~/.aws/credentials → IAM role.
    // This is safe and recommended for production on EC2 / ECS / Lambda.
    ...(keyId && secret
      ? { credentials: { accessKeyId: keyId, secretAccessKey: secret } }
      : {}),
  });

  return DynamoDBDocumentClient.from(base, {
    marshallOptions:   { removeUndefinedValues: true },
    unmarshallOptions: { wrapNumbers: false },
  });
}

const TABLE = process.env.DYNAMODB_USERS_TABLE ?? "cotrackpro-users";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UserRecord {
  /** Clerk userId — partition key */
  userId:             string;
  email:              string;
  firstName:          string | null;
  lastName:           string | null;
  /** Stripe plan key — e.g. "parent_monthly", "professional_annual" */
  plan:               string | null;
  /** Coarse tier used for access gating — "parent" | "professional" | null */
  tier:               string | null;
  /** Billing cadence — "monthly" | "annual" | null */
  billing:            "monthly" | "annual" | null;
  /** Module access map written by the webhook and mirrored in Clerk publicMetadata */
  access:             Record<string, boolean>;
  stripeCustomerId:   string | null;
  subscriptionId:     string | null;
  /** Stripe subscription.status string */
  subscriptionStatus: string;
  /** ISO-8601 — set once on first checkout, never overwritten */
  createdAt:          string;
  /** ISO-8601 — refreshed on every mutation */
  updatedAt:          string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Full upsert — safe for both first-time checkouts and re-subscriptions.
 *
 * Uses UpdateCommand so that `createdAt` is only written once (via
 * `if_not_exists`) — re-subscriptions preserve the original sign-up date
 * while all other fields are always overwritten to the latest values.
 */
export async function upsertUser(record: Omit<UserRecord, "createdAt" | "updatedAt">) {
  const client = getClient();
  if (!client) {
    console.log("[dynamo:dev] upsertUser skipped — no credentials configured");
    return;
  }

  const now = new Date().toISOString();

  await client.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { userId: record.userId },
      // `if_not_exists(createdAt, :now)` sets createdAt only when absent.
      // All other columns are always set to the latest values.
      UpdateExpression: `
        SET
          email              = :email,
          firstName          = :firstName,
          lastName           = :lastName,
          #plan              = :plan,
          #tier              = :tier,
          billing            = :billing,
          access             = :access,
          stripeCustomerId   = :stripeCustomerId,
          subscriptionId     = :subscriptionId,
          subscriptionStatus = :subscriptionStatus,
          createdAt          = if_not_exists(createdAt, :now),
          updatedAt          = :now
      `.trim(),
      ExpressionAttributeNames: {
        // "plan" and "tier" are reserved words in DynamoDB expression syntax
        "#plan": "plan",
        "#tier": "tier",
      },
      ExpressionAttributeValues: {
        ":email":              record.email,
        ":firstName":          record.firstName ?? null,
        ":lastName":           record.lastName  ?? null,
        ":plan":               record.plan      ?? null,
        ":tier":               record.tier      ?? null,
        ":billing":            record.billing   ?? null,
        ":access":             record.access,
        ":stripeCustomerId":   record.stripeCustomerId ?? null,
        ":subscriptionId":     record.subscriptionId  ?? null,
        ":subscriptionStatus": record.subscriptionStatus || "active",
        ":now":                now,
      },
    })
  );
}

/**
 * Lightweight subscription-state update — used when Stripe fires
 * subscription.updated or subscription.deleted events without a new checkout.
 *
 * Only mutates subscription columns; identity fields and createdAt are
 * left untouched. Safe to call even if a full upsert hasn't happened yet
 * (the UpdateCommand will create the item with just these fields, and the
 * next full upsert will backfill the identity columns).
 */
export async function updateUserSubscription(
  userId: string,
  fields: {
    plan?:               string | null;
    tier?:               string | null;
    billing?:            "monthly" | "annual" | null;
    access?:             Record<string, boolean>;
    subscriptionStatus?: string;
    subscriptionId?:     string | null;
  }
) {
  const client = getClient();
  if (!client) {
    console.log("[dynamo:dev] updateUserSubscription skipped — no credentials configured");
    return;
  }

  const now = new Date().toISOString();

  const sets: string[]                    = ["updatedAt = :updatedAt"];
  const names: Record<string, string>     = {};
  const values: Record<string, unknown>   = { ":updatedAt": now };

  if ("plan" in fields) {
    sets.push("#plan = :plan");
    names["#plan"] = "plan";
    values[":plan"] = fields.plan ?? null;
  }
  if ("tier" in fields) {
    sets.push("#tier = :tier");
    names["#tier"] = "tier";
    values[":tier"] = fields.tier ?? null;
  }
  if ("billing" in fields) {
    sets.push("billing = :billing");
    values[":billing"] = fields.billing ?? null;
  }
  if (fields.access !== undefined) {
    sets.push("access = :access");
    values[":access"] = fields.access;
  }
  if (fields.subscriptionStatus !== undefined) {
    sets.push("subscriptionStatus = :status");
    values[":status"] = fields.subscriptionStatus;
  }
  if ("subscriptionId" in fields) {
    sets.push("subscriptionId = :subId");
    values[":subId"] = fields.subscriptionId ?? null;
  }

  await client.send(
    new UpdateCommand({
      TableName: TABLE,
      Key: { userId },
      UpdateExpression: `SET ${sets.join(", ")}`,
      ...(Object.keys(names).length ? { ExpressionAttributeNames: names } : {}),
      ExpressionAttributeValues: values,
    })
  );
}

/**
 * Clears all subscription state on cancellation.
 * Identity fields (email, firstName, etc.) are preserved.
 */
export async function revokeUserAccess(userId: string) {
  return updateUserSubscription(userId, {
    plan:               null,
    tier:               null,
    billing:            null,
    access:             {},
    subscriptionStatus: "cancelled",
    subscriptionId:     null,
  });
}
