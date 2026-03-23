import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const FROM     = process.env.SES_FROM_ADDRESS    ?? "CoTrackPro <admin@cotrackpro.com>";
const KEY_ID   = process.env.SES_AWS_ACCESS_KEY_ID;
const KEY_SEC  = process.env.SES_AWS_SECRET_ACCESS_KEY;
const REGION   = process.env.SES_REGION         ?? "us-east-1";
const SITE_URL = process.env.NEXT_PUBLIC_URL     ?? "https://cotrackpro.com";

// Returns null when SES credentials are not yet configured (dev / staging)
function getSES(): SESClient | null {
  if (!KEY_ID || !KEY_SEC) return null;
  return new SESClient({
    region: REGION,
    credentials: { accessKeyId: KEY_ID, secretAccessKey: KEY_SEC },
  });
}

async function send(to: string, subject: string, html: string) {
  const ses = getSES();
  if (!ses) {
    // Graceful no-op in dev — log so the email content is still visible
    console.log(`[email:dev] TO=${to} SUBJECT=${subject}`);
    return;
  }
  return ses.send(
    new SendEmailCommand({
      Source: FROM,
      Destination: { ToAddresses: [to] },
      Message: {
        Subject: { Data: subject, Charset: "UTF-8" },
        Body:    { Html: { Data: html, Charset: "UTF-8" } },
      },
    })
  );
}

interface WelcomeEmailPayload {
  to: string;
  firstName: string;
  modules: string[];
}

export async function sendWelcomeEmail({ to, firstName, modules }: WelcomeEmailPayload) {
  const moduleList = modules
    .map((m) => `• ${m.charAt(0).toUpperCase() + m.slice(1)}`)
    .join("<br>");

  return send(to, "Welcome to CoTrackPro 🎉", `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h1 style="color:#1e3a8a">Welcome, ${firstName}!</h1>
      <p>Your CoTrackPro subscription is active. You now have access to:</p>
      <div style="background:#f1f5f9;padding:16px;border-radius:8px;font-size:14px;line-height:1.8">
        ${moduleList}
      </div>
      <p style="margin-top:24px">
        <a href="${SITE_URL}/dashboard"
           style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Go to Dashboard →
        </a>
      </p>
      <p style="color:#6b7280;font-size:12px;margin-top:32px">
        CoTrackPro — Child-centered co-parenting platform
      </p>
    </div>
  `);
}

interface AccessRevokedPayload {
  to: string;
  firstName: string;
}

export async function sendAccessRevokedEmail({ to, firstName }: AccessRevokedPayload) {
  return send(to, "Your CoTrackPro subscription has ended", `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h1 style="color:#1e3a8a">Hi ${firstName},</h1>
      <p>Your CoTrackPro subscription has been cancelled or expired.</p>
      <p>Your data is safe — resubscribe anytime to restore access.</p>
      <p>
        <a href="${SITE_URL}/billing"
           style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Resubscribe →
        </a>
      </p>
    </div>
  `);
}

interface PaymentFailedPayload {
  to: string;
  firstName: string;
  nextRetryDate?: string;
}

export async function sendPaymentFailedEmail({ to, firstName, nextRetryDate }: PaymentFailedPayload) {
  const retryLine = nextRetryDate
    ? `<p>We'll automatically retry your payment on <strong>${nextRetryDate}</strong>.</p>`
    : `<p>We'll automatically retry your payment in the next few days.</p>`;

  return send(to, "Action required — CoTrackPro payment failed", `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h1 style="color:#b91c1c">Payment failed, ${firstName}</h1>
      <p>We were unable to process your CoTrackPro subscription payment.</p>
      ${retryLine}
      <p>To avoid losing access, please update your payment method now:</p>
      <p>
        <a href="${SITE_URL}/billing"
           style="background:#2563eb;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;display:inline-block">
          Update Payment Method →
        </a>
      </p>
      <p style="color:#6b7280;font-size:12px;margin-top:32px">
        Your access remains active during the retry period.
        If payment continues to fail your subscription will be cancelled.
      </p>
    </div>
  `);
}
