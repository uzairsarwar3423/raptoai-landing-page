"use client";

import { MotionConfig, useReducedMotion } from "framer-motion";
import { createContext, useContext, ReactNode } from "react";

const MotionContext = createContext<{ isReducedMotion: boolean }>({
  isReducedMotion: false,
});

export function MotionProvider({ children }: { children: ReactNode }) {
  const isReducedMotion = useReducedMotion() ?? false;

  return (
    <MotionContext.Provider value={{ isReducedMotion }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export function useGlobalMotion() {
  return useContext(MotionContext);
}
