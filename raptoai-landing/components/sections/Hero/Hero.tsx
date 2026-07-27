import Image from "next/image";
import { CheckCircle2, Calendar } from "lucide-react";
import { HeroHeadline } from "./HeroHeadline";
import { HeroArtifact } from "./HeroArtifact";
import { heroContent } from "./hero.content";

export function Hero() {
  return (
    <section id="hero-section" className="relative min-h-screen flex items-center justify-center pt-24 pb-20 bg-[var(--color-canvas-dark)] overflow-x-clip">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-0 items-center">

        {/* Copy Column */}
        <div className="flex flex-col text-left relative z-20 order-1">
          <p className="text-[var(--color-brand-300)] font-mono text-sm tracking-[0.08em] uppercase mb-6">
            {heroContent.eyebrow}
          </p>

          <HeroHeadline lines={heroContent.headline} />

          <p className="text-lg sm:text-xl text-white/90 max-w-[500px] mb-10 leading-relaxed font-medium drop-shadow-md">
            {heroContent.subhead}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <a
              href="https://app.rapto.cloud/register"
              className="px-8 py-3.5 rounded-full bg-white text-[var(--color-canvas-dark)] font-semibold hover:bg-white/90 transition-colors inline-block text-center"
            >
              {heroContent.ctaPrimary}
            </a>
            <button className="relative group px-8 py-3.5 rounded-full text-white font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden bg-[#0A0A0A]">

              {/* Rotating neon background (Creates the animated border) */}
              <div className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,transparent_0%,var(--color-brand-300)_50%,transparent_100%)] opacity-40 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Inner cutout mask to hollow out the button */}
              <div className="absolute inset-[1px] rounded-full bg-[#0A0A0A] backdrop-blur-3xl transition-colors duration-500 group-hover:bg-[#111111]" />

              {/* Static subtle border and outer ambient glow */}
              <div className="absolute inset-0 rounded-full border border-white/5 shadow-[0_0_20px_-5px_rgba(34,197,94,0.3)] group-hover:shadow-[0_0_40px_-5px_rgba(34,197,94,0.6)] transition-all duration-500 z-0" />

              {/* Text and animated arrow */}
              <span className="relative z-10 flex items-center gap-2 text-white/90 group-hover:text-white transition-colors">
                {heroContent.ctaSecondary.replace(' →', '')}
                <span className="group-hover:translate-x-1 transition-transform duration-300 text-[var(--color-brand-300)]">→</span>
              </span>
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-y-3 gap-x-4 sm:gap-x-6 opacity-80 mt-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--color-brand-300)]" />
              <span className="text-xs text-[var(--color-ink-on-dark-muted)] font-medium">No credit card</span>
            </div>
            
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[var(--color-brand-300)]" />
              <span className="text-xs text-[var(--color-ink-on-dark-muted)] font-medium">5 free meetings/mo</span>
            </div>
            
            <div className="w-1 h-1 rounded-full bg-white/20 hidden sm:block" />

            <div className="flex items-center gap-3">
              <span className="text-xs text-[var(--color-ink-on-dark-muted)] font-medium">Works with</span>
              <div className="flex items-center gap-2.5 bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
                <Image src="/icons/zoom.svg" alt="Zoom" width={16} height={16} className="opacity-75 hover:opacity-100 transition-opacity hover:scale-110" />
                <Image src="/icons/google-meet.svg" alt="Google Meet" width={16} height={16} className="opacity-75 hover:opacity-100 transition-opacity hover:scale-110" />
                <Image src="/icons/teams.svg" alt="Microsoft Teams" width={16} height={16} className="opacity-75 hover:opacity-100 transition-opacity hover:scale-110" />
              </div>
            </div>
          </div>
        </div>

        {/* SR-only argument description */}
        <p className="sr-only">
          Rapto automatically recognized that Thursday's update fulfilled Monday's commitment, and updated Ahmed's accountability score.
        </p>

        {/* Artifact Column */}
        <div className="w-full relative order-2 flex justify-center lg:justify-end">
          <HeroArtifact />
        </div>

      </div>
    </section>
  );
}
