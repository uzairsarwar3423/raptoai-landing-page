import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { Author } from "@/lib/blog/types";
import { XTwitterIcon, LinkedInIcon, GitHubIcon } from "./SocialIcons";

export interface AuthorBioCardProps {
  author: Author;
  className?: string;
}

export function AuthorBioCard({ author, className = "" }: AuthorBioCardProps) {
  return (
    <section
      aria-label="About the Author"
      className={`p-6 sm:p-8 rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 shadow-tier-1 my-12 ${className}`}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
        <Link
          href={`/blog/authors/${author.id}`}
          className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-[var(--color-brand-500)]/30 flex-shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
        >
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="80px"
          />
        </Link>

        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Link
              href={`/blog/authors/${author.id}`}
              className="font-display text-lg sm:text-xl font-bold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors inline-flex items-center gap-1.5"
            >
              {author.name}
              {author.verified && (
                <BadgeCheck className="w-5 h-5 text-[var(--color-brand-500)] inline" aria-label="Verified Author" />
              )}
            </Link>
            <span className="text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-[var(--color-brand-50)] text-[var(--color-brand-700)] font-semibold">
              {author.role}
            </span>
          </div>

          <p className="text-xs font-mono text-[var(--color-brand-600)] mb-3 font-medium">
            {author.credentials}
          </p>

          <p className="text-sm text-[var(--color-ink-700)] leading-relaxed font-sans mb-4">
            {author.bio}
          </p>

          <div className="flex items-center gap-3">
            {author.twitter && (
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                aria-label={`${author.name}'s Twitter / X`}
              >
                <XTwitterIcon className="w-4 h-4" />
              </a>
            )}
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                aria-label={`${author.name}'s LinkedIn`}
              >
                <LinkedInIcon className="w-4 h-4" />
              </a>
            )}
            {author.github && (
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-500)] hover:text-[var(--color-brand-600)] transition-colors flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)]"
                aria-label={`${author.name}'s GitHub`}
              >
                <GitHubIcon className="w-4 h-4" />
              </a>
            )}
            <Link
              href={`/blog/authors/${author.id}`}
              className="ml-auto text-xs font-semibold text-[var(--color-brand-600)] hover:text-[var(--color-brand-700)] underline underline-offset-4"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
