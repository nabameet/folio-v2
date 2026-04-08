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
  /**
   * Enables the shared-element logo handoff from loader -> footer.
   * This should only be true for the initial load.
   */
  enableLogoHandoff: boolean;
  /** Explicitly set whether the handoff is enabled */
  setLogoHandoffEnabled: (enabled: boolean) => void;
  /** Disable the shared-element logo handoff after initial load */
  disableLogoHandoff: () => void;
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
  enableLogoHandoff: false,
  setLogoHandoffEnabled: (enabled: boolean) => set({ enableLogoHandoff: enabled }),
  disableLogoHandoff: () => set({ enableLogoHandoff: false }),
}));
