"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useLoadingStore } from "@/store/loadingStore";
import { LOADING_CONSTANTS, LOADING_TEXT } from "@/constants/loading";

import { ProgressDisplay } from "./ProgressDisplay";
import { AnimatedLogotype } from "./AnimatedLogotype";

/**
 * Main loading screen with animated logotype and progress
 *
 * Displays during image preloading with smooth progress animation
 * and logotype fill animation
 */
export const LoadingScreen = () => {
  const [displayProgress, setDisplayProgress] = useState(0);
  const { loadingProgress: progress } = useLoadingStore();
  const [isLogotypeAnimationDone, setIsLogotypeAnimationDone] = useState(false);
  const shouldShowProgress = progress < 100 || !isLogotypeAnimationDone;

  // Smooth progress animation
  useEffect(() => {
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        const diff = progress - prev;
        if (Math.abs(diff) < 0.5) return progress;
        return prev + diff * LOADING_CONSTANTS.PROGRESS_SMOOTH_FACTOR;
      });
    }, LOADING_CONSTANTS.PROGRESS_INTERVAL);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogotypeAnimationDone(true);
    }, LOADING_CONSTANTS.LOGOTYPE_ANIMATION_DURATION);

    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{
        duration: LOADING_CONSTANTS.EXIT_DURATION,
        delay: LOADING_CONSTANTS.EXIT_DELAY,
      }}
    >
      <div className="flex h-full w-full flex-col justify-end">
        <div>
          <div className="flex flex-col gap-4 p-7 md:p-10">
            <AnimatedLogotype />
            <ProgressDisplay
              progress={displayProgress}
              loadingMessage={LOADING_TEXT.LOADING_MESSAGE}
              isVisible={shouldShowProgress}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};
