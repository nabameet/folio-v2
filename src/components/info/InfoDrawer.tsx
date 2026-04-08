"use client";

import { motion, AnimatePresence } from "motion/react";
import { ANIMATION_CONSTANTS } from "@/constants/content";

interface InfoDrawerProps {
  /** Whether drawer is open */
  isOpen: boolean;
  /** Drawer content */
  children?: React.ReactNode;
}

/**
 * Animated info drawer component
 *
 * Provides smooth expand/collapse animations for info content
 * Uses custom easing and timing for polished feel
 */
export const InfoDrawer = ({ isOpen, children }: InfoDrawerProps) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.section
        className="relative"
        id="info"
        initial={{ height: 0, opacity: 1 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 1 }}
        transition={{
          duration: ANIMATION_CONSTANTS.DRAWER_DURATION,
          ease: ANIMATION_CONSTANTS.DRAWER_EASING,
        }}
        style={{
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <motion.div
          className="flex flex-col items-end gap-8 px-8 pt-32 text-justify md:flex-row md:justify-end md:gap-20 md:px-12 md:pt-40"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 1, y: 0 }}
          transition={{ duration: ANIMATION_CONSTANTS.DRAWER_CONTENT_DURATION }}
        >
          {/* <div
            aria-hidden="true"
            className="pointer-events-none relative w-full md:absolute md:bottom-10 md:left-12 md:top-40 md:w-[22rem]"
          >
            <div className="relative h-52 w-full overflow-hidden">
              <motion.img
                src="/gallery/10.webp"
                alt=""
                className="absolute left-0 top-0 h-44 w-44 rounded-sm object-cover shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:h-52 md:w-52"
                animate={{ rotate: [-5, 5, -5] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.img
                src="/gallery/9.webp"
                alt=""
                className="absolute left-16 top-10 h-44 w-44 rounded-sm object-cover shadow-[0_10px_30px_rgba(0,0,0,0.18)] md:left-20 md:top-12 md:h-52 md:w-52"
                animate={{ rotate: [5, -5, 5] }}
                transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div> */}
          {children}
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
);
