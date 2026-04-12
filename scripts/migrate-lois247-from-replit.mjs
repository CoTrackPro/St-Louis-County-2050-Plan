/**
 * Migrate lois247 (SpeakerToolkit) from Replit PostgreSQL → DynamoDB
 *
 * Single-table design (table: lois247)
 *   PK                              SK                        Entity
 *   USER#{userId}                   PROFILE                   users
 *   USER#{userId}                   SUBSCRIPTION#{id}         user_subscriptions
 *   USER#{userId}                   ACTIVITY#{createdAt}#{id} user_activities
 *   USER#{userId}                   AUDIO_SESSION#{id}        audio_sessions
 *   USER#{userId}                   COURSE_PROGRESS#{id}      course_progress
 *   USER#{userId}                   COURSE_GOAL#{id}          course_goals
 *   USER#{userId}                   COURSE_NOTE#{id}          course_notes
 *   USER#{userId}                   CHAPTER_RATING#{id}       chapter_ratings
 *   USER#{userId}                   CHAPTER_REFLECTION#{id}   chapter_reflections
 *   USER#{userId}                   BOOKMARK#{id}             course_bookmarks
 *   USER#{userId}                   EXERCISE#{id}             exercise_responses
 *   USER#{userId}                   QUIZ_RESULT#{id}          quiz_results
 *   USER#{userId}                   ENGAGEMENT#{id}           speaking_engagements
 *   USER#{userId}                   SUPPORT#{id}              support_requests
 *   USER#{userId}                   TESTIMONIAL#{id}          testimonials
 *   AUDIO_FILE#{id}                 METADATA                  audio_files
 *   AUDIO_COLLECTION#{id}           METADATA                  audio_collections
 *   PODCAST_EPISODE#{id}            METADATA                  podcast_episodes
 *   SESSION#{sessionId}             METADATA                  sessions / auth_states
 *
 * Usage:
 *   export DATABASE_URL="postgresql://user:pass@host:5432/dbname?sslmode=require"
 *   node scripts/migrate-lois247-from-replit.mjs
 *   node scripts/migrate-lois247-from-replit.mjs --dry-run
 *   node scripts/migrate-lois247-from-replit.mjs --tables users,user_subscriptions
 *
 * Get DATABASE_URL from: Replit project → Tools → Secrets → DATABASE_URL
 *   or: Replit project → Tools → Database → Connection string
 */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, BatchWriteCommand } from "@aws-sdk/lib-dynamodb";
import pg from "pg";

const { Client } = pg;

// ─── Config ───────────────────────────────────────────────────────────────────

const DATABASE_URL   = process.env.DATABASE_URL;
const DYNAMO_REGION  = process.env.DYNAMODB_REGION ?? "us-east-1";
const DYNAMO_TABLE   = process.env.DYNAMODB_TABLE  ?? "lois247";

const args = process.argv.slice(2);
const DRY_RUN       = args.includes("--dry-run");
const TABLES_FLAG   = args.find(a => a.startsWith("--tables="))?.split("=")[1];
const ONLY_TABLES   = TABLES_FLAG ? new Set(TABLES_FLAG.split(",").map(t => t.trim())) : null;

if (!DATABASE_URL) {
  console.error(`
ERROR: DATABASE_URL is not set.

Get it from your Replit project:
  1. Open the SpeakerToolkit project on Replit
  2. Click Tools → Secrets (or check the Database tab)
  3. Copy the DATABASE_URL value
  4. Run: export DATABASE_URL="postgresql://..." && node scripts/migrate-lois247-from-replit.mjs
`);
  process.exit(1);
}

// ─── DynamoDB client ──────────────────────────────────────────────────────────

const dynamo = DynamoDBDocumentClient.from(
  new DynamoDBClient({ region: DYNAMO_REGION }),
  { marshallOptions: { removeUndefinedValues: true }, unmarshallOptions: { wrapNumbers: false } }
);

// ─── PK/SK builders ──────────────────────────────────────────────────────────

const pk = {
  user:        (id)  => `USER#${id}`,
  audioFile:   (id)  => `AUDIO_FILE#${id}`,
  collection:  (id)  => `AUDIO_COLLECTION#${id}`,
  podcast:     (id)  => `PODCAST_EPISODE#${id}`,
  session:     (id)  => `SESSION#${id}`,
};

