"use client";

import { useState } from "react";
import { TermsHero } from "./TermsHero";
import { TermsHighlights } from "./TermsHighlights";
import { TermsContent } from "./TermsContent";

export function TermsPageClient() {
  const [viewMode, setViewMode] = useState<"all" | "plain" | "legal">("all");

  return (
    <>
      <TermsHero viewMode={viewMode} setViewMode={setViewMode} />
      <TermsHighlights />
      <TermsContent viewMode={viewMode} />
    </>
  );
}
