import { Hero } from "@/components/sections/Hero/Hero";
import { TrustedBrandStrip } from "@/components/sections/TrustedBrandStrip/TrustedBrandStrip";
import { CostStats } from "@/components/sections/CostStats/CostStats";
import { Mechanism } from "@/components/sections/Mechanism/Mechanism";
import { WorkflowFeature } from "@/components/sections/WorkflowFeature/WorkflowFeature";
import { Integrations } from "@/components/sections/Integrations/Integrations";
import { Pricing } from "@/components/sections/Pricing/Pricing";
import { FinalCTA } from "@/components/sections/FinalCTA/FinalCTA";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBrandStrip />
      <CostStats />
      <Mechanism />
      <WorkflowFeature />
      <Integrations />
      <Pricing />
      <FinalCTA />

      <Footer finalCtaSelector="#final-cta" />
    </main>
  );
}
