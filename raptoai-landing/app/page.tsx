import { Hero } from "@/components/sections/Hero/Hero";
import { TrustedBrandStrip } from "@/components/sections/TrustedBrandStrip/TrustedBrandStrip";
import { WhyUsBento } from "@/components/sections/WhyUsBento/WhyUsBento";
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
      <WhyUsBento />
      <WorkflowFeature />
      <Integrations />
      <Pricing />
      <FinalCTA />

      <Footer finalCtaSelector="#final-cta" />
    </main>
  );
}
