"use client";

import { useState, useEffect } from "react";
import { Search, ShieldAlert, CheckCircle2, Mail, ExternalLink, Hash } from "lucide-react";
import { PRIVACY_SECTIONS, PRIVACY_METADATA, PrivacySection } from "./privacy.content";

export function PrivacyContent() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    PRIVACY_SECTIONS[0]?.id ?? "1-introduction-and-scope"
  );
  const [searchQuery, setSearchQuery] = useState("");

  // Scrollspy to highlight active TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;

      for (let i = PRIVACY_SECTIONS.length - 1; i >= 0; i--) {
        const sec = PRIVACY_SECTIONS[i];
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


  const filteredSections = searchQuery.trim()
    ? PRIVACY_SECTIONS.filter(
        (sec) =>
          sec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.shortSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sec.content.paragraphs?.some((p) =>
            p.toLowerCase().includes(searchQuery.toLowerCase())
          ) ||
          sec.content.listItems?.some((li) =>
            li.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : PRIVACY_SECTIONS;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  return (
    <section className="relative py-12 lg:py-16 bg-[var(--color-paper-sunken)]/30 border-t border-[var(--color-ink-900)]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Sticky Sidebar / Table of Contents */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
            {/* Search Input */}
            <div className="bg-[var(--color-paper-raised)] p-4 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1">
              <label htmlFor="privacy-search" className="block text-xs font-semibold text-[var(--color-ink-900)] mb-2">
                Search Privacy Policy
              </label>
              <div className="relative">
                <Search className="w-4 h-4 text-[var(--color-ink-500)] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  id="privacy-search"
                  type="text"
                  placeholder="Filter topics (e.g. cookies, GDPR)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] placeholder-[var(--color-ink-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
                />
              </div>
            </div>

            {/* Table of Contents List */}
            <nav
              aria-label="Privacy Table of Contents"
              className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 max-h-[calc(100vh-280px)] overflow-y-auto"
            >
              <p className="text-xs font-mono font-bold text-[var(--color-ink-500)] uppercase tracking-wider mb-3">
                Table of Contents ({filteredSections.length})
              </p>

              <ul className="space-y-1.5 text-xs">
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
                <p className="text-xs text-[var(--color-ink-500)] py-4 text-center">
                  No matching clauses found.
                </p>
              )}
            </nav>

            {/* Direct DPO Contact Badge */}
            <div className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 text-xs space-y-2">
              <p className="font-semibold text-[var(--color-ink-900)] flex items-center gap-1.5">
                <Mail className="w-4 h-4 text-[var(--color-brand-600)]" />
                Data Protection Officer
              </p>
              <p className="text-[var(--color-ink-700)] leading-relaxed">
                Have a compliance question or need to execute an enterprise DPA?
              </p>
              <a
                href={`mailto:${PRIVACY_METADATA.dpoEmail}`}
                className="inline-flex items-center gap-1 text-[var(--color-brand-700)] font-semibold hover:underline"
              >
                <span>{PRIVACY_METADATA.dpoEmail}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </aside>

          {/* Right Column: Detailed Legal Sections */}
          <main className="lg:col-span-8 space-y-12">
            {filteredSections.map((section: PrivacySection) => (
              <article
                key={section.id}
                id={section.id}
                className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
              >
                {/* Section Header */}
                <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
                      {section.title}
                    </h2>
                    <a
                      href={`#${section.id}`}
                      aria-label={`Link to ${section.title}`}
                      className="text-[var(--color-ink-300)] hover:text-[var(--color-brand-600)] p-1 transition-colors"
                    >
                      <Hash className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="mt-1 text-xs text-[var(--color-ink-500)]">
                    {section.shortSummary}
                  </p>
                </div>

                {/* Callout Box (if present) */}
                {section.content.callout && (
                  <div
                    className={`mb-6 rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed ${
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
                  <div className="space-y-3.5 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed mb-5">
                    {section.content.paragraphs.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>
                )}

                {/* Main List Items */}
                {section.content.listItems && (
                  <ul className="space-y-2.5 my-4">
                    {section.content.listItems.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-700)] leading-snug"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
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
                          <p key={pIdx} className="text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                            {p}
                          </p>
                        ))}

                        {sub.listItems && (
                          <ul className="space-y-2 pl-2">
                            {sub.listItems.map((li, liIdx) => (
                              <li
                                key={liIdx}
                                className="flex items-start gap-2 text-xs sm:text-sm text-[var(--color-ink-700)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-1.5" />
                                <span>{li}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </main>
        </div>
      </div>
    </section>
  );
}
