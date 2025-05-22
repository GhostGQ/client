// stores/useFilterStore.ts
import { create } from 'zustand';

type FilterSelections = {
  [key: string]: string[];
};

interface FilterStore {
  selectedFilters: FilterSelections;
  toggleFilter: (filterId: string, value: string) => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set) => ({
  selectedFilters: {},
  toggleFilter: (filterId, value) =>
    set((state) => {
      const current = state.selectedFilters[filterId] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return {
        selectedFilters: {
          ...state.selectedFilters,
          [filterId]: updated
        }
      };
    }),
  resetFilters: () => set({ selectedFilters: {} })
}));
