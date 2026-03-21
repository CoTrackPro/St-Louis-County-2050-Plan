import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes — no auth required
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/pricing",
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
  const { userId, sessionClaims } = await auth();
  const { pathname } = req.nextUrl;

  // Allow public routes through
  if (isPublicRoute(req)) return NextResponse.next();

  // Redirect unauthenticated users to sign-in
  if (!userId) {
    const signInUrl = new URL("/sign-in", req.url);
    signInUrl.searchParams.set("redirect_url", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Check tier access via Clerk publicMetadata
  const meta = sessionClaims?.metadata as Record<string, unknown> | undefined;
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
