"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  const handleClose = () => {
    localStorage.setItem("cookieConsent", "closed_default");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.section
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 left-6 z-50 w-full max-w-sm p-6 bg-white/80 border border-gray-100 shadow-2xl rounded-3xl backdrop-blur-2xl dark:bg-gray-950/80 dark:border-white/10 shadow-black/5 dark:shadow-black/40"
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <h2 className="text-[1.05rem] font-semibold tracking-tight text-gray-900 dark:text-white">
              <span className="mr-1.5 text-xl">🍪</span> We use cookies
            </h2>
          </div>

          {/* Description */}
          <div className="mt-3.5 space-y-2.5">
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
              We use essential cookies to ensure proper operation, and tracking cookies to understand how you interact with it. Tracking cookies will only be set with your consent.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Closing this modal will save your default settings.
            </p>
          </div>

          {/* Actions */}
          <div className="mt-6 flex flex-col gap-3">
            {/* Primary Actions */}
            <div className="flex gap-2.5">
              <button
                onClick={handleAccept}
                className="flex-1 rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-gray-800 hover:shadow active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 dark:focus-visible:ring-white dark:focus-visible:ring-offset-gray-950"
              >
                Accept all
              </button>
              <button
                onClick={handleReject}
                className="flex-1 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 transition-all duration-200 hover:bg-gray-50 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-200 focus-visible:ring-offset-2 dark:bg-white/5 dark:text-gray-200 dark:ring-white/10 dark:hover:bg-white/10 dark:focus-visible:ring-white/20 dark:focus-visible:ring-offset-gray-950"
              >
                Reject all
              </button>
            </div>

            {/* Secondary Actions */}
            <div className="flex items-center justify-between px-1">
              <button className="text-xs font-medium text-gray-500 underline decoration-transparent underline-offset-4 transition-all hover:text-gray-900 hover:decoration-gray-300 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:decoration-gray-600 focus:outline-none">
                Preferences
              </button>
              <button
                onClick={handleClose}
                className="text-xs font-medium text-gray-500 transition-colors hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 focus:outline-none"
              >
                Close
              </button>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}
