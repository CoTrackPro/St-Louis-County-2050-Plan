/**
 * Migrate user data from Replit → DynamoDB
 *
 * Supports two export formats from Replit:
 *   1. Replit DB (key-value JSON export)
 *   2. PostgreSQL CSV export (users table)
 *
 * Usage:
 *   # From a Replit DB JSON dump:
 *   node scripts/migrate-from-replit.mjs --source replit-db --file ./replit-export.json
 *
 *   # From a PostgreSQL CSV export:
 *   node scripts/migrate-from-replit.mjs --source postgres-csv --file ./users.csv
 *
 *   # Dry run (no writes):
 *   node scripts/migrate-from-replit.mjs --source replit-db --file ./export.json --dry-run
 *
 * To export your data from Replit:
 *   Replit DB:   In your Replit shell → curl $REPLIT_DB_URL > replit-export.json
 *   PostgreSQL:  In your Replit shell → psql $DATABASE_URL -c "\COPY users TO STDOUT WITH CSV HEADER" > users.csv
 *
 * Prerequisites:
 *   AWS credentials configured (aws configure or AWS_PROFILE env var)
 *   Region: us-east-1
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { readFileSync, existsSync } from "fs";
import { createReadStream } from "fs";
import { createInterface } from "readline";

// ─── Config ───────────────────────────────────────────────────────────────────

const REGION = process.env.DYNAMODB_REGION ?? "us-east-1";
const USERS_TABLE = process.env.DYNAMODB_USERS_TABLE ?? "cotrackpro-users";

const args = process.argv.slice(2);
const getArg = (flag) => { const i = args.indexOf(flag); return i >= 0 ? args[i + 1] : null; };
const hasFlag = (flag) => args.includes(flag);

const SOURCE   = getArg("--source");   // "replit-db" | "postgres-csv"
const FILE     = getArg("--file");
const DRY_RUN  = hasFlag("--dry-run");
const SKIP_EXISTING = hasFlag("--skip-existing");

if (!SOURCE || !FILE) {
  console.error("Usage: node migrate-from-replit.mjs --source <replit-db|postgres-csv> --file <path> [--dry-run] [--skip-existing]");
  process.exit(1);
}
if (!existsSync(FILE)) {
  console.error(`File not found: ${FILE}`);
  process.exit(1);
}

// ─── DynamoDB client ──────────────────────────────────────────────────────────

const base = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(base, {
  marshallOptions:   { removeUndefinedValues: true },
  unmarshallOptions: { wrapNumbers: false },
});

// ─── Parsers ──────────────────────────────────────────────────────────────────

/**
 * Parse a Replit DB JSON export.
 *
 * Replit DB stores data as key-value pairs. CoTrackPro typically uses:
 *   users:{clerkUserId}  → JSON user object
 *
 * The dump from `curl $REPLIT_DB_URL` returns JSON: { "key": "value", ... }
 */
function parseReplitDb(filePath) {
  const raw = JSON.parse(readFileSync(filePath, "utf8"));
  const users = [];

  for (const [key, rawValue] of Object.entries(raw)) {
    if (!key.startsWith("user:") && !key.startsWith("users:")) continue;

    let data;
    try {
      data = typeof rawValue === "string" ? JSON.parse(rawValue) : rawValue;
    } catch {
      console.warn(`  ⚠  Could not parse value for key "${key}" — skipping`);
      continue;
    }

    const userId = data.userId ?? data.id ?? data.clerkUserId ?? key.split(":")[1];
    if (!userId) {
      console.warn(`  ⚠  No userId found for key "${key}" — skipping`);
      continue;
    }

    users.push(normalizeUser({ userId, ...data }));
  }

  return users;
}

/**
 * Parse a PostgreSQL CSV export of the users table.
 * Reads column headers from the first line.
 */
async function parsePostgresCsv(filePath) {
  return new Promise((resolve, reject) => {
    const users = [];
    const rl = createInterface({ input: createReadStream(filePath) });
    let headers = null;

    rl.on("line", (line) => {
      if (!headers) {
        headers = line.split(",").map(h => h.trim().replace(/^"|"$/g, ""));
        return;
      }
      const values = parseCsvLine(line);
      const row = Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ""]));
      const userId = row.clerk_user_id ?? row.userId ?? row.user_id ?? row.id;
      if (!userId) return;
      users.push(normalizeUser({ userId, ...row }));
    });

    rl.on("close", () => resolve(users));
    rl.on("error", reject);
  });
}

/** Simple CSV line parser that handles quoted fields */
function parseCsvLine(line) {
  const result = [];
  let current = "";
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      inQuotes = !inQuotes;
    } else if (ch === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
    } else {
      current += ch;
    }
  }
  result.push(current.trim());
  return result;
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

/**
 * Map Replit data shape → CoTrackPro DynamoDB UserRecord shape.
 *
 * Adjust the field mappings below to match your actual Replit data structure.
 */
