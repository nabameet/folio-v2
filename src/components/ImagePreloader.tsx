// components/ImagePreloader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { useBulkImagePreloader } from "@/hooks/useBulkImagePreloader";
import LoadingScreen from "@/components/LoadingScreen";
import { ALL_IMAGES } from "@/lib/image-manifest";
import { useLoadingStore } from "@/store/loadingStore";

export default function ImagePreloader({
  children,
}: {
  children: React.ReactNode;
}) {
  const [startTime] = useState(() => Date.now());
  const initializationRef = useRef(false);

  const { isLoading, setIsLoading } = useLoadingStore();

  const { loadingProgress, loadedImages, totalImages, startPreloading } =
    useBulkImagePreloader({
      images: ALL_IMAGES,
      onProgress: (progress) => {
        if (progress % 10 < 1) {
          console.log(`Loading progress: ${Math.round(progress)}%`);
        }
      },
      onComplete: () => {
        const loadTime = Date.now() - startTime;
        console.log(`Total preload time: ${loadTime}ms`);
        setIsLoading(false);
      },
    });

  useEffect(() => {
    if (initializationRef.current) return;
    initializationRef.current = true;

    const timer = setTimeout(() => {
      startPreloading();
    }, 100);

    return () => clearTimeout(timer);
  }, [startPreloading]);

  return (
    <>
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen
            key="loading-screen"
            progress={loadingProgress}
            isLoading={isLoading}
            totalImages={totalImages}
            loadedImages={loadedImages.length}
          />
        )}
      </AnimatePresence>

      <div
        className={`transition-opacity delay-200 duration-500 ease-out ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}
