// components/ImagePreloader.tsx
"use client";

import { AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";
import { useBulkImagePreloader } from "@/hooks/useBulkImagePreloader";
import { ALL_IMAGES } from "@/lib/image-manifest";
import LoadingScreen from "./LoadingScreen";
import { useLoadingStore } from "@/store/loadingStore";

export default function ImagePreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, setIsLoading, setProgress } = useLoadingStore();
  const initializationRef = useRef(false);

  const { startPreloading } = useBulkImagePreloader({
    images: ALL_IMAGES,
    onProgress: setProgress,
    onComplete: () => {
      // Delay setting isLoading to false to allow the logotype animation to play out
      setTimeout(() => {
        setIsLoading(false);
      }, 3000); // Corresponds to the animation duration in AnimatedLogotype
    },
  });

  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const timer = setTimeout(() => {
      console.log("Starting image preloading...");
      startPreloading();
    }, 100);

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
}
