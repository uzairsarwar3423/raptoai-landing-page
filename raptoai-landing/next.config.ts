import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        // DiceBear avatar API — used for team avatar cards in WhyUsBento
        // Free, no ToS restrictions, GDPR-safe SVG generation
        protocol: "https",
        hostname: "api.dicebear.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/privacy",
        destination: "/legal/privacy",
        permanent: true,
      },
      {
        source: "/terms",
        destination: "/legal/terms",
        permanent: true,
      },
      {
        source: "/dpa",
        destination: "/legal/dpa",
        permanent: true,
      },
      {
        source: "/compare/fireflies",
        destination: "/compare/vs-fireflies",
        permanent: true,
      },
      {
        source: "/compare/otter",
        destination: "/compare/vs-otter",
        permanent: true,
      },
      {
        source: "/compare/fathom",
        destination: "/compare/vs-fathom",
        permanent: true,
      },
      {
        source: "/compare/granola",
        destination: "/compare/vs-granola",
        permanent: true,
      },
    ];
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "gsap",
      "@gsap/react",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-navigation-menu",
      "@radix-ui/react-slot",
      "@radix-ui/react-tooltip",
      "clsx",
      "tailwind-merge",
    ],
  },
};

export default nextConfig;
