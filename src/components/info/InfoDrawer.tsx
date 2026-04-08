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
        className=""
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
          {children}
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
);
