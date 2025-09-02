// components/LoadingScreen.tsx
"use client";

import { useEffect, useState } from "react";
import AnimatedLogotype from "./AnimatedLogotype";

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
  // totalImages,
  // loadedImages,
  onComplete,
}: LoadingScreenProps) {
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

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

  // Handle completion and fade out
  useEffect(() => {
    if (!isLoading && progress >= 100) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      });
      return () => clearTimeout(timer);
    }
  }, [isLoading, progress, onComplete]);

  if (!isVisible) return null;

  const roundedProgress = Math.round(displayProgress);

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-1000 ${
        !isLoading && progress >= 100 ? "opacity-0" : "opacity-100"
      }`}
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

        {/* <div className="">
          <div className="w-full h-1">
            <div
              className="h-full bg-foreground transition-all duration-300 ease-out"
              style={{ width: `${displayProgress}%` }}
            />
          </div>
        </div> */}
      </div>
    </div>
  );
}
