import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero/Hero";
import { TrustedBrandStrip } from "@/components/sections/TrustedBrandStrip/TrustedBrandStrip";
import { CostStats } from "@/components/sections/CostStats/CostStats";
import { WhyUsBento } from "@/components/sections/WhyUsBento/WhyUsBento";
import { WorkflowFeature } from "@/components/sections/WorkflowFeature/WorkflowFeature";
import { Integrations } from "@/components/sections/Integrations/Integrations";
import { CompetitorCompareSection } from "@/components/sections/Compare/CompetitorCompareSection";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { SecurityTrustStrip } from "@/components/sections/Security/SecurityTrustStrip";
import { HomeFaqSection } from "@/components/sections/FAQ/HomeFaqSection";
import { HomeBlogPreview } from "@/components/sections/Blog/HomeBlogPreview";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://rapto.cloud";

/**
 * Homepage metadata — sets an explicit self-referencing canonical.
 * Root layout.tsx intentionally does NOT set a global canonical to prevent
 * sub-pages inheriting "/" as their canonical URL.
 */
export const metadata: Metadata = {
  alternates: {
    canonical: siteUrl,
  },
};


export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBrandStrip />
      <CostStats />
      <WhyUsBento />
      <WorkflowFeature />
      <Integrations />
      <CompetitorCompareSection />
      <Pricing />
      <SecurityTrustStrip />
      <HomeFaqSection />
      <HomeBlogPreview />
      <FinalCTA />

      <Footer finalCtaSelector="#final-cta" />
    </main>
  );
}
