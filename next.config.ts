import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Silence the workspace-root false-positive when node_modules are in parent dirs
  turbopack: {
    root: __dirname,
  },

  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "cotrackpro.com",
        "www.cotrackpro.com",
        "*.vercel.app",
      ],
    },
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-Content-Type-Options",     value: "nosniff" },
          { key: "X-DNS-Prefetch-Control",     value: "on" },
          { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://js.stripe.com https://clerk.cotrackpro.com https://*.clerk.accounts.dev https://cdn.highlight.io https://elevenlabs.io https://*.elevenlabs.io",
              "frame-src https://js.stripe.com https://hooks.stripe.com https://elevenlabs.io https://*.elevenlabs.io",
              "connect-src 'self' https://api.stripe.com https://clerk.cotrackpro.com https://*.clerk.accounts.dev https://pub.highlight.io https://api.elevenlabs.io https://*.elevenlabs.io",
              "img-src 'self' data: https://img.clerk.com https://assets.cotrackpro.com",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
