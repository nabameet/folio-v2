"use client";

import { motion } from "motion/react";
import { LogoSection } from "./LogoSection";
import { ContactLink } from "./ContactLink";

/**
 * Site footer with responsive layout and route-based positioning
 *
 * Displays logo, copyright, and contact information
 * Uses Framer Motion for smooth animations and layout transitions
 *
 * @example
 * ```
 * <Footer />
 * ```
 */
export function Footer() {
  return (
    <motion.div
      className="z-50 flex w-full items-center justify-between gap-12 p-8 mt-16 [&_svg]:fill-foreground md:p-12"
    >
      <LogoSection />
      <ContactLink />
    </motion.div>
  );
}