const sk = {
  profile:              ()         => "PROFILE",
  subscription:         (id)       => `SUBSCRIPTION#${id}`,
  activity:             (ts, id)   => `ACTIVITY#${ts}#${id}`,
  audioSession:         (id)       => `AUDIO_SESSION#${id}`,
  courseProgress:       (id)       => `COURSE_PROGRESS#${id}`,
  courseGoal:           (id)       => `COURSE_GOAL#${id}`,
  courseNote:           (id)       => `COURSE_NOTE#${id}`,
  chapterRating:        (id)       => `CHAPTER_RATING#${id}`,
  chapterReflection:    (id)       => `CHAPTER_REFLECTION#${id}`,
  bookmark:             (id)       => `BOOKMARK#${id}`,
  exercise:             (id)       => `EXERCISE#${id}`,
  quizResult:           (id)       => `QUIZ_RESULT#${id}`,
  engagement:           (id)       => `ENGAGEMENT#${id}`,
  support:              (id)       => `SUPPORT#${id}`,
  testimonial:          (id)       => `TESTIMONIAL#${id}`,
  metadata:             ()         => "METADATA",
};

// ─── Table transformers ───────────────────────────────────────────────────────

function transformUsers(rows) {
  return rows.map(r => ({
    PK: pk.user(r.id),
    SK: sk.profile(),
    entityType: "USER",
    // Map Replit user fields → Clerk-compatible shape
    userId:           String(r.id),
    clerkUserId:      r.clerk_user_id   ?? r.clerkUserId    ?? null,
    email:            r.email           ?? null,
    firstName:        r.first_name      ?? r.firstName      ?? null,
    lastName:         r.last_name       ?? r.lastName       ?? null,
    username:         r.username        ?? null,
    role:             r.role            ?? "user",
    plan:             r.plan            ?? r.subscription_plan ?? null,
    tier:             r.tier            ?? null,
    stripeCustomerId: r.stripe_customer_id ?? r.stripeCustomerId ?? null,
    onboardingComplete: r.onboarding_complete ?? r.onboardingComplete ?? false,
    createdAt:        iso(r.created_at  ?? r.createdAt),
    updatedAt:        iso(r.updated_at  ?? r.updatedAt),
  }));
}

function transformUserSubscriptions(rows) {
  return rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId),
    SK: sk.subscription(r.id),
    entityType: "SUBSCRIPTION",
    subscriptionId:   String(r.id),
    userId:           String(r.user_id ?? r.userId),
    plan:             r.plan           ?? null,
    tier:             r.tier           ?? null,
    billing:          r.billing_period ?? r.billing ?? null,
    stripeSubId:      r.stripe_subscription_id ?? null,
    status:           r.status         ?? "active",
    currentPeriodEnd: iso(r.current_period_end),
    createdAt:        iso(r.created_at),
    updatedAt:        iso(r.updated_at),
  }));
}

function transformUserActivities(rows) {
  return rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId),
    SK: sk.activity(iso(r.created_at), r.id),
    entityType: "ACTIVITY",
    activityId: String(r.id),
    userId:     String(r.user_id ?? r.userId),
    type:       r.activity_type ?? r.type ?? null,
    action:     r.action        ?? null,
    metadata:   r.metadata      ?? r.data ?? null,
    createdAt:  iso(r.created_at),
  }));
}

function transformAudioSessions(rows) {
  return rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId),
    SK: sk.audioSession(r.id),
    entityType: "AUDIO_SESSION",
    sessionId:  String(r.id),
    userId:     String(r.user_id ?? r.userId),
    audioFileId: String(r.audio_file_id ?? r.audioFileId ?? ""),
    duration:   r.duration       ?? null,
    progress:   r.progress       ?? null,
    completed:  r.completed      ?? false,
    createdAt:  iso(r.created_at),
    updatedAt:  iso(r.updated_at),
  }));
}

