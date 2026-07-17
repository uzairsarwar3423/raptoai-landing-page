"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { navLinks } from "./nav.content";

export function NavLinks() {
  const pathname = usePathname();

  const textColor = "text-white/70 hover:text-white";
  const activeTextColor = "text-white";

  // For sliding indicator
  const [hoveredValue, setHoveredValue] = React.useState<string | null>(null);

  return (
    <NavigationMenu.Root 
      className="hidden lg:flex relative z-10 flex-1 ml-10"
      onValueChange={setHoveredValue}
    >
      <NavigationMenu.List className="flex items-center gap-1 relative">
        {navLinks.map((item) => {
          const isActive = "href" in item && pathname === item.href;
          
          if ("type" in item && item.type === "dropdown" && "items" in item) {
            return (
              <NavigationMenu.Item key={item.label} value={item.label}>
                <NavigationMenu.Trigger 
                  className={`group flex items-center gap-1 px-4 py-2 text-[var(--text-body-s)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full ${textColor}`}
                >
                  {item.label}
                  <ChevronDown className="relative top-[1px] ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180" aria-hidden="true" />
                </NavigationMenu.Trigger>
                <NavigationMenu.Content className="w-[320px] p-2 data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52">
                  <div className="flex flex-col gap-1">
                    {item.items.map((subItem) => (
                      <NavigationMenu.Link asChild key={subItem.title}>
                        <Link 
                          href={subItem.href}
                          className="flex items-start gap-3 p-3 rounded-[var(--radius-md)] hover:bg-[var(--color-paper-sunken)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-700)]"
                        >
                          <div className="flex-shrink-0 mt-0.5 text-[var(--color-brand-600)]">
                            <subItem.icon className="w-5 h-5" />
                          </div>
                          <div>
                            <div className="text-[var(--text-body-s)] font-semibold text-[var(--color-ink-900)]">
                              {subItem.title}
                            </div>
                            <p className="text-[var(--text-mono-s)] text-[var(--color-ink-500)] font-body leading-snug mt-0.5">
                              {subItem.description}
                            </p>
                          </div>
                        </Link>
                      </NavigationMenu.Link>
                    ))}
                  </div>
                  <div className="mt-2 pt-2 border-t border-[var(--color-ink-900)]/5 px-3 pb-1">
                    <NavigationMenu.Link asChild>
                      <Link href="/product" className="text-[var(--text-body-s)] text-[var(--color-brand-600)] font-medium hover:text-[var(--color-brand-700)] transition-colors inline-flex items-center">
                        See the full product tour <span aria-hidden="true" className="ml-1">→</span>
                      </Link>
                    </NavigationMenu.Link>
                  </div>
                </NavigationMenu.Content>
              </NavigationMenu.Item>
            );
          }

          return (
            <NavigationMenu.Item key={item.label} value={item.label}>
              <NavigationMenu.Link asChild>
                <Link
                  href={"href" in item ? item.href : ""}
                  className={`relative px-4 py-2 text-[var(--text-body-s)] font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 rounded-full ${
                    isActive ? activeTextColor : textColor
                  }`}
                >
                  {item.label}
                  {/* Active Indicator Fallback */}
                  {isActive && hoveredValue === null && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-1 left-4 right-4 h-[2px] bg-white rounded-full"
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    />
                  )}
                  {/* Hover Indicator */}
                  {hoveredValue === item.label && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-white/10 rounded-full"
                      transition={{ type: "spring", stiffness: 220, damping: 26 }}
                    />
                  )}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>

      <div className="absolute top-full left-0 w-full flex justify-center perspective-[2000px] pt-4">
        <NavigationMenu.Viewport className="relative overflow-hidden rounded-[var(--radius-xl)] bg-[var(--color-paper-raised)] shadow-tier-3 border border-[var(--color-ink-900)]/10 transition-[width,height] duration-300 data-[state=closed]:animate-out data-[state=open]:animate-in data-[state=closed]:fade-out data-[state=open]:fade-in data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90" />
      </div>
    </NavigationMenu.Root>
  );
}
