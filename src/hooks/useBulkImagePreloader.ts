// hooks/useBulkImagePreloader.ts
'use client';

import { useState, useCallback, useRef } from 'react';

interface PreloadedImage {
  src: string;
  success: boolean;
  loadTime: number;
}

interface UseImagePreloaderOptions {
  images: readonly string[];
  timeout?: number;
  onProgress?: (progress: number) => void;
  onComplete?: (results: PreloadedImage[]) => void;
}

interface UseImagePreloaderReturn {
  loadingProgress: number;
  isLoading: boolean;
  loadedImages: string[];
  failedImages: string[];
  totalImages: number;
  preloadResults: PreloadedImage[];
  startPreloading: () => void;
	resetPreloader: () => void; // Add this line

}

export function useBulkImagePreloader({
  images,
  timeout = 10000,
  onProgress,
  onComplete
}: UseImagePreloaderOptions): UseImagePreloaderReturn {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [failedImages, setFailedImages] = useState<string[]>([]);
  const [preloadResults, setPreloadResults] = useState<PreloadedImage[]>([]);
  
  // Use refs to prevent multiple executions
  const hasStartedRef = useRef(false);
  const isPreloadingRef = useRef(false);
  const loadedImagesSetRef = useRef(new Set<string>());
  const failedImagesSetRef = useRef(new Set<string>());

  const preloadSingleImage = useCallback((src: string): Promise<PreloadedImage> => {
    return new Promise<PreloadedImage>((resolve) => {
      // Check if already loaded or failed
      if (loadedImagesSetRef.current.has(src) || failedImagesSetRef.current.has(src)) {
        resolve({ 
          src, 
          success: loadedImagesSetRef.current.has(src), 
          loadTime: 0 
        });
        return;
      }

      const startTime = performance.now();
      const img = new Image();
      let resolved = false;

      const cleanup = () => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      };

      const handleLoad = () => {
        if (resolved) return;
        resolved = true;
        cleanup();
        
        const loadTime = performance.now() - startTime;
        const result: PreloadedImage = { src, success: true, loadTime };
        
        // Add to loaded set to prevent duplicates
        loadedImagesSetRef.current.add(src);
        setLoadedImages(prev => {
          if (prev.includes(src)) return prev;
          return [...prev, src];
        });
        
        resolve(result);
      };

      const handleError = () => {
        if (resolved) return;
        resolved = true;
        cleanup();
        
        const loadTime = performance.now() - startTime;
        const result: PreloadedImage = { src, success: false, loadTime };
        
        // Add to failed set to prevent duplicates
        failedImagesSetRef.current.add(src);
        setFailedImages(prev => {
          if (prev.includes(src)) return prev;
          return [...prev, src];
        });
        
        resolve(result);
      };

      // Set up timeout
      const timeoutId = setTimeout(() => {
        handleError();
      }, timeout);

      img.addEventListener('load', () => {
        clearTimeout(timeoutId);
        handleLoad();
      });
      
      img.addEventListener('error', () => {
        clearTimeout(timeoutId);
        handleError();
      });

      // Start loading
      img.src = src;
    });
  }, [timeout]);

  const startPreloading = useCallback(async () => {
    // Prevent multiple executions
    if (hasStartedRef.current || isPreloadingRef.current || !images?.length) {
      return;
    }

    hasStartedRef.current = true;
    isPreloadingRef.current = true;
    
    console.log(`🖼️ Starting to preload ${images.length} images...`);
    
    try {
      let completedCount = 0;
      const totalImages = images.length;
      const results: PreloadedImage[] = [];

      // Create unique image list to prevent duplicates
      const uniqueImages = [...new Set(images)];
      
      const updateProgress = (result: PreloadedImage) => {
        completedCount++;
        results.push(result);
        
        const progress = Math.min((completedCount / totalImages) * 100, 100);
        setLoadingProgress(progress);
        onProgress?.(progress);

        if (result.success) {
          console.log(`✅ Loaded (${completedCount}/${totalImages}): ${result.src}`);
        } else {
          console.warn(`❌ Failed (${completedCount}/${totalImages}): ${result.src}`);
        }

        if (completedCount >= totalImages) {
          const successCount = results.filter(r => r.success).length;
          const failedCount = results.filter(r => !r.success).length;
          
          console.log(`🎉 Preloading complete! ✅ ${successCount} loaded, ❌ ${failedCount} failed`);
          
          setPreloadResults(results);
          onComplete?.(results);
          
          // Small delay for smooth UX transition
          setTimeout(() => {
            setIsLoading(false);
            isPreloadingRef.current = false;
          }, 300);
        }
      };

      // Preload all unique images concurrently
      const preloadPromises = uniqueImages.map(async (src) => {
        try {
          const result = await preloadSingleImage(src);
          updateProgress(result);
          return result;
        } catch (error) {
          console.error(`Error preloading ${src}:`, error);
          const errorResult = { src, success: false, loadTime: 0 };
          updateProgress(errorResult);
          return errorResult;
        }
      });

      await Promise.all(preloadPromises);
      
    } catch (error) {
      console.error('Error in preloading process:', error);
      setIsLoading(false);
      isPreloadingRef.current = false;
    }
  }, [images, preloadSingleImage, onProgress, onComplete]);

  // Reset function for development hot reload
  const resetPreloader = useCallback(() => {
    hasStartedRef.current = false;
    isPreloadingRef.current = false;
    loadedImagesSetRef.current.clear();
    failedImagesSetRef.current.clear();
    setLoadingProgress(0);
    setIsLoading(true);
    setLoadedImages([]);
    setFailedImages([]);
    setPreloadResults([]);
  }, []);

  return {
    loadingProgress,
    isLoading,
    loadedImages,
    failedImages,
    totalImages: images.length,
    preloadResults,
    startPreloading,
    // Add reset for debugging
    resetPreloader
  };
}