function normalizeUser(raw) {
  const now = new Date().toISOString();

  // Resolve billing cadence
  let billing = raw.billing ?? null;
  if (!billing) {
    if (raw.plan?.includes("annual") || raw.subscriptionPlan?.includes("annual")) billing = "annual";
    else if (raw.plan?.includes("monthly") || raw.subscriptionPlan?.includes("monthly")) billing = "monthly";
  }

  // Resolve tier from plan
  let tier = raw.tier ?? null;
  if (!tier && raw.plan) {
    if (raw.plan.startsWith("professional") || raw.plan === "pro") tier = "professional";
    else if (raw.plan.startsWith("parent") || raw.plan === "basic") tier = "parent";
  }

  // Resolve access map
  let access = raw.access ?? raw.modules ?? {};
  if (typeof access === "string") {
    try { access = JSON.parse(access); } catch { access = {}; }
  }

  return {
    userId:             String(raw.userId ?? raw.id ?? raw.clerkUserId),
    email:              String(raw.email ?? ""),
    firstName:          raw.firstName ?? raw.first_name ?? null,
    lastName:           raw.lastName  ?? raw.last_name  ?? null,
    plan:               raw.plan ?? raw.subscriptionPlan ?? null,
    tier,
    billing,
    access:             typeof access === "object" && !Array.isArray(access) ? access : {},
    stripeCustomerId:   raw.stripeCustomerId ?? raw.stripe_customer_id ?? null,
    subscriptionId:     raw.subscriptionId   ?? raw.stripe_subscription_id ?? null,
    subscriptionStatus: raw.subscriptionStatus ?? raw.status ?? "active",
    createdAt:          raw.createdAt ?? raw.created_at ?? now,
    updatedAt:          now,
  };
}

// ─── DynamoDB helpers ─────────────────────────────────────────────────────────

/** Batch-write items in chunks of 25 (DynamoDB limit) */
async function batchWrite(items) {
  const chunks = [];
  for (let i = 0; i < items.length; i += 25) {
    chunks.push(items.slice(i, i + 25));
  }

  for (const chunk of chunks) {
    const requests = chunk.map(Item => ({ PutRequest: { Item } }));
    const result = await dynamo.send(new BatchWriteCommand({
      RequestItems: { [USERS_TABLE]: requests },
    }));

    const unprocessed = result.UnprocessedItems?.[USERS_TABLE]?.length ?? 0;
    if (unprocessed > 0) {
      console.warn(`  ⚠  ${unprocessed} items were unprocessed — they should be retried`);
    }
  }
}

/** Get set of userIds already in DynamoDB (for --skip-existing) */
async function getExistingUserIds() {
  const existing = new Set();
  let lastKey;
  do {
    const result = await dynamo.send(new ScanCommand({
      TableName: USERS_TABLE,
      ProjectionExpression: "userId",
      ...(lastKey ? { ExclusiveStartKey: lastKey } : {}),
    }));
    for (const item of result.Items ?? []) existing.add(item.userId);
    lastKey = result.LastEvaluatedKey;
  } while (lastKey);
  return existing;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("════════════════════════════════════════════════════════");
  console.log("  CoTrackPro — Replit → DynamoDB Migration              ");
  console.log(`  Source: ${SOURCE}  File: ${FILE}                      `);
  console.log(`  Target: ${USERS_TABLE} (${REGION})                    `);
  if (DRY_RUN) console.log("  ⚠  DRY RUN — no data will be written               ");
  console.log("════════════════════════════════════════════════════════\n");

  // Parse input
  let users;
  if (SOURCE === "replit-db") {
    users = parseReplitDb(FILE);
  } else if (SOURCE === "postgres-csv") {
    users = await parsePostgresCsv(FILE);
  } else {
    console.error(`Unknown source: ${SOURCE}. Use "replit-db" or "postgres-csv"`);
    process.exit(1);
  }

  console.log(`Parsed ${users.length} users from ${SOURCE}`);

  if (users.length === 0) {
    console.log("\nNo users found. Check your export file format and the field mappings");
    console.log("in normalizeUser() inside this script.");
    process.exit(0);
  }

  // Filter out users with no userId or email
  const valid = users.filter(u => {
    if (!u.userId || !u.email) {
      console.warn(`  ⚠  Skipping user with missing userId or email: ${JSON.stringify({ userId: u.userId, email: u.email })}`);
      return false;
    }
    return true;
  });

  console.log(`${valid.length} valid users after filtering\n`);

  // Optionally skip already-migrated users
  let toWrite = valid;
  if (SKIP_EXISTING && !DRY_RUN) {
    console.log("Scanning DynamoDB for existing users...");
    const existing = await getExistingUserIds();
    toWrite = valid.filter(u => !existing.has(u.userId));
    console.log(`${existing.size} already in DynamoDB → skipping`);
    console.log(`${toWrite.length} new users to import\n`);
  }

  if (toWrite.length === 0) {
    console.log("Nothing to import.");
    return;
  }

  // Preview
  console.log("Sample record (first user):");
  console.log(JSON.stringify(toWrite[0], null, 2));
  console.log();

  if (DRY_RUN) {
    console.log(`[DRY RUN] Would write ${toWrite.length} users to DynamoDB.`);
    console.log("Remove --dry-run to perform the actual migration.");
    return;
  }

  // Write
  console.log(`Writing ${toWrite.length} users to DynamoDB...`);
  await batchWrite(toWrite);
  console.log(`\n✅ Migration complete — ${toWrite.length} users written to ${USERS_TABLE}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
