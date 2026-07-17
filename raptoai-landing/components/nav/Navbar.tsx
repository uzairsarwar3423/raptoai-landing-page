"use client";

import * as React from "react";
import { Container } from "@/components/ui/Container";
import { useScrollState } from "./useScrollState";
import { NavLogo } from "./NavLogo";
import { NavLinks } from "./NavLinks";
import { NavCTAGroup } from "./NavCTAGroup";
import { MobileNavDrawer } from "./MobileNavDrawer";

export function Navbar() {
  const { isAtTop } = useScrollState();

  return (
    <div 
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 sm:px-6 lg:px-8 pointer-events-none transition-transform duration-500"
      style={{ transform: isAtTop ? 'translateY(0)' : 'translateY(-8px)' }}
    >
      <header
        className={`w-full max-w-5xl pointer-events-auto rounded-full flex flex-col justify-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] relative ${
          isAtTop 
            ? "bg-[#111111]/40 backdrop-blur-xl border border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.5)] h-[72px]" 
            : "bg-[#111111]/70 backdrop-blur-2xl border border-white/15 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] h-[64px]"
        }`}
      >
        {/* Subtle top inner highlight */}
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        <Container className="h-full flex items-center justify-between px-6">
          <div className="flex items-center w-full lg:w-auto">
            <NavLogo />
            <NavLinks />
          </div>
          
          <NavCTAGroup />
          <MobileNavDrawer />
        </Container>
      </header>
    </div>
  );
}
