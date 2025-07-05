"use client";

import { motion, AnimatePresence } from "framer-motion";

interface InfoDrawerProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export const InfoDrawer = ({ isOpen, children }: InfoDrawerProps) => (
  <AnimatePresence initial={false}>
    {isOpen && (
      <motion.section
        id="info"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
        style={{
          overflow: "hidden",
          background: "transparent",
        }}
      >
        <motion.div
          className="flex flex-col gap-8 items-end px-8 pt-32 text-justify md:pt-40 md:pb-20 md:px-12 md:flex-row md:gap-24 md:justify-end"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </motion.section>
    )}
  </AnimatePresence>
);
