import type { Metadata } from "next";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
}

export function buildMetadata({ title, description, path, ogImage }: PageMetaInput): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}
