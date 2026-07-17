"use client";

import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface AnimatedNumberProps {
  value: number;
  duration?: number;
  format?: (val: number) => string;
  className?: string;
}

export function AnimatedNumber({
  value,
  duration = 2,
  format = (val) => Math.round(val).toString(),
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasTriggered, setHasTriggered] = useState(false);

  // We use a spring that animates from 0 to the target value
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(springValue, (current) => format(current));

  useEffect(() => {
    if (isInView && !hasTriggered) {
      springValue.set(value);
      setHasTriggered(true);
    }
  }, [isInView, value, springValue, hasTriggered]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}
