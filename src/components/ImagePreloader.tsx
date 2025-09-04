// components/ImagePreloader.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { useBulkImagePreloader } from "@/hooks/useBulkImagePreloader";
import LoadingScreen from "@/components/LoadingScreen";
import { ALL_IMAGES } from "@/lib/image-manifest";

interface ImagePreloaderProps {
  children: React.ReactNode;
}

export default function ImagePreloader({ children }: ImagePreloaderProps) {
  const [startTime] = useState(() => Date.now());
  const initializationRef = useRef(false);

  const {
    loadingProgress,
    isLoading,
    loadedImages,
    totalImages,
    startPreloading,
  } = useBulkImagePreloader({
    images: ALL_IMAGES,
    onProgress: (progress) => {
      if (progress % 10 < 1) {
        console.log(`Loading progress: ${Math.round(progress)}%`);
      }
    },
    onComplete: () => {
      const loadTime = Date.now() - startTime;
      console.log(`Total preload time: ${loadTime}ms`);
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

  // Always render content, show loading screen as overlay
  return (
    <>
      {isLoading && (
        <LoadingScreen
          progress={loadingProgress}
          isLoading={isLoading}
          totalImages={totalImages}
          loadedImages={loadedImages.length}
        />
      )}
      <div style={{ opacity: isLoading ? 0 : 1, transition: "opacity 0.3s" }}>
        {children}
      </div>
    </>
  );
}
