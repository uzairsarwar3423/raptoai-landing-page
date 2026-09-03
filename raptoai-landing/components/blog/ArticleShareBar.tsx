"use client";

import * as React from "react";
import { Link2, Check } from "lucide-react";
import { XTwitterIcon, LinkedInIcon } from "./SocialIcons";

export interface ArticleShareBarProps {
  title: string;
  slug: string;
  className?: string;
}

export function ArticleShareBar({ title, slug, className = "" }: ArticleShareBarProps) {
  const [copied, setCopied] = React.useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://rapto.cloud/blog/${slug}`;
  };

  const handleCopy = () => {
    const url = getShareUrl();
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleTwitterShare = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`"${title}" by @raptoai`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleLinkedInShare = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-ink-500)] font-medium mr-1">
        Share:
      </span>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-700)] transition-colors text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] cursor-pointer"
        aria-label="Copy link to article"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
            <span className="text-[var(--color-brand-600)] font-semibold">Copied link!</span>
          </>
        ) : (
          <>
            <Link2 className="w-3.5 h-3.5" />
            <span>Copy link</span>
          </>
        )}
      </button>

      <button
        onClick={handleTwitterShare}
        className="w-8 h-8 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-700)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] cursor-pointer"
        aria-label="Share on X / Twitter"
      >
        <XTwitterIcon className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={handleLinkedInShare}
        className="w-8 h-8 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-700)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] cursor-pointer"
        aria-label="Share on LinkedIn"
      >
        <LinkedInIcon className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
