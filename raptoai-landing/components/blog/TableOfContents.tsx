"use client";

import * as React from "react";
import { List, ChevronRight } from "lucide-react";
import { TOCItem } from "@/lib/blog/types";

export interface TableOfContentsProps {
  items: TOCItem[];
  className?: string;
}

export function TableOfContents({ items, className = "" }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    if (!items || items.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-80px 0% -60% 0%",
        threshold: 0,
      }
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [items]);

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className={`rounded-[var(--radius-lg)] bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/10 p-5 shadow-tier-1 ${className}`}
    >
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-ink-900)]/5">
        <div className="flex items-center gap-2">
          <List className="w-4 h-4 text-[var(--color-brand-600)]" />
          <span className="font-mono text-xs uppercase tracking-wider font-semibold text-[var(--color-ink-900)]">
            Table of Contents
          </span>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-xs text-[var(--color-brand-600)] font-medium"
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide" : "Show"}
        </button>
      </div>

      <div className={`mt-3 ${isOpen ? "block" : "hidden lg:block"}`}>
        <ul className="space-y-1.5 text-sm font-sans">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li
                key={item.id}
                className={`${item.level === 3 ? "ml-3.5" : ""}`}
              >
                <a
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(item.id);
                    if (el) {
                      const yOffset = -90;
                      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                      window.scrollTo({ top: y, behavior: "smooth" });
                      setActiveId(item.id);
                    }
                  }}
                  className={`group flex items-start gap-1.5 py-1 px-2 rounded-md transition-all text-xs sm:text-sm leading-snug ${
                    isActive
                      ? "text-[var(--color-brand-700)] bg-[var(--color-brand-50)] font-semibold"
                      : "text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)]"
                  }`}
                >
                  <ChevronRight
                    className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 transition-transform ${
                      isActive
                        ? "text-[var(--color-brand-600)] translate-x-0.5"
                        : "text-[var(--color-ink-300)] group-hover:translate-x-0.5"
                    }`}
                  />
                  <span>{item.text}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
