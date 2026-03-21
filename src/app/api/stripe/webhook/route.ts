import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { clerkClient } from "@clerk/nextjs/server";
import { sendWelcomeEmail, sendAccessRevokedEmail, sendPaymentFailedEmail } from "@/lib/email";
import { captureError } from "@/lib/monitoring";
import Stripe from "stripe";

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? "";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig  = req.headers.get("stripe-signature");

  // Reject immediately if Stripe signature header is absent
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
        const invoice = event.data.object as Stripe.Invoice;
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

async function handleCheckoutComplete(
  session: Stripe.Checkout.Session,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  const { userId, modules, tier } = session.metadata ?? {};
  if (!userId || !modules) return;

  const moduleList = modules.split(",");
  const access = Object.fromEntries(moduleList.map((m) => [m.trim(), true]));

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: {
      access,
      tier: tier ?? null,
      stripeCustomerId: session.customer as string,
      subscriptionId: session.subscription as string,
    },
  });

  const user = await clerk.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;
  if (email) {
    await sendWelcomeEmail({ to: email, firstName: user.firstName ?? "there", modules: moduleList });
  }
}

async function handleSubscriptionDeleted(
  sub: Stripe.Subscription,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  const { userId } = sub.metadata ?? {};
  if (!userId) return;

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { access: {}, subscriptionId: null },
  });
}

async function handleSubscriptionUpdated(
  sub: Stripe.Subscription,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  const { userId, modules } = sub.metadata ?? {};
  if (!userId || !modules) return;

  const isActive = sub.status === "active" || sub.status === "trialing";
  const moduleList = modules.split(",");
  const access = isActive
    ? Object.fromEntries(moduleList.map((m) => [m.trim(), true]))
    : {};

  await clerk.users.updateUserMetadata(userId, {
    publicMetadata: { access, subscriptionStatus: sub.status },
  });
}

async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  clerk: Awaited<ReturnType<typeof clerkClient>>
) {
  // invoice.subscription_details.metadata carries userId set during checkout
  const metadata =
    (invoice as Stripe.Invoice & { subscription_details?: { metadata?: Record<string, string> } })
      .subscription_details?.metadata ?? {};

  const userId = metadata.userId;
  if (!userId) return;

  const user = await clerk.users.getUser(userId);
  const email = user.emailAddresses[0]?.emailAddress;
  if (!email) return;

  // Format next retry date if Stripe provides it
  const nextRetry = (invoice as Stripe.Invoice & { next_payment_attempt?: number | null })
    .next_payment_attempt;
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
