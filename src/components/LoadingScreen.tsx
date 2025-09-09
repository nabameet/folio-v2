// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedLogotype from "./AnimatedLogotype";
import { motion } from "framer-motion";

interface LoadingScreenProps {
  progress: number;
  isLoading: boolean;
  totalImages: number;
  loadedImages: number;
  onComplete?: () => void;
}

export default function LoadingScreen({
  progress,
  isLoading,
  onComplete,
}: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);

  // Smooth progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * 0.15;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [progress]);

  // Call onComplete when loading finishes (optional)
  useEffect(() => {
    if (!isLoading && progress >= 100) {
      onComplete?.();
    }
  }, [isLoading, progress, onComplete]);

  const roundedProgress = Math.round(displayProgress);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex h-full w-full flex-col justify-end">
        <div>
          <div className="flex flex-col gap-4 p-7 md:p-10">
            <AnimatedLogotype />
            <div>
              <p>{roundedProgress}%</p>
              <p>wait up, we booting...</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
