// stores/useFilterStore.ts
import { create } from 'zustand';

type Filters = Record<string, (string | number)[]>;

interface FilterStore {
  tempFilters: Filters;
  selectedFilters: Filters;
  toggleTempFilter: (filterKey: string, id: number | string) => void;
  applyFilters: () => void;
  resetFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  tempFilters: {},
  selectedFilters: {},
  toggleTempFilter: (filterKey, id) => {
    const current = get().tempFilters[filterKey] || [];

    const updated = current.includes(id)
      ? current.filter((v) => v !== id)
      : [...current, id];

    set({
      tempFilters: {
        ...get().tempFilters,
        [filterKey]: updated,
      },
    });
  },
  applyFilters: () => {
    set({ selectedFilters: get().tempFilters });
  },
  resetFilters: () => {
    set({ tempFilters: {}, selectedFilters: {} });
  },
}));
