"use client";

import { NavLogo } from "../nav/NavLogo";
import { footerColumns } from "./footer.content";
import { FooterColumn } from "./FooterColumn";
import { FooterBottomBar } from "./FooterBottomBar";
import { useFooterReveal } from "./useFooterReveal";

interface FooterProps {
  finalCtaSelector?: string;
}

export function Footer({ finalCtaSelector = "#final-cta" }: FooterProps) {
  const scope = useFooterReveal(finalCtaSelector);

  return (
    <footer 
      ref={scope} 
      className="relative z-0 overflow-hidden bg-[var(--color-canvas-dark)] pt-32 pb-8 px-6 md:px-12 lg:px-24 w-full"
    >
      {/* 10/10 Detail: Top radial border glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[1px] bg-gradient-to-r from-transparent via-[var(--color-brand-500)] to-transparent blur-sm opacity-50" />

      {/* 10/10 Detail: Atmospheric background glow */}
      <div className="absolute -bottom-[50%] -left-[10%] w-[50%] h-[100%] rounded-full bg-[var(--color-brand-900)] blur-[120px] opacity-30 pointer-events-none" />
      <div className="absolute top-[0%] -right-[10%] w-[30%] h-[50%] rounded-full bg-[var(--color-brand-700)] blur-[120px] opacity-20 pointer-events-none" />

      {/* 10/10 Detail: Giant subtle watermark */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 text-[18vw] font-display font-bold leading-none text-white/[0.02] pointer-events-none select-none tracking-tighter w-full text-center whitespace-nowrap">
        RAPTO
      </div>

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Top section: Logo/Tagline and Columns */}
        <div className="flex flex-col lg:flex-row justify-between gap-16 lg:gap-8 mb-24">
          
          {/* Logo and Tagline */}
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="scale-110 origin-left">
              <NavLogo />
            </div>
            <p className="text-[var(--text-body-l)] text-white/80 font-sans leading-relaxed">
              Meeting promises, kept. The intelligent platform for teams that execute with precision.
            </p>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-12 gap-y-16 lg:gap-x-20">
            {footerColumns.map((column) => (
              <FooterColumn 
                key={column.header} 
                header={column.header} 
                links={column.links} 
              />
            ))}
          </div>

        </div>

        {/* Bottom Bar */}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
