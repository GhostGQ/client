import { create } from 'zustand';

interface FilterDrawerState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useFilterDrawerStore = create<FilterDrawerState>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
