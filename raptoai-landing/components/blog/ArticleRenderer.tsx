"use client";

import * as React from "react";
import { Check, Copy, Info, AlertTriangle, Lightbulb, CheckCircle2 } from "lucide-react";
import { ArchitectureFlowDiagram } from "@/components/blog/diagrams/ArchitectureFlowDiagram";

export interface ArticleRendererProps {
  content: string;
  className?: string;
}

function CodeBlock({ code, language }: { code: string; language?: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative my-6 rounded-[var(--radius-lg)] overflow-hidden bg-[var(--color-canvas-dark)] text-[var(--color-ink-on-dark)] border border-white/10 shadow-tier-2">
      <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10 text-xs font-mono text-white/60">
        <span className="uppercase">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 rounded bg-white/10 hover:bg-white/20 text-white/90 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[var(--color-brand-300)]" />
              <span className="text-[var(--color-brand-300)] font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed">
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

function CalloutBox({ type, children }: { type: "NOTE" | "TIP" | "IMPORTANT" | "WARNING"; children: React.ReactNode }) {
  const styles = {
    NOTE: {
      bg: "bg-blue-500/10 border-blue-500/30 text-blue-950 dark:text-blue-200",
      icon: Info,
      title: "Note",
      iconColor: "text-blue-600",
    },
    TIP: {
      bg: "bg-[var(--color-brand-50)] border-[var(--color-brand-500)]/30 text-[var(--color-brand-900)]",
      icon: Lightbulb,
      title: "Pro Tip",
      iconColor: "text-[var(--color-brand-600)]",
    },
    IMPORTANT: {
      bg: "bg-amber-500/10 border-amber-500/30 text-amber-950 dark:text-amber-200",
      icon: AlertTriangle,
      title: "Important Takeaway",
      iconColor: "text-amber-600",
    },
    WARNING: {
      bg: "bg-red-500/10 border-red-500/30 text-red-950 dark:text-red-200",
      icon: AlertTriangle,
      title: "Warning",
      iconColor: "text-red-600",
    },
  };

  const current = styles[type] || styles.NOTE;
  const IconComponent = current.icon;

  return (
    <div className={`my-6 p-4 sm:p-5 rounded-[var(--radius-lg)] border ${current.bg} shadow-tier-1`}>
      <div className="flex items-center gap-2 mb-2 font-mono text-xs uppercase tracking-wider font-semibold">
        <IconComponent className={`w-4 h-4 ${current.iconColor}`} />
        <span>{current.title}</span>
      </div>
      <div className="text-sm sm:text-base leading-relaxed">{children}</div>
    </div>
  );
}

export function ArticleRenderer({ content, className = "" }: ArticleRendererProps) {
  // Parse simple custom markdown chunks
  const renderFormattedText = (raw: string) => {
    const lines = raw.trim().split("\n");
    const elements: React.ReactNode[] = [];

    let inCodeBlock = false;
    let codeLanguage = "";
    let codeBuffer: string[] = [];

    let inTable = false;
    let tableBuffer: string[] = [];

    let inBlockquote = false;
    let blockquoteBuffer: string[] = [];

    const flushCode = () => {
      if (codeBuffer.length > 0) {
        const codeText = codeBuffer.join("\n");
        elements.push(
          <CodeBlock
            key={`code-${elements.length}`}
            code={codeText}
            language={codeLanguage}
          />
        );
        codeBuffer = [];
        inCodeBlock = false;
      }
    };

    const flushTable = () => {
      if (tableBuffer.length > 0) {
        const validRows = tableBuffer.filter((r) => !r.includes("---"));
        const headerRow = validRows[0];
        const bodyRows = validRows.slice(1);

        const parseCells = (rowStr: string) =>
          rowStr
            .split("|")
            .map((c) => c.trim())
            .filter((c, i, arr) => (i !== 0 && i !== arr.length - 1) || c.length > 0);

        const headers = headerRow ? parseCells(headerRow) : [];

        elements.push(
          <div
            key={`table-${elements.length}`}
            className="my-6 overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-ink-900)]/10 shadow-tier-1"
          >
            <table className="w-full text-left border-collapse text-xs sm:text-sm">
              <thead className="bg-[var(--color-paper-sunken)] border-b border-[var(--color-ink-900)]/10">
                <tr>
                  {headers.map((h, i) => (
                    <th
                      key={i}
                      className="px-4 py-3 font-mono font-semibold text-[var(--color-ink-900)] uppercase tracking-wider text-xs"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--color-ink-900)]/5 bg-[var(--color-paper-raised)]">
                {bodyRows.map((row, rIdx) => {
                  const cells = parseCells(row);
                  return (
                    <tr
                      key={rIdx}
                      className="hover:bg-[var(--color-brand-25)] transition-colors"
                    >
                      {cells.map((cell, cIdx) => (
                        <td
                          key={cIdx}
                          className="px-4 py-3 text-[var(--color-ink-700)] leading-relaxed"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );

        tableBuffer = [];
        inTable = false;
      }
    };

    const flushBlockquote = () => {
      if (blockquoteBuffer.length > 0) {
        const fullQuote = blockquoteBuffer.join("\n");
        // Check if callout
        const calloutMatch = fullQuote.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING)\]\n?([\s\S]*)/);
        if (calloutMatch) {
          const type = calloutMatch[1] as "NOTE" | "TIP" | "IMPORTANT" | "WARNING";
          const body = calloutMatch[2];
          elements.push(
            <CalloutBox key={`callout-${elements.length}`} type={type}>
              <p>{body}</p>
            </CalloutBox>
          );
        } else {
          elements.push(
            <blockquote
              key={`quote-${elements.length}`}
              className="my-6 pl-5 border-l-4 border-[var(--color-brand-500)] text-base sm:text-lg italic text-[var(--color-ink-900)] font-display leading-relaxed bg-[var(--color-brand-25)]/50 py-3 pr-4 rounded-r-lg"
            >
              {fullQuote}
            </blockquote>
          );
        }
        blockquoteBuffer = [];
        inBlockquote = false;
      }
    };

    lines.forEach((line, index) => {
      // Code fence
      if (line.startsWith("```")) {
        if (!inCodeBlock) {
          if (inTable) flushTable();
          if (inBlockquote) flushBlockquote();
          inCodeBlock = true;
          codeLanguage = line.replace("```", "").trim();
        } else {
          flushCode();
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Tables
      if (line.startsWith("|")) {
        if (inBlockquote) flushBlockquote();
        inTable = true;
        tableBuffer.push(line);
        return;
      } else if (inTable) {
        flushTable();
      }

      // Blockquotes / Callouts
      if (line.startsWith("> ")) {
        inBlockquote = true;
        blockquoteBuffer.push(line.replace(/^>\s?/, ""));
        return;
      } else if (inBlockquote) {
        flushBlockquote();
      }

      // React Flow Interactive Diagrams
      const reactFlowMatch = line.trim().match(/^\[ReactFlow:(high-level|queues|polyglot|e2e)\](?:\s*\((.*?)\))?$/);
      if (reactFlowMatch) {
        const diagramType = reactFlowMatch[1] as "high-level" | "queues" | "polyglot" | "e2e";
        const caption = reactFlowMatch[2] || undefined;
        elements.push(
          <ArchitectureFlowDiagram
            key={`reactflow-${elements.length}`}
            type={diagramType}
            caption={caption}
          />
        );
        return;
      }

      // Headings
      if (line.startsWith("## ")) {
        const title = line.replace("## ", "").trim();
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        elements.push(
          <h2
            key={`h2-${index}`}
            id={id}
            className="scroll-mt-24 font-display text-2xl sm:text-3xl font-bold text-[var(--color-ink-900)] mt-12 mb-4 tracking-[-0.01em] leading-snug border-b border-[var(--color-ink-900)]/10 pb-2"
          >
            {title}
          </h2>
        );
        return;
      }

      if (line.startsWith("### ")) {
        const title = line.replace("### ", "").trim();
        const id = title
          .toLowerCase()
          .replace(/[^\w\s-]/g, "")
          .replace(/\s+/g, "-");

        elements.push(
          <h3
            key={`h3-${index}`}
            id={id}
            className="scroll-mt-24 font-display text-xl sm:text-2xl font-semibold text-[var(--color-ink-900)] mt-8 mb-3 leading-snug"
          >
            {title}
          </h3>
        );
        return;
      }

      // Horizontal rule
      if (line.trim() === "---") {
        elements.push(
          <hr
            key={`hr-${index}`}
            className="my-10 border-t border-[var(--color-ink-900)]/10"
          />
        );
        return;
      }

      // Bullet points
      if (line.startsWith("* ") || line.startsWith("- ")) {
        const text = line.replace(/^[\*\-]\s+/, "");
        elements.push(
          <li
            key={`li-${index}`}
            className="ml-6 list-disc text-base sm:text-lg text-[var(--color-ink-700)] my-1.5 leading-relaxed"
          >
            <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
          </li>
        );
        return;
      }

      // Numbered lists
      if (/^\d+\.\s/.test(line)) {
        const text = line.replace(/^\d+\.\s+/, "");
        elements.push(
          <li
            key={`oli-${index}`}
            className="ml-6 list-decimal text-base sm:text-lg text-[var(--color-ink-700)] my-1.5 leading-relaxed"
          >
            <span dangerouslySetInnerHTML={{ __html: formatInline(text) }} />
          </li>
        );
        return;
      }

      // Regular paragraph
      if (line.trim().length > 0) {
        elements.push(
          <p
            key={`p-${index}`}
            className="text-base sm:text-lg text-[var(--color-ink-700)] my-4 leading-relaxed font-sans"
            dangerouslySetInnerHTML={{ __html: formatInline(line) }}
          />
        );
      }
    });

    if (inCodeBlock) flushCode();
    if (inTable) flushTable();
    if (inBlockquote) flushBlockquote();

    return elements;
  };

  const formatInline = (text: string): string => {
    return text
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--color-ink-900)]">$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
      // Inline code
      .replace(/`(.*?)`/g, '<code class="px-1.5 py-0.5 rounded bg-[var(--color-paper-sunken)] font-mono text-xs sm:text-sm text-[var(--color-brand-700)] border border-[var(--color-ink-900)]/10">$1</code>')
      // Links
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" class="text-[var(--color-brand-600)] font-medium underline underline-offset-4 decoration-[var(--color-brand-300)] hover:text-[var(--color-brand-700)] hover:decoration-[var(--color-brand-600)] transition-colors">$1</a>');
  };

  return (
    <article className={`prose-editorial max-w-none text-[var(--color-ink-900)] ${className}`}>
      {renderFormattedText(content)}
    </article>
  );
}