function transformAudioFiles(rows) {
  return rows.map(r => ({
    PK: pk.audioFile(r.id),
    SK: sk.metadata(),
    entityType: "AUDIO_FILE",
    audioFileId: String(r.id),
    title:       r.title         ?? null,
    description: r.description   ?? null,
    s3Key:       r.s3_key        ?? r.s3Key ?? r.url ?? null,
    duration:    r.duration      ?? null,
    fileSize:    r.file_size     ?? null,
    contentType: r.content_type  ?? "audio/mpeg",
    tags:        r.tags          ?? [],
    public:      r.is_public     ?? r.public ?? false,
    createdAt:   iso(r.created_at),
    updatedAt:   iso(r.updated_at),
  }));
}

function transformCourseProgress(rows) {
  return rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId),
    SK: sk.courseProgress(r.id),
    entityType: "COURSE_PROGRESS",
    progressId:  String(r.id),
    userId:      String(r.user_id ?? r.userId),
    courseId:    String(r.course_id ?? r.courseId ?? ""),
    chapterId:   r.chapter_id     ?? r.chapterId ?? null,
    progress:    r.progress       ?? 0,
    completed:   r.completed      ?? false,
    createdAt:   iso(r.created_at),
    updatedAt:   iso(r.updated_at),
  }));
}

function transformCourseNotes(rows) {
  return rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId),
    SK: sk.courseNote(r.id),
    entityType: "COURSE_NOTE",
    noteId:     String(r.id),
    userId:     String(r.user_id ?? r.userId),
    courseId:   String(r.course_id ?? r.courseId ?? ""),
    chapterId:  r.chapter_id ?? null,
    content:    r.content    ?? r.note ?? "",
    createdAt:  iso(r.created_at),
    updatedAt:  iso(r.updated_at),
  }));
}

function transformSessions(rows) {
  return rows.map(r => ({
    PK: pk.session(r.id ?? r.session_id),
    SK: sk.metadata(),
    entityType: "SESSION",
    sessionId:  String(r.id ?? r.session_id),
    userId:     r.user_id   ? String(r.user_id) : null,
    data:       r.data      ?? r.session_data ?? null,
    expiresAt:  iso(r.expires_at ?? r.expiresAt),
    createdAt:  iso(r.created_at),
  }));
}

function transformAuthStates(rows) {
  return rows.map(r => ({
    PK: pk.session(r.state ?? r.id),
    SK: "AUTH_STATE",
    entityType: "AUTH_STATE",
    state:      r.state    ?? String(r.id),
    userId:     r.user_id  ? String(r.user_id) : null,
    provider:   r.provider ?? null,
    redirectTo: r.redirect_to ?? null,
    createdAt:  iso(r.created_at),
    expiresAt:  iso(r.expires_at),
  }));
}

function transformGeneric(entityType, skBuilder) {
  return (rows) => rows.map(r => ({
    PK: pk.user(r.user_id ?? r.userId ?? "GLOBAL"),
    SK: skBuilder(r.id),
    entityType,
    id:        String(r.id),
    userId:    r.user_id ? String(r.user_id) : null,
    ...r,
    // override timestamps to ISO strings
    created_at: undefined,
    updated_at: undefined,
    createdAt: iso(r.created_at),
    updatedAt: iso(r.updated_at),
  }));
}

// ─── Table config ─────────────────────────────────────────────────────────────

