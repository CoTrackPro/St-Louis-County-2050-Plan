// Force dynamic rendering — required for Clerk auth context on all routes
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { HighlightInit } from "@highlight-run/next/client";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoTrackPro",
  description: "Child-centered co-parenting and family law platform",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geist.className} bg-gray-50 text-gray-900 antialiased`}>
          <HighlightInit
            projectId={process.env.NEXT_PUBLIC_HIGHLIGHT_PROJECT_ID ?? ""}
            serviceName="cotrackpro-web"
            tracingOrigins
            networkRecording={{ enabled: true, recordHeadersAndBody: true }}
          />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
