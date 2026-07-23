import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteUnlockGate } from "@/components/unlock/site-unlock-gate";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Greg Cunningham — Builder, Operator, Systems",
    template: "%s | Greg Cunningham",
  },
  description:
    "Greg Cunningham builds businesses, operations systems, and AI-driven products across logistics, CNC/shop tech, and defense-grade autonomy.",
  keywords: [
    "Greg Cunningham",
    "operations",
    "logistics",
    "AI products",
    "systems",
    "full-stack",
    "Dump & Go",
    "Fine Finish",
  ],
  authors: [{ name: "Greg Cunningham" }],
  openGraph: {
    title: "Greg Cunningham — Builder, Operator, Systems",
    description:
      "Businesses, operations systems, and AI-driven products built in the real world.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Greg Cunningham — Builder, Operator, Systems",
    description:
      "Businesses, operations systems, and AI-driven products built in the real world.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060606",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SiteUnlockGate>{children}</SiteUnlockGate>
        <Analytics />
      </body>
    </html>
  );
}
