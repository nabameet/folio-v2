"use client";

import { AnimatePresence } from "motion/react";
import { useEffect, useRef } from "react";
import { useBulkImagePreloader } from "@/hooks/useBulkImagePreloader";
import { ALL_IMAGES } from "@/lib/image-manifest";
import { useLoadingStore } from "@/store/loadingStore";
import { LOADING_CONSTANTS } from "@/constants/loading";

import { LoadingScreen } from "./LoadingScreen";

interface ImagePreloaderProps {
  /** Content to render after loading completes */
  children: React.ReactNode;
}

/**
 * Image preloader wrapper component
 *
 * Handles bulk image preloading with progress tracking
 * Shows loading screen during preload process
 */
export const Loader = ({ children }: ImagePreloaderProps) => {
  const { isLoading, setIsLoading, setProgress } = useLoadingStore();
  const initializationRef = useRef(false);

  const { startPreloading } = useBulkImagePreloader({
    images: ALL_IMAGES,
    onProgress: setProgress,
    onComplete: () => {
      // Delay setting isLoading to false to allow the logotype animation to complete
      setTimeout(() => {
        setIsLoading(false);
      }, LOADING_CONSTANTS.COMPLETION_DELAY);
    },
  });

  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const timer = setTimeout(() => {
      console.log("Starting image preloading...");
      startPreloading();
    }, LOADING_CONSTANTS.PRELOAD_START_DELAY);

    return () => clearTimeout(timer);
  }, [startPreloading]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>
      {!isLoading && children}
    </>
  );
};
