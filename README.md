# CoTrackPro — Next.js Starter

Child-centered co-parenting, legal, and wellness platform.

## Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Auth | Clerk |
| Payments | Stripe Subscriptions |
| Email | Resend |
| AI Content | MCP Server (configurable) |
| Styling | Tailwind CSS 4 |

## Quick Start

```bash
# 1. Copy env file
cp .env.example .env.local

# 2. Fill in your keys (Clerk, Stripe, Resend)

# 3. Install & run
npm install
npm run dev
```

## Modules & Routes

```
/                  — Public landing page
/pricing           — Public pricing page
/sign-in           — Clerk auth
/sign-up           — Clerk auth
/dashboard         — Protected: all users
/bridges           — Protected: requires access.bridges
/legal             — Protected: requires access.legal
/mental            — Protected: requires access.mental
/billing           — Protected: Stripe checkout
/api/stripe/checkout  — POST: create Stripe Checkout session
/api/stripe/webhook   — POST: Stripe webhook (public, verified by signature)
/api/mcp              — POST: authenticated MCP skill invocation
```

## Access Control

Module access is stored in Clerk `publicMetadata.access`:

```json
{
  "access": {
    "bridges": true,
    "legal": true,
    "mental": false
  }
}
```

The middleware reads this on every request and redirects to `/billing?module=<key>` if access is missing.

## Stripe Setup

1. Create 4 products in Stripe Dashboard: Bridges, Legal, Mental, Pro
2. Copy the Price IDs into `.env.local`
3. Set up a webhook endpoint pointing to `/api/stripe/webhook`
4. Copy the webhook signing secret to `STRIPE_WEBHOOK_SECRET`

For local testing:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

## MCP Integration

Set `MCP_SERVER_URL` to your MCP skill server. If left blank, the app runs in mock mode (development-safe).

API usage:
```ts
POST /api/mcp
{
  "module": "bridges" | "legal" | "mental" | "core",
  "action": "court_neutral_narrative_summary",
  "payload": { "notes": "..." }
}
```

## Deploy

```bash
vercel deploy
```

Add all env variables in the Vercel dashboard. Make sure `NEXT_PUBLIC_URL` points to your production domain before deploying.
