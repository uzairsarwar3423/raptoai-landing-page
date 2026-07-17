"use client";

import * as React from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navLinks, navCTA } from "./nav.content";
import { Button } from "@/components/ui/Button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/Accordion";

function MobileNavTriggerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative w-6 h-6 flex flex-col justify-center items-center">
      <span
        className={`absolute h-[2px] w-5 bg-current transform transition-all duration-200 ease-out ${
          isOpen ? "rotate-45" : "-translate-y-1.5"
        }`}
      />
      <span
        className={`absolute h-[2px] w-5 bg-current transform transition-all duration-200 ease-out ${
          isOpen ? "opacity-0" : "opacity-100"
        }`}
      />
      <span
        className={`absolute h-[2px] w-5 bg-current transform transition-all duration-200 ease-out ${
          isOpen ? "-rotate-45" : "translate-y-1.5"
        }`}
      />
    </div>
  );
}

export function MobileNavDrawer() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button
          className={`lg:hidden relative z-50 p-2 -mr-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-700)] rounded-md transition-colors ${
            isOpen ? "text-[var(--color-ink-900)]" : "text-white/70 hover:text-white"
          }`}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          <MobileNavTriggerIcon isOpen={isOpen} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-40 bg-[var(--color-paper-raised)]"
              />
            </Dialog.Overlay>
            
            <Dialog.Content asChild>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed inset-0 z-40 pt-24 px-[clamp(20px,5vw,80px)] pb-safe flex flex-col focus-visible:outline-none"
              >
                <nav className="flex-1 overflow-y-auto">
                  <div className="flex flex-col gap-6">
                    {navLinks.map((item) => {
                      if ("type" in item && item.type === "dropdown" && "items" in item) {
                        return (
                          <Accordion type="single" collapsible key={item.label}>
                            <AccordionItem value={item.label} className="border-none">
                              <AccordionTrigger className="py-2 text-[var(--text-display-m)] text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] font-semibold border-none data-[state=open]:text-[var(--color-brand-600)]">
                                {item.label}
                              </AccordionTrigger>
                              <AccordionContent className="pt-4 pb-2">
                                <div className="flex flex-col gap-4">
                                  {item.items.map((subItem) => (
                                    <Link
                                      key={subItem.title}
                                      href={subItem.href}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-4 text-[var(--color-ink-700)] hover:text-[var(--color-ink-900)]"
                                    >
                                      <div className="p-2 rounded-lg bg-[var(--color-brand-50)] text-[var(--color-brand-600)]">
                                        <subItem.icon className="w-5 h-5" />
                                      </div>
                                      <span className="text-[var(--text-body-l)] font-medium">
                                        {subItem.title}
                                      </span>
                                    </Link>
                                  ))}
                                </div>
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        );
                      }

                      return (
                        <Link
                          key={item.label}
                          href={"href" in item ? item.href : ""}
                          onClick={() => setIsOpen(false)}
                          className="text-[var(--text-display-m)] font-semibold text-[var(--color-ink-900)] hover:text-[var(--color-brand-600)] transition-colors inline-block py-2"
                        >
                          {item.label}
                        </Link>
                      );
                    })}
                  </div>
                </nav>

                <div className="mt-8 pt-8 border-t border-[var(--color-ink-900)]/10 flex flex-col gap-4 pb-8">
                  <Button asChild variant="primary" size="lg" className="w-full justify-center">
                    <Link href={navCTA.primary.href} onClick={() => setIsOpen(false)}>
                      {navCTA.primary.label}
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="ghost"
                    size="lg"
                    className="w-full justify-center text-[var(--color-ink-900)] hover:bg-[var(--color-paper-sunken)]"
                  >
                    <Link href={navCTA.secondary.href} onClick={() => setIsOpen(false)}>
                      {navCTA.secondary.label}
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}
