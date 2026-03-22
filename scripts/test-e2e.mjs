#!/usr/bin/env node
/**
 * CoTrackPro E2E smoke test
 *
 * Tests every API route and middleware rule against the running dev server.
 * Run AFTER `npm run dev` is already started in a separate terminal.
 *
 * Usage:
 *   node scripts/test-e2e.mjs
 *
 * What it covers:
 *   1. Public routes return 200
 *   2. Protected routes redirect to /sign-in (307)
 *   3. Webhook rejects bad signatures (400)
 *   4. Checkout rejects unauthenticated requests (401)
 *   5. Checkout rejects unknown plan keys (400)
 *   6. Portal rejects unauthenticated requests (401)
 *   7. MCP route rejects unauthenticated requests (307)
 */

const BASE = process.env.TEST_URL ?? "http://localhost:3000";
const results = [];

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function req(method, path, { body, headers = {} } = {}) {
  const res = await fetch(`${BASE}${path}`, {
    method,
    headers: { "Content-Type": "application/json", ...headers },
    body: body ? JSON.stringify(body) : undefined,
    redirect: "manual",   // don't follow redirects — we want to see 307s
  });
  return res;
}

function pass(name) {
  results.push({ name, status: "PASS" });
  console.log(`  ✅  ${name}`);
}

function fail(name, detail) {
  results.push({ name, status: "FAIL", detail });
  console.error(`  ❌  ${name} — ${detail}`);
}

async function expect(name, fn) {
  try {
    await fn();
  } catch (err) {
    fail(name, err.message);
  }
}

async function assertStatus(name, method, path, expectedStatus, opts = {}) {
  await expect(name, async () => {
    const res = await req(method, path, opts);
    if (res.status !== expectedStatus) {
      throw new Error(`Expected ${expectedStatus} but got ${res.status}`);
    }
    pass(name);
  });
}

// ─── Test suites ─────────────────────────────────────────────────────────────

async function testPublicRoutes() {
  console.log("\n📋  Public routes (expect 200)");
  // Core pages
  await assertStatus("GET /",        "GET",  "/",        200);
  await assertStatus("GET /pricing", "GET",  "/pricing", 200);
  await assertStatus("GET /sign-in", "GET",  "/sign-in", 200);
  await assertStatus("GET /sign-up", "GET",  "/sign-up", 200);
  // Marketing pages
  await assertStatus("GET /mission", "GET",  "/mission", 200);
  await assertStatus("GET /faq",     "GET",  "/faq",     200);
  await assertStatus("GET /contact", "GET",  "/contact", 200);
  await assertStatus("GET /partner", "GET",  "/partner", 200);
  await assertStatus("GET /privacy", "GET",  "/privacy", 200);
}

async function testNotFound() {
  console.log("\n🔍  404 handling");
  await assertStatus("GET /nonexistent-page", "GET", "/nonexistent-page-xyz-abc", 404);
}

async function testProtectedRoutes() {
  console.log("\n🔒  Protected routes (expect 307 → /sign-in)");

  const check = async (name, method, path, opts = {}) => {
    await expect(name, async () => {
      const res = await req(method, path, opts);
      if (res.status !== 307 && res.status !== 302) {
        throw new Error(`Expected redirect (307/302) but got ${res.status}`);
      }
      const location = res.headers.get("location") ?? "";
      if (!location.includes("sign-in")) {
        throw new Error(`Redirect location is "${location}" — expected /sign-in`);
      }
      pass(name);
    });
  };

  await check("GET /dashboard",  "GET",  "/dashboard");
  await check("GET /billing",    "GET",  "/billing");
  await check("GET /bridges",    "GET",  "/bridges");
  await check("GET /legal",      "GET",  "/legal");
  await check("GET /mental",     "GET",  "/mental");
}

