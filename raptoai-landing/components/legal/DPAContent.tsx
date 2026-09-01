"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Search,
  ShieldAlert,
  ShieldCheck,
  CheckCircle2,
  Mail,
  ExternalLink,
  Copy,
  Check,
  Server,
  Lock,
  Sparkles,
  Filter,
  X,
  FileSignature,
} from "lucide-react";
import {
  DPA_SECTIONS,
  DPA_METADATA,
  SUB_PROCESSORS_LIST,
  TECHNICAL_SECURITY_MEASURES,
  ANNEXES_LIST,
  DPASection,
  SubProcessorEntry,
} from "./dpa.content";
import { DPAExecutionModal } from "./DPAExecutionModal";

export function DPAContent() {
  const [activeSectionId, setActiveSectionId] = useState<string>(
    DPA_SECTIONS[0]?.id ?? "1-definitions-and-interpretation"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedSectionId, setCopiedSectionId] = useState<string | null>(null);
  const [subProcessorFilter, setSubProcessorFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"all" | "core" | "annexes" | "subprocessors">("all");

  // Scrollspy to highlight active TOC section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      const allIds = [
        ...DPA_SECTIONS.map((s) => s.id),
        ...ANNEXES_LIST.map((a) => a.id),
      ];

      for (let i = allIds.length - 1; i >= 0; i--) {
        const id = allIds[i];
        if (!id) continue;
        const section = document.getElementById(id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSectionId(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter sections by search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) {
      if (activeTab === "core") return DPA_SECTIONS;
      if (activeTab === "annexes" || activeTab === "subprocessors") return [];
      return DPA_SECTIONS;
    }

    const query = searchQuery.toLowerCase();
    return DPA_SECTIONS.filter(
      (sec) =>
        sec.title.toLowerCase().includes(query) ||
        sec.shortSummary.toLowerCase().includes(query) ||
        sec.badge?.toLowerCase().includes(query) ||
        sec.content.paragraphs?.some((p) => p.toLowerCase().includes(query)) ||
        sec.content.listItems?.some((li) => li.toLowerCase().includes(query)) ||
        sec.content.subsections?.some(
          (sub) =>
            sub.title.toLowerCase().includes(query) ||
            sub.paragraphs?.some((p) => p.toLowerCase().includes(query)) ||
            sub.listItems?.some((li) => li.toLowerCase().includes(query))
        )
    );
  }, [searchQuery, activeTab]);

  // Filter sub-processors
  const filteredSubProcessors = useMemo(() => {
    return SUB_PROCESSORS_LIST.filter((sp) => {
      const matchesCategory =
        subProcessorFilter === "All" || sp.category === subProcessorFilter;
      const matchesSearch =
        !searchQuery.trim() ||
        sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.dataScope.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sp.location.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [subProcessorFilter, searchQuery]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const topOffset = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: topOffset, behavior: "smooth" });
    }
  };

  const copySectionLink = (id: string) => {
    if (typeof window !== "undefined") {
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url);
      setCopiedSectionId(id);
      setTimeout(() => setCopiedSectionId(null), 2000);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <section className="relative py-12 lg:py-16 bg-[var(--color-paper-sunken)]/30 border-t border-[var(--color-ink-900)]/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Quick Category Navigation Tabs */}
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[var(--color-ink-900)]/10">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("all");
                  setSearchQuery("");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "all"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
                }`}
              >
                Complete Agreement (All 16 Parts)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("core");
                  setSearchQuery("");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "core"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
                }`}
              >
                Clauses 1–12 (Core Terms)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("annexes");
                  setSearchQuery("");
                  scrollToSection("annex-1-details-of-processing");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "annexes"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
                }`}
              >
                Annexes & Schedules (I–IV)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("subprocessors");
                  setSearchQuery("");
                  scrollToSection("annex-3-authorized-sub-processors");
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === "subprocessors"
                    ? "bg-[var(--color-brand-500)] text-white shadow-tier-1"
                    : "bg-[var(--color-paper-raised)] text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10"
                }`}
              >
                Sub-processors Registry
              </button>
            </div>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-[var(--color-brand-700)] bg-[var(--color-brand-50)] hover:bg-[var(--color-brand-100)] border border-[var(--color-brand-200)] transition-colors cursor-pointer"
            >
              <FileSignature className="w-3.5 h-3.5" />
              <span>Counter-Sign DPA</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left Column: Sticky Sidebar / Table of Contents */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 space-y-6">
              {/* Search Box */}
              <div className="bg-[var(--color-paper-raised)] p-4 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1">
                <label
                  htmlFor="dpa-search"
                  className="block text-xs font-semibold text-[var(--color-ink-900)] mb-2"
                >
                  Search Agreement Clauses
                </label>
                <div className="relative">
                  <Search className="w-4 h-4 text-[var(--color-ink-500)] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    id="dpa-search"
                    type="text"
                    placeholder="Search e.g. breach, SCCs, deletion..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs rounded-xl bg-[var(--color-paper-sunken)] border border-[var(--color-ink-900)]/10 text-[var(--color-ink-900)] placeholder-[var(--color-ink-500)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-500)]"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--color-ink-400)] hover:text-[var(--color-ink-700)] p-0.5 cursor-pointer"
                      aria-label="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {searchQuery && (
                  <p className="text-[11px] text-[var(--color-brand-700)] mt-2 font-medium">
                    Showing results for &ldquo;{searchQuery}&rdquo;
                  </p>
                )}
              </div>

              {/* Table of Contents List */}
              <nav
                aria-label="DPA Table of Contents"
                className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 max-h-[calc(100vh-320px)] overflow-y-auto"
              >
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs font-mono font-bold text-[var(--color-ink-500)] uppercase tracking-wider">
                    Clauses & Annexes
                  </p>
                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-[var(--color-brand-50)] text-[var(--color-brand-700)]">
                    v{DPA_METADATA.version}
                  </span>
                </div>

                {/* Core Sections List */}
                <div className="space-y-4">
                  <div>
                    <p className="text-[11px] font-semibold text-[var(--color-ink-400)] uppercase tracking-wider mb-2 px-1">
                      Main Agreement
                    </p>
                    <ul className="space-y-1 text-xs">
                      {DPA_SECTIONS.map((sec) => {
                        const isActive = activeSectionId === sec.id;

                        return (
                          <li key={sec.id}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(sec.id)}
                              className={`w-full text-left py-1.5 px-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                                isActive
                                  ? "bg-[var(--color-brand-50)] text-[var(--color-brand-800)] font-semibold shadow-xs"
                                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] hover:text-[var(--color-ink-900)]"
                              }`}
                            >
                              <span className="truncate">
                                <span className="text-[var(--color-ink-400)] mr-1.5 font-mono text-[11px]">
                                  {sec.sectionNumber}.
                                </span>
                                {sec.title}
                              </span>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 ml-2" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  {/* Annexes List */}
                  <div className="pt-3 border-t border-[var(--color-ink-900)]/10">
                    <p className="text-[11px] font-semibold text-[var(--color-ink-400)] uppercase tracking-wider mb-2 px-1">
                      Annexes & Schedules
                    </p>
                    <ul className="space-y-1 text-xs">
                      {ANNEXES_LIST.map((annex) => {
                        const isActive = activeSectionId === annex.id;

                        return (
                          <li key={annex.id}>
                            <button
                              type="button"
                              onClick={() => scrollToSection(annex.id)}
                              className={`w-full text-left py-1.5 px-2.5 rounded-lg font-medium transition-all duration-150 flex items-center justify-between cursor-pointer ${
                                isActive
                                  ? "bg-[var(--color-brand-50)] text-[var(--color-brand-800)] font-semibold shadow-xs"
                                  : "text-[var(--color-ink-700)] hover:bg-[var(--color-paper-sunken)] hover:text-[var(--color-ink-900)]"
                              }`}
                            >
                              <span className="truncate">{annex.annexNumber}: {annex.title.split(": ")[1]}</span>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 ml-2" />
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </nav>

              {/* Direct Compliance / DPO Contact */}
              <div className="bg-[var(--color-paper-raised)] p-5 rounded-2xl border border-[var(--color-ink-900)]/10 shadow-tier-1 text-xs space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-[var(--color-brand-50)] flex items-center justify-center text-[var(--color-brand-600)]">
                    <Mail className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-ink-900)]">
                      Compliance & DPO Office
                    </p>
                    <p className="text-[11px] text-[var(--color-ink-500)]">
                      Official regulatory inquiries
                    </p>
                  </div>
                </div>

                <p className="text-[var(--color-ink-700)] leading-relaxed">
                  Need a custom Master Services Agreement redline, bespoke sub-processor notification webhook, or BAA?
                </p>

                <div className="pt-2 border-t border-[var(--color-ink-900)]/10 flex flex-col gap-1.5 font-mono text-[11px]">
                  <a
                    href={`mailto:${DPA_METADATA.dpoEmail}`}
                    className="inline-flex items-center gap-1 text-[var(--color-brand-700)] font-semibold hover:underline"
                  >
                    <span>{DPA_METADATA.dpoEmail}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={`mailto:${DPA_METADATA.securityEmail}`}
                    className="inline-flex items-center gap-1 text-[var(--color-ink-600)] hover:text-[var(--color-ink-900)] hover:underline"
                  >
                    <span>{DPA_METADATA.securityEmail}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column: Detailed Clauses & Annexes */}
            <main className="lg:col-span-8 space-y-12">
              {/* Introduction Banner Card */}
              <div className="bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1 relative overflow-hidden">
                <div className="flex items-center gap-2.5 text-xs font-mono font-semibold uppercase tracking-wider text-[var(--color-brand-700)] mb-3">
                  <FileSignature className="w-4 h-4 text-[var(--color-brand-600)]" />
                  <span>Binding Addendum Preamble</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
                  Data Processing Agreement & Standard Contractual Clauses
                </h2>
                <p className="mt-3 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                  This Agreement sets out the framework for processing personal data on behalf of Customer in accordance with the requirements of European Data Protection Laws, UK GDPR, and the California Consumer Privacy Act. By utilizing Rapto&apos;s AI meeting intelligence platform, the parties agree to be bound by the terms below.
                </p>

                <div className="mt-6 pt-5 border-t border-[var(--color-ink-900)]/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-[var(--color-paper-sunken)] p-3.5 rounded-xl">
                    <span className="font-semibold text-[var(--color-ink-900)] block mb-1">
                      Processor (Rapto):
                    </span>
                    <p className="text-[var(--color-ink-600)]">{DPA_METADATA.companyName}</p>
                    <p className="text-[11px] text-[var(--color-ink-500)]">{DPA_METADATA.companyAddress}</p>
                  </div>
                  <div className="bg-[var(--color-paper-sunken)] p-3.5 rounded-xl">
                    <span className="font-semibold text-[var(--color-ink-900)] block mb-1">
                      Controller (Customer):
                    </span>
                    <p className="text-[var(--color-ink-600)]">Customer Workspace / Entity</p>
                    <p className="text-[11px] text-[var(--color-ink-500)]">As identified in the Master Services Agreement</p>
                  </div>
                </div>
              </div>

              {/* Main DPA Sections (1-12) */}
              {(activeTab === "all" || activeTab === "core") && (
                <div className="space-y-10">
                  {filteredSections.map((section: DPASection) => (
                    <article
                      key={section.id}
                      id={section.id}
                      className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1 transition-all hover:border-[var(--color-brand-500)]/20"
                    >
                      {/* Section Header */}
                      <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-xl bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] flex items-center justify-center font-mono font-bold text-xs shrink-0">
                              {section.sectionNumber}
                            </span>
                            <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)] tracking-tight">
                              {section.title}
                            </h2>
                          </div>

                          <div className="flex items-center gap-1.5">
                            {section.badge && (
                              <span className="hidden sm:inline-block text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-[var(--color-brand-25)] text-[var(--color-brand-800)] border border-[var(--color-brand-100)]">
                                {section.badge}
                              </span>
                            )}
                            <button
                              type="button"
                              onClick={() => copySectionLink(section.id)}
                              className="text-[var(--color-ink-400)] hover:text-[var(--color-brand-600)] p-1.5 rounded-lg hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                              title="Copy link to this clause"
                            >
                              {copiedSectionId === section.id ? (
                                <Check className="w-4 h-4 text-[var(--color-brand-600)]" />
                              ) : (
                                <Copy className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </div>

                        <p className="mt-2 text-xs text-[var(--color-ink-500)]">
                          {section.shortSummary}
                        </p>
                      </div>

                      {/* Callout Box */}
                      {section.content.callout && (
                        <div
                          className={`mb-6 rounded-2xl p-5 border text-xs sm:text-sm leading-relaxed ${
                            section.content.callout.type === "guarantee"
                              ? "bg-[var(--color-brand-25)] text-[var(--color-brand-900)] border-[var(--color-brand-300)]/60 shadow-xs"
                              : section.content.callout.type === "security"
                              ? "bg-[var(--color-canvas-dark)] text-white border-white/10"
                              : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-900)] border-[var(--color-ink-900)]/15"
                          }`}
                        >
                          <div className="flex items-start gap-3.5">
                            {section.content.callout.type === "guarantee" ? (
                              <Sparkles className="w-5 h-5 shrink-0 mt-0.5 text-[var(--color-brand-600)]" />
                            ) : (
                              <ShieldAlert
                                className={`w-5 h-5 shrink-0 mt-0.5 ${
                                  section.content.callout.type === "security"
                                    ? "text-[var(--color-brand-300)]"
                                    : "text-[var(--color-brand-600)]"
                                }`}
                              />
                            )}
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
                              className="flex items-start gap-3 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-1" />
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
                                      className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--color-ink-700)]"
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
                    </article>
                  ))}
                </div>
              )}

              {/* Annex I: Details of Processing */}
              {(activeTab === "all" || activeTab === "annexes") && (
                <article
                  id="annex-1-details-of-processing"
                  className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
                >
                  <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] font-mono font-bold text-xs">
                          Annex I
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)]">
                          Annex I: Details of Processing & Data Subjects
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => copySectionLink("annex-1-details-of-processing")}
                        className="text-[var(--color-ink-400)] hover:text-[var(--color-brand-600)] p-1.5 rounded-lg hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                        title="Copy link to Annex I"
                      >
                        {copiedSectionId === "annex-1-details-of-processing" ? (
                          <Check className="w-4 h-4 text-[var(--color-brand-600)]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-ink-500)]">
                      Standard Contractual Clauses Appendix 1 information regarding data subjects, data categories, and nature of processing.
                    </p>
                  </div>

                  <div className="space-y-6 text-xs sm:text-sm text-[var(--color-ink-700)]">
                    <div className="p-4 rounded-2xl bg-[var(--color-paper-sunken)]/60 border border-[var(--color-ink-900)]/5 space-y-2">
                      <h3 className="font-semibold text-[var(--color-ink-900)]">A. List of Parties</h3>
                      <p>
                        <strong>Data Exporter (Controller):</strong> Customer entity utilizing the Rapto meeting intelligence platform.
                      </p>
                      <p>
                        <strong>Data Importer (Processor):</strong> {DPA_METADATA.companyName}, 548 Market St, Suite 39201, San Francisco, CA 94104. Contact: {DPA_METADATA.dpoEmail}.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-[var(--color-ink-900)] mb-1.5">B. Categories of Data Subjects</h3>
                        <p className="leading-relaxed">
                          Customer&apos;s authorized users, employees, contractors, advisors, meeting attendees, conference call participants, interview candidates, and third parties participating in recorded and analyzed meetings.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[var(--color-ink-900)] mb-1.5">C. Categories of Personal Data</h3>
                        <ul className="space-y-1.5 pl-2">
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2" />
                            <span><strong>Profile & Identity:</strong> Names, email addresses, job titles, profile pictures, calendar metadata, meeting invitations.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2" />
                            <span><strong>Meeting Content:</strong> Audio streams, video feeds (if screen sharing is captured), diarized voice transcripts, spoken text, conversational notes, executive summaries.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-brand-500)] shrink-0 mt-2" />
                            <span><strong>Actionable Intelligence:</strong> Assigned tasks, commitments made, milestone deadlines, follow-up items, semantic memory graphs.</span>
                          </li>
                        </ul>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[var(--color-ink-900)] mb-1.5">D. Sensitive Data (Special Categories)</h3>
                        <p className="leading-relaxed">
                          Rapto does not intentionally collect or require special categories of personal data (GDPR Article 9). However, if spoken during a recorded meeting, such data may be processed incidental to speech-to-text transcription.
                        </p>
                      </div>

                      <div>
                        <h3 className="font-semibold text-[var(--color-ink-900)] mb-1.5">E. Frequency and Duration of Processing</h3>
                        <p className="leading-relaxed">
                          Continuous processing during the active term of the Master Services Agreement. Data is stored until deleted by Customer or purged thirty (30) days post contract termination.
                        </p>
                      </div>
                    </div>
                  </div>
                </article>
              )}

              {/* Annex II: Technical & Organizational Security Measures (TOMs) */}
              {(activeTab === "all" || activeTab === "annexes") && (
                <article
                  id="annex-2-technical-and-organizational-measures"
                  className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
                >
                  <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] font-mono font-bold text-xs">
                          Annex II
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)]">
                          Annex II: Technical & Organizational Security Measures
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => copySectionLink("annex-2-technical-and-organizational-measures")}
                        className="text-[var(--color-ink-400)] hover:text-[var(--color-brand-600)] p-1.5 rounded-lg hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                        title="Copy link to Annex II"
                      >
                        {copiedSectionId === "annex-2-technical-and-organizational-measures" ? (
                          <Check className="w-4 h-4 text-[var(--color-brand-600)]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-ink-500)]">
                      Technical and organizational measures implemented by Rapto in accordance with GDPR Article 32 and SOC 2 Type II controls.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {TECHNICAL_SECURITY_MEASURES.map((category, cIdx) => (
                      <div
                        key={cIdx}
                        className="p-5 rounded-2xl bg-[var(--color-paper-sunken)]/60 border border-[var(--color-ink-900)]/10 space-y-3.5"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-[var(--color-brand-50)] border border-[var(--color-brand-100)] flex items-center justify-center text-[var(--color-brand-600)]">
                            <Lock className="w-4 h-4" />
                          </div>
                          <div>
                            <h3 className="text-sm font-display font-semibold text-[var(--color-ink-900)]">
                              {category.domain}
                            </h3>
                            <p className="text-[11px] text-[var(--color-ink-500)]">
                              {category.description}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2.5 pt-2 border-t border-[var(--color-ink-900)]/5">
                          {category.controls.map((ctrl, ctrlIdx) => (
                            <div
                              key={ctrlIdx}
                              className="p-2.5 rounded-xl bg-[var(--color-paper-raised)] border border-[var(--color-ink-900)]/5 text-xs space-y-1"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="font-semibold text-[var(--color-ink-900)]">
                                  {ctrl.title}
                                </span>
                                <span className="text-[10px] font-mono text-[var(--color-brand-700)] bg-[var(--color-brand-50)] px-1.5 py-0.5 rounded">
                                  {ctrl.standard}
                                </span>
                              </div>
                              <p className="text-[11px] text-[var(--color-ink-600)] leading-relaxed">
                                {ctrl.details}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              )}

              {/* Annex III: Authorized Sub-processors Registry */}
              {(activeTab === "all" || activeTab === "annexes" || activeTab === "subprocessors") && (
                <article
                  id="annex-3-authorized-sub-processors"
                  className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
                >
                  <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] font-mono font-bold text-xs">
                          Annex III
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)]">
                          Annex III: Authorized Sub-processors Registry
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => copySectionLink("annex-3-authorized-sub-processors")}
                        className="text-[var(--color-ink-400)] hover:text-[var(--color-brand-600)] p-1.5 rounded-lg hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                        title="Copy link to Annex III"
                      >
                        {copiedSectionId === "annex-3-authorized-sub-processors" ? (
                          <Check className="w-4 h-4 text-[var(--color-brand-600)]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-ink-500)]">
                      Current third-party infrastructure and sub-processors authorized to process Customer Personal Data under GDPR Article 28(2).
                    </p>
                  </div>

                  {/* Sub-processor Category Filter Pills */}
                  <div className="mb-5 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[var(--color-ink-500)] font-semibold mr-1 flex items-center gap-1">
                      <Filter className="w-3.5 h-3.5" /> Filter:
                    </span>
                    {["All", "Cloud Infrastructure", "AI Inference & Models", "Edge & Security", "Billing & Operations"].map(
                      (cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setSubProcessorFilter(cat)}
                          className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                            subProcessorFilter === cat
                              ? "bg-[var(--color-brand-700)] text-white"
                              : "bg-[var(--color-paper-sunken)] text-[var(--color-ink-700)] hover:bg-[var(--color-ink-900)]/10"
                          }`}
                        >
                          {cat}
                        </button>
                      )
                    )}
                  </div>

                  {/* Sub-processors List Cards */}
                  <div className="space-y-4">
                    {filteredSubProcessors.map((sp: SubProcessorEntry, spIdx: number) => (
                      <div
                        key={spIdx}
                        className="p-5 rounded-2xl bg-[var(--color-paper-sunken)]/50 border border-[var(--color-ink-900)]/10 hover:border-[var(--color-brand-500)]/30 transition-all text-xs space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)] flex items-center justify-center border border-[var(--color-brand-100)] shrink-0 font-bold">
                              <Server className="w-4 h-4" />
                            </div>
                            <div>
                              <h3 className="font-display font-semibold text-sm text-[var(--color-ink-900)]">
                                {sp.name}
                              </h3>
                              <span className="text-[11px] font-mono text-[var(--color-brand-700)]">
                                {sp.category}
                              </span>
                            </div>
                          </div>

                          <a
                            href={sp.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[var(--color-brand-700)] hover:underline self-start sm:self-auto"
                          >
                            <span>Compliance Portal</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[var(--color-ink-900)]/5 text-[11px]">
                          <div>
                            <span className="font-semibold text-[var(--color-ink-900)] block mb-0.5">
                              Processing Purpose:
                            </span>
                            <p className="text-[var(--color-ink-600)]">{sp.purpose}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--color-ink-900)] block mb-0.5">
                              Primary Location / Cloud Region:
                            </span>
                            <p className="text-[var(--color-ink-600)]">{sp.location}</p>
                          </div>
                          <div>
                            <span className="font-semibold text-[var(--color-ink-900)] block mb-0.5">
                              Safeguards & Safeguards:
                            </span>
                            <p className="text-[var(--color-ink-600)]">{sp.safeguards}</p>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[var(--color-ink-900)]/5 text-[11px] bg-[var(--color-paper-raised)] p-2.5 rounded-xl">
                          <strong className="text-[var(--color-ink-900)]">Data Scope: </strong>
                          <span className="text-[var(--color-ink-600)]">{sp.dataScope}</span>
                        </div>
                      </div>
                    ))}

                    {filteredSubProcessors.length === 0 && (
                      <p className="text-center py-6 text-xs text-[var(--color-ink-500)]">
                        No sub-processors match your search filter.
                      </p>
                    )}
                  </div>
                </article>
              )}

              {/* Annex IV: US State Privacy Law Addendum */}
              {(activeTab === "all" || activeTab === "annexes") && (
                <article
                  id="annex-4-us-state-privacy-law-addendum"
                  className="scroll-mt-28 bg-[var(--color-paper-raised)] rounded-3xl p-7 sm:p-9 border border-[var(--color-ink-900)]/10 shadow-tier-1"
                >
                  <div className="mb-6 pb-4 border-b border-[var(--color-ink-900)]/10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="px-2.5 py-1 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-700)] border border-[var(--color-brand-100)] font-mono font-bold text-xs">
                          Annex IV
                        </span>
                        <h2 className="text-xl sm:text-2xl font-display font-semibold text-[var(--color-ink-900)]">
                          Annex IV: US State Privacy Law Addendum (CCPA/CPRA)
                        </h2>
                      </div>
                      <button
                        type="button"
                        onClick={() => copySectionLink("annex-4-us-state-privacy-law-addendum")}
                        className="text-[var(--color-ink-400)] hover:text-[var(--color-brand-600)] p-1.5 rounded-lg hover:bg-[var(--color-paper-sunken)] transition-colors cursor-pointer"
                        title="Copy link to Annex IV"
                      >
                        {copiedSectionId === "annex-4-us-state-privacy-law-addendum" ? (
                          <Check className="w-4 h-4 text-[var(--color-brand-600)]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    <p className="mt-2 text-xs text-[var(--color-ink-500)]">
                      Service Provider Certification under the California Consumer Privacy Act (CCPA), as amended by CPRA, and state privacy acts (VCDPA, CPA, CTDPA).
                    </p>
                  </div>

                  <div className="space-y-4 text-xs sm:text-sm text-[var(--color-ink-700)] leading-relaxed">
                    <p>
                      This Addendum applies solely to Customer Personal Data subject to the CCPA/CPRA and comprehensive US state privacy statutes.
                    </p>

                    <div className="space-y-2.5 p-4 rounded-2xl bg-[var(--color-brand-25)]/60 border border-[var(--color-brand-200)]/60 text-xs">
                      <h3 className="font-semibold text-[var(--color-brand-900)] flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[var(--color-brand-600)]" />
                        Service Provider Certification
                      </h3>
                      <ul className="space-y-2 text-[var(--color-brand-950)]">
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                          <span>Rapto certifies that it acts strictly as a <strong>&ldquo;Service Provider&rdquo;</strong> as defined under Cal. Civ. Code § 1798.140(ag).</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                          <span>Rapto shall not <strong>&ldquo;Sell&rdquo;</strong> or <strong>&ldquo;Share&rdquo;</strong> Customer Personal Information for cross-context behavioral advertising.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                          <span>Rapto shall not retain, use, or disclose Customer Personal Information outside of the direct business relationship established with Customer.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-600)] shrink-0 mt-0.5" />
                          <span>Rapto shall not combine Customer Personal Information with personal data received from other entities, except as permitted under CCPA regulations.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </article>
              )}

              {/* Bottom Execution CTA Box */}
              <div className="rounded-3xl bg-[var(--color-canvas-dark)] text-white p-8 sm:p-10 border border-white/10 shadow-tier-3 relative overflow-hidden">
                <div className="relative z-10 max-w-2xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-semibold text-[var(--color-brand-300)] mb-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enterprise Legal Operations</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-semibold text-white tracking-tight">
                    Need a Counter-Signed Copy or Custom Enterprise Redline?
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-white/70 leading-relaxed">
                    Our compliance team provides instantaneous pre-signed execution packages, custom Business Associate Agreements (BAAs), and dedicated security vendor questionnaires.
                  </p>

                  <div className="mt-6 flex flex-wrap items-center gap-3.5">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-[var(--color-brand-500)] text-white hover:bg-[var(--color-brand-600)] transition-all shadow-tier-1 cursor-pointer"
                    >
                      <FileSignature className="w-3.5 h-3.5" />
                      <span>Execute DPA Online</span>
                    </button>

                    <a
                      href={`mailto:${DPA_METADATA.legalEmail}?subject=Enterprise%20DPA%20Execution%20Inquiry`}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-white border border-white/15 transition-colors cursor-pointer"
                    >
                      <Mail className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
                      <span>Contact Legal Team</span>
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </section>

      {/* Execution Modal */}
      <DPAExecutionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
