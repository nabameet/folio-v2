"use client";

import { useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { NavItem } from "@/types/nav";
import { ANIMATION_CONSTANTS } from "@/constants/content";
import { useLoadingStore } from "@/store/loadingStore";

import { Cursor } from "@/components/cursor";
import { Nav } from "@/components/nav";
import { InfoDrawer, InfoAbout, InfoContact } from "@/components/info";

interface LayoutClientProps {
  /** All data passed from page level */
  aboutText: string;
  contactPrechorus: string;
  contactTitle: string;
  email: string;
  xUsername: string;
  resumeUrl: string;
  /** Page content */
  children: React.ReactNode;
}

/**
 * Layout client that receives all data as props and passes to children
 */
export const LayoutClient = ({
  aboutText,
  contactPrechorus,
  contactTitle,
  email,
  xUsername,
  resumeUrl,
  children,
}: LayoutClientProps) => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const { isLoading } = useLoadingStore();

  const toggleInfo = useCallback(() => setIsInfoOpen((prev) => !prev), []);

  const navItems: NavItem[] = [
    { type: "button", label: "info", onClick: toggleInfo },
  ];

  return (
    <>
      <Cursor />

      <Nav isInfoOpen={isInfoOpen} items={navItems} />

      <InfoDrawer isOpen={isInfoOpen}>
        <InfoAbout
          aboutText={aboutText}
          contactPrechorus={contactPrechorus}
          contactTitle={contactTitle}
          email={email}
        />
        <InfoContact resumeUrl={resumeUrl} xUsername={xUsername} />
      </InfoDrawer>

      <AnimatePresence mode="wait">
        {!isLoading && (
          <motion.div
            className="h-dvh"
            key="main-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: ANIMATION_CONSTANTS.CONTENT_FADE_DURATION,
              delay: ANIMATION_CONSTANTS.CONTENT_FADE_DELAY,
            }}
          >
            <div className="">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
