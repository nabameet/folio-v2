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
  const [showContent, setShowContent] = useState(false);
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
      // Only log every 10% to reduce noise
      if (progress % 10 < 1) {
        console.log(`Loading progress: ${Math.round(progress)}%`);
      }
    },
    onComplete: () => {
      const loadTime = Date.now() - startTime;
      console.log(`Total preload time: ${loadTime}ms`);
    },
  });

  // Initialize preloading only once
  useEffect(() => {
    if (initializationRef.current) return;

    initializationRef.current = true;

    // Add small delay to ensure component is mounted
    const timer = setTimeout(() => {
      startPreloading();
    }, 100);

    return () => clearTimeout(timer);
  }, [startPreloading]); // Empty dependency array is intentional

  // Handle content reveal
  useEffect(() => {
    if (!isLoading && !showContent) {
      const timer = setTimeout(() => {
        setShowContent(true);
      });

      return () => clearTimeout(timer);
    }
  }, [isLoading, showContent]);

  if (isLoading || !showContent) {
    return (
      <LoadingScreen
        progress={loadingProgress}
        isLoading={isLoading}
        totalImages={totalImages}
        loadedImages={loadedImages.length}
      />
    );
  }

  return <div>{children}</div>;
}
