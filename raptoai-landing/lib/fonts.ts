import { Inter, JetBrains_Mono } from "next/font/google";

export const interVariable = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "optional",
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "optional",
});

// Since General Sans is self-hosted in the original plan but we do not have the files,
// we will use Space Grotesk as a placeholder display font for now.
// TODO: Replace with localFont and actual General Sans WOFF2 files when available.
import { Space_Grotesk } from "next/font/google";

export const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "optional",
});
