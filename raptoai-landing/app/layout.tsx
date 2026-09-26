import type { Metadata, Viewport } from "next";
import { displayFont, interVariable, jetbrainsMono } from "@/lib/fonts";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/nav/Navbar";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafaf7" },
    { media: "(prefers-color-scheme: dark)", color: "#07130e" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Rapto AI — Automated Meeting Accountability & Action Item Tracker | Free for Teams",
    template: "%s | Rapto AI",
  },
  description:
    "AI that tracks every spoken commitment across Zoom, Meet & Teams — auto-syncs to Linear, Jira & Slack. Teams see 3× higher follow-through. Start free, no card.",
  applicationName: "Rapto",
  authors: [{ name: "Rapto AI Team", url: siteUrl }],
  creator: "Rapto AI",
  publisher: "Rapto AI",
  category: "Business Productivity & AI Software",
  keywords: [
    "AI meeting accountability",
    "meeting commitment tracker",
    "automated meeting follow-ups",
    "AI action item extraction",
    "meeting action item tracker",
    "Zoom meeting commitment tracker",
    "Google Meet AI notes and tasks",
    "Microsoft Teams meeting accountability",
    "team commitment scoring",
    "meeting follow-through software",
    "botless meeting recorder",
    "Linear Slack meeting sync",
    "Jira meeting action item sync",
  ],
  // NOTE: No global canonical here — each page sets its own via generateMetadata / static metadata.
  // Homepage canonical is set in app/page.tsx generateMetadata.
  icons: {
    icon: [
      { url: "/rapto-ai.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-48.png", type: "image/png", sizes: "48x48" },
      { url: "/icon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.ico", sizes: "48x48 32x32 16x16" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
    other: [
      {
        rel: "apple-touch-icon-precomposed",
        url: "/apple-touch-icon.png",
      },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rapto",
    title: "Rapto AI — Automated Meeting Accountability & Action Item Tracker | Free for Teams",
    description:
      "AI that tracks every spoken commitment across Zoom, Meet & Teams — auto-syncs to Linear, Jira & Slack. Teams see 3× higher follow-through. Start free, no card.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Rapto — AI Meeting Accountability Platform",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rapto AI — Automated Meeting Accountability & Action Item Tracker",
    description:
      "AI that tracks every spoken commitment across Zoom, Meet & Teams — auto-syncs to Linear, Jira & Slack. Teams see 3× higher follow-through. Start free, no card.",
    creator: "@raptoai",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${interVariable.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-[var(--color-paper)] text-[var(--color-ink-900)]">
        <MotionProvider>
          <Navbar />
          {children}
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
