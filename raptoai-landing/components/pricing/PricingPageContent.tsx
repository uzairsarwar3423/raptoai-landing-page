"use client";

import { useState } from "react";
import { PricingHero } from "./PricingHero";
import { PricingCards } from "./PricingCards";
import { PricingRoiCalculator } from "./PricingRoiCalculator";
import { PricingMatrix } from "./PricingMatrix";
import { PricingTestimonials } from "./PricingTestimonials";
import { PricingFaq } from "./PricingFaq";

export function PricingPageContent() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [highlightedPlanId, setHighlightedPlanId] = useState<string | undefined>(undefined);

  const handleSelectPlanFromRoi = (planId: string) => {
    setHighlightedPlanId(planId);
    // Smooth scroll back to pricing cards
    const cardsEl = document.getElementById("pricing-cards");
    if (cardsEl) {
      cardsEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative">
      {/* 1. Hero with billing switch */}
      <PricingHero isAnnual={isAnnual} onToggleBilling={setIsAnnual} />

      {/* 2. Tiered Pricing Cards & Enterprise Banner */}
      <div id="pricing-cards" className="pb-16 lg:pb-24">
        <PricingCards isAnnual={isAnnual} highlightedPlanId={highlightedPlanId} />
      </div>

      {/* 3. Interactive ROI & Productivity Estimator */}
      <PricingRoiCalculator onSelectPlan={handleSelectPlanFromRoi} />

      {/* 4. Comprehensive Feature Comparison Table */}
      <PricingMatrix isAnnual={isAnnual} defaultExpanded={true} />

      {/* 5. Trust & Social Proof Testimonials */}
      <PricingTestimonials />

      {/* 6. Frequently Asked Questions (FAQ) Accordion */}
      <PricingFaq />
    </div>
  );
}
