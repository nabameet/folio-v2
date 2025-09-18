"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { LogoSection } from "./LogoSection";
import { ContactLink } from "./ContactLink";

/**
 * Site footer with responsive layout and route-based positioning
 *
 * Displays logo, copyright, and contact information
 * Position changes based on current route (absolute on home, relative on work pages)
 * Uses Framer Motion for smooth animations and layout transitions
 *
 * @example
 * ```
 * <Footer />
 * ```
 */
export default function Footer() {
  const currentPath = usePathname();

  /** Check if current route is a work detail page */
  const isWorkRoute = currentPath.startsWith("/work/");

  return (
    <motion.div
      className={`flex ${
        isWorkRoute ? "" : "absolute bottom-0"
      } [&_svg]:fill-foreground z-50 w-full items-center justify-between gap-12 p-8 md:p-12`}
    >
      <LogoSection />
      <ContactLink />
    </motion.div>
  );
}
