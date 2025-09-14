// store/loadingStore.ts (note the .ts extension)
import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  toggleLoading: () => void;
  loadingProgress: number;
  setProgress: (progress: number) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: true,
  setIsLoading: (loading: boolean) => set({ isLoading: loading }),
  toggleLoading: () => set((state) => ({ isLoading: !state.isLoading })),
  loadingProgress: 0,
  setProgress: (progress) => set({ loadingProgress: progress }),
}));
