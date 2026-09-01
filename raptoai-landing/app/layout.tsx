import type { Metadata, Viewport } from "next";
import { displayFont, interVariable, jetbrainsMono } from "@/lib/fonts";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/nav/Navbar";
import { CookieConsent } from "@/components/ui/cookie-consent";
import { JsonLd } from "@/components/seo/JsonLd";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.ai";

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
    default: "Rapto — AI Meeting Accountability, Not Just Meeting Notes",
    template: "%s | Rapto AI",
  },
  description:
    "70% of meeting promises are never kept. Rapto listens to every call, captures every spoken commitment, and automates follow-through across Zoom, Google Meet, and Teams.",
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
    "Zoom meeting commitment tracker",
    "Google Meet AI notes and tasks",
    "Microsoft Teams meeting accountability",
    "team commitment scoring",
    "meeting follow-through software",
    "botless meeting recorder",
    "Linear Slack meeting sync",
  ],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/rapto-ai.svg", type: "image/svg+xml", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.ico", sizes: "32x32" },
    ],
    shortcut: "/rapto-ai.svg",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Rapto",
    title: "Rapto — AI Meeting Accountability, Not Just Meeting Notes",
    description:
      "70% of meeting promises are never kept. Rapto listens to every call, captures every spoken commitment, and automates follow-through across meetings.",
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
    title: "Rapto — AI Meeting Accountability, Not Just Meeting Notes",
    description:
      "70% of meeting promises are never kept. Rapto ensures yours are remembered and fulfilled across Zoom, Meet, and Teams.",
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
