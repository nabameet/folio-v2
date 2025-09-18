import { create } from "zustand";

interface LoadingState {
  /** Current loading state */
  isLoading: boolean;
  /** Set loading state */
  setIsLoading: (loading: boolean) => void;
  /** Toggle loading state */
  toggleLoading: () => void;
  /** Loading progress percentage (0-100) */
  loadingProgress: number;
  /** Set loading progress */
  setProgress: (progress: number) => void;
}

/**
 * Global loading state management
 *
 * Manages application loading state and progress tracking
 * Used for coordinating loading screens and content reveals
 */
export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  loadingProgress: 0,
  setProgress: (progress) => set({ loadingProgress: progress }),
}));