const TABLE_CONFIG = [
  { name: "users",                transform: transformUsers },
  { name: "user_subscriptions",   transform: transformUserSubscriptions },
  { name: "user_activities",      transform: transformUserActivities },
  { name: "audio_sessions",       transform: transformAudioSessions },
  { name: "audio_files",          transform: transformAudioFiles },
  { name: "course_progress",      transform: transformCourseProgress },
  { name: "course_notes",         transform: transformCourseNotes },
  { name: "sessions",             transform: transformSessions },
  { name: "auth_states",          transform: transformAuthStates },
  // Lower-data tables — generic transformer
  { name: "course_goals",         transform: transformGeneric("COURSE_GOAL",         id => sk.courseGoal(id)) },
  { name: "chapter_ratings",      transform: transformGeneric("CHAPTER_RATING",      id => sk.chapterRating(id)) },
  { name: "chapter_reflections",  transform: transformGeneric("CHAPTER_REFLECTION",  id => sk.chapterReflection(id)) },
  { name: "course_bookmarks",     transform: transformGeneric("BOOKMARK",            id => sk.bookmark(id)) },
  { name: "exercise_responses",   transform: transformGeneric("EXERCISE",            id => sk.exercise(id)) },
  { name: "quiz_results",         transform: transformGeneric("QUIZ_RESULT",         id => sk.quizResult(id)) },
  { name: "speaking_engagements", transform: transformGeneric("ENGAGEMENT",          id => sk.engagement(id)) },
  { name: "support_requests",     transform: transformGeneric("SUPPORT",             id => sk.support(id)) },
  { name: "testimonials",         transform: transformGeneric("TESTIMONIAL",         id => sk.testimonial(id)) },
  { name: "audio_collections",    transform: rows => rows.map(r => ({
    PK: pk.collection(r.id), SK: sk.metadata(), entityType: "AUDIO_COLLECTION",
    ...r, created_at: undefined, updated_at: undefined,
    createdAt: iso(r.created_at), updatedAt: iso(r.updated_at),
  }))},
  { name: "podcast_episodes",     transform: rows => rows.map(r => ({
    PK: pk.podcast(r.id), SK: sk.metadata(), entityType: "PODCAST_EPISODE",
    ...r, created_at: undefined, updated_at: undefined,
    createdAt: iso(r.created_at), updatedAt: iso(r.updated_at),
  }))},
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

function iso(val) {
  if (!val) return new Date().toISOString();
  if (val instanceof Date) return val.toISOString();
  return new Date(val).toISOString();
}

async function batchWrite(items) {
  for (let i = 0; i < items.length; i += 25) {
    const chunk = items.slice(i, i + 25);
    const result = await dynamo.send(new BatchWriteCommand({
      RequestItems: {
        [DYNAMO_TABLE]: chunk.map(Item => ({ PutRequest: { Item } })),
      },
    }));
    const unprocessed = result.UnprocessedItems?.[DYNAMO_TABLE]?.length ?? 0;
    if (unprocessed > 0) console.warn(`  ⚠  ${unprocessed} unprocessed items in batch`);
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("════════════════════════════════════════════════════════");
  console.log("  lois247 — Replit PostgreSQL → DynamoDB Migration       ");
  console.log(`  Target: ${DYNAMO_TABLE} (${DYNAMO_REGION})             `);
  if (DRY_RUN) console.log("  ⚠  DRY RUN — no data will be written               ");
  if (ONLY_TABLES) console.log(`  Tables: ${[...ONLY_TABLES].join(", ")}            `);
  console.log("════════════════════════════════════════════════════════\n");

  const db = new Client({ connectionString: DATABASE_URL, ssl: { rejectUnauthorized: false } });
  await db.connect();
  console.log("Connected to Replit PostgreSQL\n");

  let totalRows = 0;
  let totalItems = 0;

  for (const config of TABLE_CONFIG) {
    if (ONLY_TABLES && !ONLY_TABLES.has(config.name)) continue;

    // Check if table exists in Postgres
    const exists = await db.query(
      "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_name = $1)",
      [config.name]
    );
    if (!exists.rows[0].exists) {
      console.log(`  –  ${config.name.padEnd(25)} not found in PostgreSQL — skipping`);
      continue;
    }

    const result = await db.query(`SELECT * FROM ${config.name}`);
    const rows = result.rows;

    if (rows.length === 0) {
      console.log(`  –  ${config.name.padEnd(25)} 0 rows — skipping`);
      continue;
    }

    const items = config.transform(rows);
    totalRows  += rows.length;
    totalItems += items.length;

    if (DRY_RUN) {
      console.log(`  ✓  ${config.name.padEnd(25)} ${rows.length} rows → ${items.length} DynamoDB items`);
      if (items.length > 0) {
        console.log(`     Sample: PK="${items[0].PK}", SK="${items[0].SK}"`);
      }
    } else {
      await batchWrite(items);
      console.log(`  ✓  ${config.name.padEnd(25)} ${rows.length} rows → ${items.length} items written`);
    }
  }

  await db.end();

  console.log("\n════════════════════════════════════════════════════════");
  if (DRY_RUN) {
    console.log(`  DRY RUN: would write ${totalItems} items from ${totalRows} rows`);
    console.log("  Run without --dry-run to execute.");
  } else {
    console.log(`  ✅  ${totalItems} items written from ${totalRows} source rows`);
  }
  console.log("════════════════════════════════════════════════════════\n");
}

main().catch(e => { console.error(e); process.exit(1); });

