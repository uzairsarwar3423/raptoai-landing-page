"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Mail,
  ExternalLink,
  Hash,
  Sparkles,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  X,
  Check,
  FileCheck,
  Lock,
} from "lucide-react";
import {
  TERMS_SECTIONS,
  TERMS_FAQS,
  TERMS_METADATA,
  TermsSection,
} from "./terms.content";

interface TermsContentProps {
  viewMode: "all" | "plain" | "legal";
}

export function TermsContent({ viewMode }: TermsContentProps) {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    TERMS_SECTIONS[0]?.id ?? "1-acceptance-and-eligibility"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Scrollspy to highlight active TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = TERMS_SECTIONS.length - 1; i >= 0; i--) {
        const sec = TERMS_SECTIONS[i];
        if (!sec) continue;
        const section = document.getElementById(sec.id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSectionId(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filteredSections = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return TERMS_SECTIONS;

    return TERMS_SECTIONS.filter((sec) => {
      const inTitle = sec.title.toLowerCase().includes(query);
      const inCategory = sec.category.toLowerCase().includes(query);
      const inShortSummary = sec.shortSummary.toLowerCase().includes(query);
      const inPlain = sec.plainEnglishSummary.some((p) =>
        p.toLowerCase().includes(query)
      );
      const inParagraphs = sec.content.paragraphs?.some((p) =>
        p.toLowerCase().includes(query)
      );
      const inList = sec.content.listItems?.some((li) =>
        li.toLowerCase().includes(query)
      );
      const inSubsections = sec.content.subsections?.some(
        (sub) =>
          sub.title.toLowerCase().includes(query) ||
          sub.paragraphs?.some((p) => p.toLowerCase().includes(query)) ||
          sub.listItems?.some((li) => li.toLowerCase().includes(query))
      );

      return (
        inTitle ||
        inCategory ||
        inShortSummary ||
        inPlain ||
        inParagraphs ||
        inList ||
        inSubsections
      );
    });
  }, [searchQuery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const copySectionLink = (id: string) => {
    if (typeof window !== "undefined" && navigator.clipboard) {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[var(--color-paper-sunken)]/30 border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Sidebar Navigation & Quick Links */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Search Input Box */}
            <div className="bg-[var(--color-paper-raised)] p-4 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1">
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="terms-search"
                  className="block text-xs font-semibold text-[var(--color-ink-900)]"
                >
                  Search Terms of Service
                </label>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-[10px] text-[var(--color-ink-500)] hover:text-[var(--color-ink-900)] flex items-center gap-0.5 cursor-pointer"
                  >
                    <X className="w-3 h-3" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--color-ink-500)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="terms-search"
                  type="text"
                  placeholder="Filter clauses (e.g. cancellation, IP, AI, refund)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] placeholder-[var(--color-ink-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
                />
              </div>
              {searchQuery && (
                <p className="mt-2 text-[11px] text-[var(--color-brand-700)] font-medium">
                  Showing {filteredSections.length} matching clause{filteredSections.length === 1 ? "" : "s"}
                </p>
              )}
            </div>

            {/* Table of Contents List */}
            <nav
              aria-label="Terms Table of Contents"
              className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 max-h-[calc(100vh-280px)] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-[var(--color-ink-900)]/5">
                <p className="text-xs font-mono font-bold text-[var(--color-ink-500)] uppercase tracking-wider">
                  Clauses ({filteredSections.length})
                </p>
                <span className="text-[10px] font-semibold text-[var(--color-brand-600)] bg-[var(--color-brand-50)] px-2 py-0.5 rounded-full border border-[var(--color-brand-100)]">
                  v{TERMS_METADATA.version}
                </span>
              </div>

              <ul className="space-y-1 text-xs">
                {filteredSections.map((sec) => {
                  const isActive = activeSectionId === sec.id;

                  return (
                    <li key={sec.id}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(sec.id)}
                        className={`w-full text-left py-1.5 px-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "bg-[var(--color-brand-50)] text-[var(--color-brand-800)] font-semibold"
                            : "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] hover:text-[var(--color-ink-900)]"
                        }`}
                      >
                        <span className="truncate">{sec.title}</span>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 ml-2" />
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>

              {filteredSections.length === 0 && (
                <div className="text-center py-6">
                  <p className="text-xs text-[var(--color-ink-500)] mb-2">
                    No matching clauses found.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="text-xs font-semibold text-[var(--color-brand-600)] hover:underline cursor-pointer"
                  >
                    Reset search
                  </button>
                </div>
              )}
            </nav>

            {/* Related Legal Agreements */}
            <div className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 text-xs space-y-3">
              <p className="font-semibold text-[var(--color-ink-900)] flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-[var(--color-brand-600)]" />
                Related Agreements
              </p>
              <div className="space-y-2">
                <Link
                  href="/legal/privacy"
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-800)] transition-colors font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <Lock className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
                    <span>Privacy Policy</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--color-ink-400)]" />
                </Link>

                <Link
                  href="/legal/dpa"
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-800)] transition-colors font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
                    <span>Data Processing Agreement (DPA)</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--color-ink-400)]" />
                </Link>

                <Link
                  href="/security"
                  className="flex items-center justify-between p-2 rounded-lg bg-[var(--color-paper-sunken)] hover:bg-[var(--color-brand-50)] text-[var(--color-ink-700)] hover:text-[var(--color-brand-800)] transition-colors font-medium"
                >
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[var(--color-brand-500)]" />
                    <span>Security & Trust Portal</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--color-ink-400)]" />
                </Link>
              </div>
            </div>

            {/* Direct Legal Support Contact */}
            <div className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 text-xs space-y-2">
              <p className="font-semibold text-[var(--color-ink-900)] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[var(--color-brand-600)]" />
                Legal & Compliance Team
              </p>
              <p className="text-[var(--color-ink-700)] leading-relaxed">
                Need enterprise MSA redlines, custom BAAs, or tax exemptions?
              </p>
              <a
                href={`mailto:${TERMS_METADATA.legalEmail}`}
                className="inline-flex items-center gap-1 text-[var(--color-brand-700)] font-semibold hover:underline"
              >
                <span>{TERMS_METADATA.legalEmail}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Right Column: Detailed Dual-Layer Legal Sections & FAQ */}
          <main className="lg:col-span-8 space-y-10">
            {filteredSections.map((section: TermsSection) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1 transition-all"
              >
                {/* Section Header */}
                <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] border border-[var(--color-ink-900)]/10">
                        {section.category}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
                        {section.title}
                      </h2>
                    </div>

                    <button
                      type="button"
                      onClick={() => copySectionLink(section.id)}
                      aria-label={`Copy link to ${section.title}`}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs text-[var(--color-ink-500)] hover:text-[var(--color-brand-700)] hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                      title="Copy anchor link"
                    >
                      {copiedId === section.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[var(--color-brand-600)]" />
                          <span className="text-[11px] font-semibold text-[var(--color-brand-700)]">
                            Copied
                          </span>
                        </>
                      ) : (
                        <>
                          <Hash className="w-3.5 h-3.5" />
                          <span className="hidden sm:inline text-[11px]">Link</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                    {section.shortSummary}
                  </p>
                </div>

                {/* IN PLAIN ENGLISH / TL;DR CALLOUT BOX (Visible in 'all' and 'plain' modes) */}
                {viewMode !== "legal" && (
                  <div className="mb-6 rounded-2xl p-5 bg-[var(--color-brand-25)] border border-[var(--color-brand-100)] text-xs sm:text-sm">
                    <div className="flex items-center gap-2 mb-3 text-[var(--color-brand-900)] font-semibold">
                      <Sparkles className="w-4 h-4 text-[var(--color-brand-600)] shrink-0" />
                      <span>In Plain English (TL;DR)</span>
                    </div>
                    <ul className="space-y-2">
                      {section.plainEnglishSummary.map((item, pIdx) => (
                        <li
                          key={pIdx}
                          className="flex items-start gap-2.5 text-[var(--color-brand-900)] leading-relaxed"
                        >
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* DETAILED LEGAL CONTRACT CONTENT (Visible in 'all' and 'legal' modes) */}
                {viewMode !== "plain" && (
                  <div className="space-y-4">
                    {/* Callout Box (if present) */}
                    {section.content.callout && (
                      <div
                        className={`rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed ${
                          section.content.callout.type === "security"
                            ? "bg-[var(--color-canvas-dark)] text-white border-white/10"
                            : "bg-[var(--color-brand-25)] text-[var(--color-brand-900)] border-[var(--color-brand-200)]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <ShieldAlert
                            className={`w-5 h-5 shrink-0 mt-0.5 ${
                              section.content.callout.type === "security"
                                ? "text-[var(--color-brand-300)]"
                                : "text-[var(--color-brand-600)]"
                            }`}
                          />
                          <div>
                            <h4 className="font-semibold mb-1">
                              {section.content.callout.title}
                            </h4>
                            <p
                              className={
                                section.content.callout.type === "security"
                                  ? "text-white/80"
                                  : "text-[var(--color-brand-800)]"
                              }
                            >
                              {section.content.callout.message}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Main Paragraphs */}
                    {section.content.paragraphs && (
                      <div className="space-y-3.5 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                        {section.content.paragraphs.map((p, idx) => (
                          <p key={idx}>{p}</p>
                        ))}
                      </div>
                    )}

                    {/* Main List Items */}
                    {section.content.listItems && (
                      <ul className="space-y-2.5 my-3 pl-1">
                        {section.content.listItems.map((item, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-700)] leading-snug"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Subsections */}
                    {section.content.subsections && (
                      <div className="space-y-6 mt-6 pt-5 border-t border-[var(--color-ink-900)]/5">
                        {section.content.subsections.map((sub, sIdx) => (
                          <div key={sIdx} className="space-y-2.5">
                            <h3 className="text-sm sm:text-base font-display font-semibold text-[var(--color-ink-900)]">
                              {sub.title}
                            </h3>

                            {sub.paragraphs?.map((p, pIdx) => (
                              <p
                                key={pIdx}
                                className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed"
                              >
                                {p}
                              </p>
                            ))}

                            {sub.listItems && (
                              <ul className="space-y-2 pl-2">
                                {sub.listItems.map((li, liIdx) => (
                                  <li
                                    key={liIdx}
                                    className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed"
                                  >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2" />
                                    <span>{li}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </article>
            ))}

            {/* FREQUENTLY ASKED QUESTIONS SECTION */}
            <section
              id="faq-section"
              className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
            >
              <div className="flex items-center gap-2 text-[var(--color-brand-700)] text-xs font-mono font-bold uppercase tracking-wider mb-2">
                <HelpCircle className="w-4 h-4 text-[var(--color-brand-500)]" />
                <span>Common Questions</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight mb-2">
                Frequently Asked Legal Questions
              </h2>
              <p className="text-xs sm:text-sm text-[var(--color-ink-700)] mb-6">
                Straightforward answers to the questions engineering leaders and legal counsel ask most frequently.
              </p>

              <div className="space-y-3">
                {TERMS_FAQS.map((faq, fIdx) => {
                  const isOpen = openFaqIndex === fIdx;

                  return (
                    <div
                      key={fIdx}
                      className="border border-[var(--color-ink-900)]/10 rounded-2xl overflow-hidden bg-[var(--color-paper-sunken)]/40 transition-colors"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(fIdx)}
                        className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-xs sm:text-sm font-semibold text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer gap-4"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[var(--color-brand-600)] shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[var(--color-ink-500)] shrink-0" />
                        )}
                      </button>

                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed border-t border-[var(--color-ink-900)]/5 bg-[var(--color-paper-raised)]">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          </main>
        </div>
      </div>
    </section>
  );
}
