import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { sendWelcomeEmail, sendAccessRevokedEmail, sendPaymentFailedEmail } from "@/lib/email";
import { upsertUser, updateUserSubscription, revokeUserAccess } from "@/lib/dynamo";
import { captureError } from "@/lib/monitoring";
import Stripe from "stripe";

// Stripe SDK types that lag behind the API — extend conservatively
type StripeInvoiceExtended = Stripe.Invoice & {
  /** userId set in subscription metadata during checkout */
  subscription_details?: {
    metadata?: Record<string, string>;
  };
  /** Unix timestamp of next automatic payment retry attempt (overrides SDK's non-optional) */
  next_payment_attempt?: number | null;
};

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  if (!WEBHOOK_SECRET) {
    captureError(new Error("STRIPE_WEBHOOK_SECRET is not configured"), { context: "stripe-webhook-config" });
    return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err) {
    captureError(err, { context: "stripe-webhook-signature" });
    const message = err instanceof Error ? err.message : "Webhook error";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const clerk = await clerkClient();

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutComplete(session, clerk);
        break;
      }
      case "customer.subscription.deleted": {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(sub, clerk);
        break;
      }
      case "customer.subscription.updated": {
        const sub = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(sub, clerk);
        break;
      }
      case "invoice.payment_failed": {
        const invoice = event.data.object as StripeInvoiceExtended;
        await handlePaymentFailed(invoice, clerk);
        break;
      }
    }
  } catch (err) {
    captureError(err, { context: "stripe-webhook", eventType: event.type });
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}

// ─── Handlers ─────────────────────────────────────────────────────────────────

async function handleCheckoutComplete(
  session: Stripe.Checkout.Session,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  // Metadata set by /api/stripe/checkout — plan, tier, modules, userId are all present
  const { userId, plan, tier, modules } = session.metadata ?? {};
  if (!userId || !modules) return;

  const moduleList = modules.split(",").map((m) => m.trim());
  const access     = Object.fromEntries(moduleList.map((m) => [m, true]));

  // Derive billing cadence from plan key (parent_monthly → monthly, etc.)
  const billing = resolveBilling(plan);

  // 1. Update Clerk session claims so the JWT picks up the new access on next request
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      access,
      tier:             tier ?? null,
      stripeCustomerId: session.customer  as string,
      subscriptionId:   session.subscription as string,
    },
  });

  // 2. Fetch the full Clerk user record (identity fields for DynamoDB + email for SES)
  let user: Awaited<ReturnType<typeof clerk.users.getUser>>;
  try {
    user = await clerk.users.getUser(userId);
  } catch (err) {
    captureError(err, { context: "stripe-webhook-user-lookup", userId });
    return;
  }

  const email = user.emailAddresses[0]?.emailAddress ?? null;

  // 3. Upsert full user record into DynamoDB (createdAt preserved on re-subscription)
  try {
    await upsertUser({
      userId,
      email:              email ?? "",
      firstName:          user.firstName ?? null,
      lastName:           user.lastName  ?? null,
      plan:               plan    ?? null,
      tier:               tier    ?? null,
      billing,
      access,
      stripeCustomerId:   (session.customer    as string) ?? null,
      subscriptionId:     (session.subscription as string) ?? null,
      subscriptionStatus: "active",
    });
  } catch (err) {
    captureError(err, { context: "stripe-webhook-dynamo-upsert", userId });
  }

  // 4. Send welcome email via SES (non-fatal — DynamoDB write already committed)
  try {
    if (email) {
      await sendWelcomeEmail({
        to:        email,
        firstName: user.firstName ?? "there",
        modules:   moduleList,
      });
    }
  } catch (err) {
    captureError(err, { context: "stripe-webhook-welcome-email", userId });
  }
}

async function handleSubscriptionDeleted(
  sub: Stripe.Subscription,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  const { userId } = sub.metadata ?? {};
  if (!userId) return;

  // 1. Clear Clerk access flags
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { access: {}, tier: null, subscriptionId: null },
  });

  // 2. Revoke in DynamoDB — clears plan, tier, billing, access, subscriptionId
  try {
    await revokeUserAccess(userId);
  } catch (err) {
    captureError(err, { context: "stripe-webhook-dynamo-revoke", userId });
  }

  // 3. Send cancellation email via SES
  try {
    const user  = await clerk.users.getUser(userId);
    const email = user.emailAddresses[0]?.emailAddress;
    if (email) {
      await sendAccessRevokedEmail({ to: email, firstName: user.firstName ?? "there" });
    }
  } catch (err) {
    captureError(err, { context: "stripe-webhook-revoke-email", userId });
  }
}

async function handleSubscriptionUpdated(
  sub: Stripe.Subscription,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  // Both plan key and modules are stored in subscription metadata at checkout time
  const { userId, plan, tier, modules } = sub.metadata ?? {};
  if (!userId || !modules) return;

  // Revoke access only on terminal statuses — Stripe spells it "canceled" (one l).
  // During the retry window (past_due) access stays on, consistent with the
  // payment-failed email copy ("your access remains active during the retry period").
  const accessRevoked = sub.status === "canceled" || sub.status === "unpaid";
  const moduleList    = modules.split(",").map((m) => m.trim());
  const access        = accessRevoked ? {} : Object.fromEntries(moduleList.map((m) => [m, true]));
  const billing       = resolveBilling(plan);

  // 1. Update Clerk session claims
  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { access, subscriptionStatus: sub.status },
  });

  // 2. Sync subscription state to DynamoDB
  try {
    await updateUserSubscription(userId, {
      plan:               accessRevoked ? null : (plan ?? null),
      tier:               accessRevoked ? null : (tier ?? null),
      billing:            accessRevoked ? null : billing,
      access,
      subscriptionStatus: sub.status,
      subscriptionId:     accessRevoked ? null : sub.id,
    });
  } catch (err) {
    captureError(err, { context: "stripe-webhook-dynamo-update", userId });
  }
}

async function handlePaymentFailed(
  invoice: StripeInvoiceExtended,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  // invoice.subscription_details.metadata carries userId set during checkout
  const metadata = invoice.subscription_details?.metadata ?? {};
  const userId   = metadata.userId;
  if (!userId) return;

  let user: Awaited<ReturnType<typeof clerk.users.getUser>>;
  try {
    user = await clerk.users.getUser(userId);
  } catch (err) {
    captureError(err, { context: "stripe-webhook-payment-failed-lookup", userId });
    return;
  }

  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return;

  const nextRetry     = invoice.next_payment_attempt;
  const nextRetryDate = nextRetry
    ? new Date(nextRetry * 1000).toLocaleDateString("en-US", {
        month: "long", day: "numeric", year: "numeric",
      })
    : undefined;

  await sendPaymentFailedEmail({
    to:            email,
    firstName:     user.firstName ?? "there",
    nextRetryDate,
  });
}

// ─── Utilities ────────────────────────────────────────────────────────────────

/**
 * Extracts the billing cadence from a plan key.
 * "parent_monthly" → "monthly", "professional_annual" → "annual", unknown → null
 */
function resolveBilling(plan: string | undefined | null): "monthly" | "annual" | null {
  if (!plan) return null;
  if (plan.endsWith("_monthly")) return "monthly";
  if (plan.endsWith("_annual"))  return "annual";
  return null;
}
