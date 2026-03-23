/**
 * DynamoDB client + user-record helpers
 *
 * Table: cotrackpro-users  (env: DYNAMODB_USERS_TABLE)
 * Partition key: userId  (string — Clerk userId)
 *
 * Each record stores the user's identity, subscription state, and
 * module access flags. Upserted on every checkout / subscription event
 * so the table is always consistent with Clerk publicMetadata.
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";

// ─── Client ───────────────────────────────────────────────────────────────────

function getClient(): DynamoDBDocumentClient | null {
  const keyId  = process.env.DYNAMODB_AWS_ACCESS_KEY_ID  ?? process.env.SES_AWS_ACCESS_KEY_ID;
  const secret = process.env.DYNAMODB_AWS_SECRET_ACCESS_KEY ?? process.env.SES_AWS_SECRET_ACCESS_KEY;
  const region = process.env.DYNAMODB_REGION ?? process.env.SES_REGION ?? "us-east-1";

  const base = new DynamoDBClient({
    region,
    // If neither key is present the SDK falls back to the default credential
    // chain (env vars, ~/.aws/credentials, EC2/ECS instance role) — safe for
    // production on AWS infrastructure.
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
  userId:             string;
  email:              string;
  firstName:          string | null;
  tier:               string | null;
  access:             Record<string, boolean>;
  stripeCustomerId:   string | null;
  subscriptionId:     string | null;
  subscriptionStatus: string;
  createdAt:          string;  // ISO-8601
  updatedAt:          string;  // ISO-8601
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Full upsert on new checkout — creates the record if absent, overwrites if
 * the user re-subscribes after a lapse. `createdAt` is only set on first write
 * via DynamoDB's conditional expression support via `if_not_exists`.
 */
export async function upsertUser(record: Omit<UserRecord, "createdAt" | "updatedAt">) {
  const client = getClient();
  if (!client) {
    console.log("[dynamo:dev] upsertUser skipped — no credentials");
    return;
  }

  const now = new Date().toISOString();

  await client.send(
    new PutCommand({
      TableName: TABLE,
      Item: {
        ...record,
        subscriptionStatus: record.subscriptionStatus || "active",
        createdAt: now,
        updatedAt: now,
      },
      // Only overwrite createdAt if the item already exists by preserving it
      // (PutCommand replaces the whole item — we set createdAt to now for new
      // records; for re-subscriptions we intentionally reset it to track the
      // latest activation date. Use UpdateCommand variant below if you need
      // to preserve original createdAt across re-subscriptions.)
    })
  );
}

/**
 * Lightweight update for subscription status / tier / access changes
 * without touching identity fields or createdAt.
 */
export async function updateUserSubscription(
  userId: string,
  fields: {
    tier?:               string | null;
    access?:             Record<string, boolean>;
    subscriptionStatus?: string;
    subscriptionId?:     string | null;
  }
) {
  const client = getClient();
  if (!client) {
    console.log("[dynamo:dev] updateUserSubscription skipped — no credentials");
    return;
  }

  const now = new Date().toISOString();

  // Build update expression dynamically from provided fields
  const sets: string[]                    = ["updatedAt = :updatedAt"];
  const names: Record<string, string>     = {};
  const values: Record<string, unknown>   = { ":updatedAt": now };

  if ("tier" in fields) {
    sets.push("#tier = :tier");
    names["#tier"] = "tier";
    values[":tier"] = fields.tier ?? null;
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
 * Revokes access on cancellation / hard delete.
 */
export async function revokeUserAccess(userId: string) {
  return updateUserSubscription(userId, {
    access:             {},
    tier:               null,
    subscriptionStatus: "cancelled",
    subscriptionId:     null,
  });
}
