import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Rapto — AI Meeting Accountability",
    short_name: "Rapto",
    description:
      "Rapto remembers every commitment made in a meeting and follows up automatically.",
    start_url: "/",
    display: "standalone",
    background_color: "#0b1512",
    theme_color: "#15a07b",
    icons: [
      {
        src: "/rapto-ai.svg",
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
