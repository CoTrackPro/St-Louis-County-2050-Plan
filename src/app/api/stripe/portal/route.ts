import { auth, currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

/**
 * POST /api/stripe/portal
 *
 * Creates a Stripe Customer Portal session so the user can
 * manage their subscription, update payment methods, or cancel.
 *
 * Requires:
 *   - Authenticated Clerk session
 *   - stripeCustomerId stored in Clerk publicMetadata
 *     (set by the checkout.session.completed webhook handler)
 */
export async function POST() {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await currentUser();
  const customerId = user?.publicMetadata?.stripeCustomerId as string | undefined;

  if (!customerId) {
    return NextResponse.json(
      { error: "No billing account found. Please subscribe first." },
      { status: 400 }
    );
  }

  try {
    const session = await stripe.billingPortal.sessions.create({
      customer:   customerId,
      return_url: `${process.env.NEXT_PUBLIC_URL}/billing`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Failed to open billing portal";
    console.error("[portal] Stripe error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
