import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/blog/posts";
import { getAllCategories } from "@/lib/blog/categories";
import { getAllTags } from "@/lib/blog/tags";
import { getAllAuthors } from "@/lib/blog/authors";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";
  const now = new Date();

  const blogPosts = getAllPosts();
  const categories = getAllCategories();
  const tags = getAllTags();
  const authors = getAllAuthors();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/security`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/compare`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${base}/compare/vs-fireflies`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare/vs-otter`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare/vs-fathom`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/compare/vs-granola`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/privacy`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/legal/terms`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/legal/dpa`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/dpa`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const blogPostRoutes: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt || post.publishedAt),
    changeFrequency: "weekly",
    priority: post.topicCluster === "pillar" ? 0.9 : 0.85,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}/blog/category/${cat.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const tagRoutes: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${base}/blog/tag/${tag.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${base}/blog/authors/${author.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...blogPostRoutes,
    ...categoryRoutes,
    ...tagRoutes,
    ...authorRoutes,
  ];
}
