// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";
import { useLoadingStore } from "@/store/loadingStore";
import AnimatedLogotype from "./AnimatedLogotype";
import { motion } from "framer-motion";

export default function LoadingScreen() {
  const [displayProgress, setDisplayProgress] = useState(0);
  const { loadingProgress: progress } = useLoadingStore();
  const [isLogotypeAnimationDone, setIsLogotypeAnimationDone] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLogotypeAnimationDone(true);
    }, 3200); // Matches the animation duration in AnimatedLogotype
    return () => clearTimeout(timer);
  }, []);

  const roundedProgress = Math.round(displayProgress);

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-50"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }} // Delay exit to allow logotype to animate
    >
      <div className="flex h-full w-full flex-col justify-end">
        <div>
          <div className="flex flex-col gap-4 p-7 md:p-10">
            <AnimatedLogotype />
            <motion.div
              initial={{ opacity: 1 }}
              animate={{
                opacity: isLogotypeAnimationDone ? 0 : 1,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <div>
                <p>{roundedProgress}%</p>
                <p>wait up, we booting...</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
