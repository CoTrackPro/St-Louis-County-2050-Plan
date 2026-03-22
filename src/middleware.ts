import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes — no auth required
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing(.*)",
  "/mission(.*)",
  "/faq(.*)",
  "/contact(.*)",
  "/partner(.*)",
  "/privacy(.*)",
  "/roles(.*)",
  "/vault(.*)",
  "/scripts(.*)",
  "/social(.*)",
  "/quiz(.*)",
  "/letter(.*)",
  "/api/stripe/webhook",
]);

// Maps route prefix → minimum tier required
// "parent"       → bridges + mental
// "professional" → bridges + legal + mental
const ROUTE_TIER: Record<string, "parent" | "professional"> = {
  "/bridges": "parent",
  "/mental":  "parent",
  "/legal":   "professional",
};

export default clerkMiddleware(async (auth, req) => {
  // Allow public routes through immediately
  if (isPublicRoute(req)) return NextResponse.next();

  // Resolve auth state — in v6 the auth() call also returns redirectToSignIn()
  const { userId, sessionClaims, redirectToSignIn } = await auth();
  const { pathname } = req.nextUrl;

  // Unauthenticated: let Clerk build the proper redirect with return URL
  if (!userId) {
    return redirectToSignIn({ returnBackUrl: req.url });
  }

  // Clerk JWT custom template should expose publicMetadata under "metadata".
  // Falls back to "public_metadata" which some templates use instead.
  const meta =
    (sessionClaims?.metadata as Record<string, unknown> | undefined) ??
    (sessionClaims?.public_metadata as Record<string, unknown> | undefined);
  const tier = meta?.tier as "parent" | "professional" | undefined;

  for (const [prefix, required] of Object.entries(ROUTE_TIER)) {
    if (!pathname.startsWith(prefix)) continue;
    const allowed =
      (required === "parent" && (tier === "parent" || tier === "professional")) ||
      (required === "professional" && tier === "professional");
    if (!allowed) {
      const billingUrl = new URL("/billing", req.url);
      billingUrl.searchParams.set("upgrade", required);
      return NextResponse.redirect(billingUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)", "/(api|trpc)(.*)"],
};
