import { BlogPost, Author, Category } from "./types";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.ai";

export function generateArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    name: post.title,
    description: post.metaDescription,
    url: `${siteUrl}/blog/${post.slug}`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteUrl}/blog/${post.slug}`,
    },
    image: post.coverImage,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: post.wordCount,
    articleSection: post.category.title,
    keywords: post.tags.join(", "),
    inLanguage: "en-US",
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      description: post.author.bio,
      url: `${siteUrl}/blog/authors/${post.author.id}`,
      image: post.author.avatar,
      sameAs: [post.author.twitter, post.author.linkedin, post.author.github].filter(Boolean),
    },
    publisher: {
      "@type": "Organization",
      name: "Rapto AI",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/rapto-ai.svg`,
      },
    },
  };
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${siteUrl}${item.url}`,
    })),
  };
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function generateAuthorSchema(author: Author) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.role,
    description: author.bio,
    url: `${siteUrl}/blog/authors/${author.id}`,
    image: author.avatar,
    worksFor: {
      "@type": "Organization",
      name: "Rapto AI",
      url: siteUrl,
    },
    sameAs: [author.twitter, author.linkedin, author.github].filter(Boolean),
  };
}

export function generateBlogHubSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Rapto Engineering & Meeting Intelligence Blog",
    description: "Insights, architecture breakdowns, and engineering guides on AI meeting accountability, cross-meeting memory, and team execution velocity.",
    url: `${siteUrl}/blog`,
    publisher: {
      "@type": "Organization",
      name: "Rapto AI",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/rapto-ai.svg`,
      },
    },
    blogPost: posts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${siteUrl}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author.name,
      },
    })),
  };
}
