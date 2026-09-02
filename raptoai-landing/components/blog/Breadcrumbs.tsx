import * as React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
  return (
    <nav
      aria-label="Breadcrumbs"
      className={`flex items-center text-xs md:text-sm text-[var(--color-ink-500)] font-sans ${className}`}
    >
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[var(--color-ink-900)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">Home</span>
          </Link>
        </li>
        <li>
          <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-300)]" aria-hidden="true" />
        </li>
        <li>
          <Link
            href="/blog"
            className="hover:text-[var(--color-ink-900)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
          >
            Blog
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <React.Fragment key={item.label + index}>
              <li>
                <ChevronRight className="w-3.5 h-3.5 text-[var(--color-ink-300)]" aria-hidden="true" />
              </li>
              <li className="max-w-[240px] md:max-w-md truncate">
                {isLast || !item.href ? (
                  <span
                    className="font-medium text-[var(--color-ink-900)]"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-[var(--color-ink-900)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-600)] rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
