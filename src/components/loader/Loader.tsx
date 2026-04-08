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
  const {
    isLoading,
    setIsLoading,
    setProgress,
    setLogoHandoffEnabled,
    disableLogoHandoff,
  } =
    useLoadingStore();
  const initializationRef = useRef(false);

  const { startPreloading } = useBulkImagePreloader({
    images: ALL_IMAGES,
    onProgress: setProgress,
    onComplete: () => {
      // Enable shared-layout handoff only for the loader exit animation.
      setLogoHandoffEnabled(true);
      setIsLoading(false);
    },
  });

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      disableLogoHandoff();
    }, (LOADING_CONSTANTS.EXIT_DELAY + LOADING_CONSTANTS.EXIT_DURATION) * 1000);

    return () => clearTimeout(timer);
  }, [disableLogoHandoff, isLoading]);

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
    <div className="relative">
      <div
        aria-hidden={isLoading}
        className={`transition-opacity duration-500 ${
          isLoading ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key="loading-screen" />}
      </AnimatePresence>
    </div>
  );
};
