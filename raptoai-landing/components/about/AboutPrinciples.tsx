"use client";
import { motion } from "framer-motion";
import { staggerContainer, revealUp } from "@/lib/motion/variants";

const principles = [
  {
    title: "Truth over transcripts.",
    description: "You don't need to know every word spoken. You need to know what was decided and who is responsible."
  },
  {
    title: "Zero friction.",
    description: "If it requires you to change how you work, it won't work. Rapto integrates silently with the tools you already use."
  },
  {
    title: "Accountability is a feature.",
    description: "Follow-ups shouldn't require manual effort. We automate the nagging so you can focus on the building."
  }
];

export function AboutPrinciples() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.h2 
            variants={revealUp}
            className="text-3xl sm:text-4xl font-display font-medium text-[var(--color-ink-900)] mb-16 text-center"
          >
            Our Core Principles
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
            {principles.map((principle, index) => (
              <motion.div 
                key={index} 
                variants={revealUp}
                className="flex flex-col text-center md:text-left"
              >
                <div className="text-[var(--color-brand-600)] font-mono text-sm mb-4">0{index + 1}</div>
                <h3 className="text-xl font-display font-medium text-[var(--color-ink-900)] mb-3">
                  {principle.title}
                </h3>
                <p className="text-[var(--color-ink-500)] text-base leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
