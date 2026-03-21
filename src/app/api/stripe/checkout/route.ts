import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { stripe, PLANS, PlanKey } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { plan } = (await req.json()) as { plan: PlanKey };
  if (!plan || !PLANS[plan]) {
    return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
  }

  const user = await currentUser();
  const email = user?.emailAddresses[0]?.emailAddress;

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: email,
    line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
    metadata: {
      userId,
      plan,
      tier: PLANS[plan].tier,
      modules: PLANS[plan].modules,
    },
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?checkout=success`,
    cancel_url:  `${process.env.NEXT_PUBLIC_URL}/billing?checkout=cancelled`,
    subscription_data: {
      metadata: {
        userId,
        plan,
        tier: PLANS[plan].tier,
        modules: PLANS[plan].modules,
      },
    },
  });

  return NextResponse.json({ url: session.url });
}
