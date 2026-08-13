import type { Metadata } from "next";
import { displayFont, interVariable, jetbrainsMono } from "@/lib/fonts";
import { MotionProvider } from "@/components/providers/MotionProvider";
import { Navbar } from "@/components/nav/Navbar";
import { CookieConsent } from "@/components/ui/cookie-consent";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.ai"),
  title: {
    default: "Rapto — Meeting accountability, not just meeting notes",
    template: "%s | Rapto",
  },
  description:
    "Rapto remembers every commitment made in a meeting and follows up automatically — across every meeting after, not just the one it was made in.",
  openGraph: {
    type: "website",
    siteName: "Rapto",
    images: ["/og/default-og.png"],
  },
  twitter: {
    card: "summary_large_image",
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