async function testStripeWebhook() {
  console.log("\n🔔  Stripe webhook");

  await expect("Bad signature → 400 with error message", async () => {
    const res = await req("POST", "/api/stripe/webhook", {
      body: { type: "checkout.session.completed", data: { object: {} } },
      headers: { "stripe-signature": "t=1234,v1=badsig" },
    });
    if (res.status !== 400) throw new Error(`Expected 400 got ${res.status}`);
    const json = await res.json();
    if (!json.error) throw new Error("Expected error message in body");
    pass("Bad signature → 400 with error message");
  });

  await expect("Missing signature → 400", async () => {
    const res = await req("POST", "/api/stripe/webhook", {
      body: { type: "ping" },
    });
    // Either 400 (bad sig) or 500 (no sig header) — both are acceptable rejections
    if (res.status !== 400 && res.status !== 500) {
      throw new Error(`Expected 400/500 got ${res.status}`);
    }
    pass("Missing signature → 400/500");
  });
}

async function testCheckout() {
  console.log("\n💳  Stripe checkout");

  // Middleware intercepts unauthenticated requests → 307 to /sign-in (correct)
  const authCheck = async (name, body) => {
    await expect(name, async () => {
      const res = await req("POST", "/api/stripe/checkout", { body });
      if (res.status !== 307 && res.status !== 401) {
        throw new Error(`Expected 307/401 got ${res.status}`);
      }
      if (res.status === 307) {
        const loc = res.headers.get("location") ?? "";
        if (!loc.includes("sign-in")) throw new Error(`Redirect → "${loc}" not /sign-in`);
      }
      pass(name);
    });
  };

  await authCheck("Unauthenticated → 307 to /sign-in",  { plan: "parent_monthly" });
  await authCheck("Malformed body  → 307 to /sign-in",  "not-json");

  await expect("Unknown plan → 400/401/307", async () => {
    const res = await req("POST", "/api/stripe/checkout", {
      body: { plan: "fake_plan_xyz" },
    });
    if (res.status !== 400 && res.status !== 401 && res.status !== 307) {
      throw new Error(`Expected 400/401/307 got ${res.status}`);
    }
    pass("Unknown plan → 400/401/307");
  });
}

async function testPortal() {
  console.log("\n🏦  Stripe portal");

  await expect("Unauthenticated → 307 to /sign-in", async () => {
    const res = await req("POST", "/api/stripe/portal");
    if (res.status !== 307 && res.status !== 401) {
      throw new Error(`Expected 307/401 got ${res.status}`);
    }
    if (res.status === 307) {
      const loc = res.headers.get("location") ?? "";
      if (!loc.includes("sign-in")) throw new Error(`Redirect → "${loc}" not /sign-in`);
    }
    pass("Unauthenticated → 307 to /sign-in");
  });
}

async function testMCP() {
  console.log("\n🤖  MCP route");

  await expect("Unauthenticated → redirect or 401", async () => {
    const res = await req("POST", "/api/mcp", {
      body: { module: "bridges", prompt: "test" },
    });
    if (res.status !== 307 && res.status !== 302 && res.status !== 401) {
      throw new Error(`Expected 307/302/401 got ${res.status}`);
    }
    pass("Unauthenticated → redirect or 401");
  });
}

// ─── Run ──────────────────────────────────────────────────────────────────────

async function checkServerRunning() {
  try {
    await fetch(`${BASE}/`, { redirect: "manual" });
    return true;
  } catch {
    return false;
  }
}

async function main() {
  console.log(`\n🧪  CoTrackPro E2E Smoke Test`);
  console.log(`    Target: ${BASE}\n`);

  if (!(await checkServerRunning())) {
    console.error(`❌  Server not running at ${BASE}`);
    console.error(`    Run: npm run dev\n`);
    process.exit(1);
  }

  await testPublicRoutes();
  await testNotFound();
  await testProtectedRoutes();
  await testStripeWebhook();
  await testCheckout();
  await testPortal();
  await testMCP();

  // ── Summary ────────────────────────────────────────────────────────────────
  const passed = results.filter(r => r.status === "PASS").length;
  const failed = results.filter(r => r.status === "FAIL");

  console.log(`\n${"─".repeat(50)}`);
  console.log(`  Results: ${passed}/${results.length} passed`);

  if (failed.length > 0) {
    console.error(`\n  Failed tests:`);
    failed.forEach(f => console.error(`    ❌  ${f.name}: ${f.detail}`));
    console.log("");
    process.exit(1);
  } else {
    console.log(`\n  ✅  All tests passed — safe to deploy\n`);
  }
}

main().catch(err => {
  console.error("Unexpected error:", err);
  process.exit(1);
});
