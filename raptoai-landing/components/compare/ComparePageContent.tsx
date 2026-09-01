"use client";

import { useState } from "react";
import { CompareHero } from "./CompareHero";
import { CompareDifferentiators } from "./CompareDifferentiators";
import { CompareMatrix } from "./CompareMatrix";
import { CompareCostCalculator } from "./CompareCostCalculator";
import { CompareSwitchStories } from "./CompareSwitchStories";
import { CompareFaq } from "./CompareFaq";

interface ComparePageContentProps {
  initialCompetitorId?: string;
}

export function ComparePageContent({ initialCompetitorId = "all" }: ComparePageContentProps) {
  const [selectedCompetitorId, setSelectedCompetitorId] = useState<string>(initialCompetitorId);

  const handleSelectCompetitor = (id: string) => {
    setSelectedCompetitorId(id);
    const matrixEl = document.getElementById("compare-matrix");
    if (matrixEl) {
      matrixEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* 1. Hero with Competitor Switcher */}
      <CompareHero
        selectedCompetitorId={selectedCompetitorId}
        onSelectCompetitor={handleSelectCompetitor}
      />

      {/* 2. Key Architectural Differentiators */}
      <CompareDifferentiators />

      {/* 3. Deep Side-by-Side Comparison Matrix */}
      <CompareMatrix
        selectedCompetitorId={selectedCompetitorId}
        onSelectCompetitor={handleSelectCompetitor}
      />

      {/* 4. License Math & ROI Calculator */}
      <CompareCostCalculator />

      {/* 5. Real Migration & Switch Testimonials */}
      <CompareSwitchStories />

      {/* 6. Comparison FAQs */}
      <CompareFaq />
    </div>
  );
}
