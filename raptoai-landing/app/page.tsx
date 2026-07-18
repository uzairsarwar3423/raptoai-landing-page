import { Hero } from "@/components/sections/Hero/Hero";
import { TrustedBrandStrip } from "@/components/sections/TrustedBrandStrip/TrustedBrandStrip";
import { CostStats } from "@/components/sections/CostStats/CostStats";
import { Footer } from "@/components/footer/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustedBrandStrip />
      <CostStats />

      <section id="final-cta" className="h-[100vh] bg-[var(--color-paper)] flex flex-col items-center justify-center relative z-20">
        <p className="text-[var(--text-display-m)] font-display text-[var(--color-ink-900)] max-w-2xl text-center">
          White background content. The navbar is now blurred and dark text!
        </p>
        <p className="mt-4 text-[var(--text-body-m)] text-[var(--color-ink-500)]">
          Keep scrolling to see the GSAP curtain reveal footer effect.
        </p>
      </section>

      <Footer finalCtaSelector="#final-cta" />
    </main>
  );
}
