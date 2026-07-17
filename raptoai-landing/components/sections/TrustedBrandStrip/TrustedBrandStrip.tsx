"use client";

import { useSeamlessMarquee } from "./useSeamlessMarquee";
import { TrustedLogo } from "./TrustedLogo";
import { trustedBrandLogos } from "./trusted-brand.content";

export function TrustedBrandStrip() {
  const { trackRef, pause, resume } = useSeamlessMarquee(40); // slow, ambient

  return (
    <section className="trusted-brand-strip py-12 sm:py-20 border-b border-white/5 relative z-10 overflow-hidden bg-[var(--color-canvas-dark)]">
      
      {/* Seamless Ambient Noise matching the Hero */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <p className="relative z-10 text-xs sm:text-sm text-[var(--color-ink-500)] text-center uppercase tracking-[0.08em] mb-12 font-medium">
        Works seamlessly with the tools you already use
      </p>
      
      {/* Edge fade mask */}
      <div
        className="w-full relative z-10 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onTouchStart={pause}
        onTouchEnd={resume}
      >
        <div ref={trackRef} className="flex gap-12 sm:gap-20 items-center w-max pl-12 sm:pl-20">
          {trustedBrandLogos.map((logo) => (
            <TrustedLogo key={logo.slug} logo={logo} />
          ))}
          {/* Duplicate for seamless loop */}
          {trustedBrandLogos.map((logo) => (
            <TrustedLogo key={`${logo.slug}-dup`} logo={logo} ariaHidden />
          ))}
        </div>
      </div>
    </section>
  );
}
