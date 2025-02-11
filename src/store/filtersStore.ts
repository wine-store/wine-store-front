import { create } from 'zustand';
import { filterCategories } from '../types/FilterCategories';
import { priseRange } from '../types/PriseRange';

const filtersFromServer = {
  type: ['Red', 'Rose', 'Sparkling', 'White'],
  priceRanges: ['00-49', '50-74', '75-99', '100-149', '150-199', '200+'],
  grape: ['Cabernet Sauvignon', 'Merlot', 'Chardonnay', 'Pinot Noir'],
  country: ['France', 'Italy', 'Spain', 'USA'],
  vintage: ['2020', '2019', '2018', '2017'],
  capacity: ['750ml', '1L', '1.5L'],
  abv: ['12%', '13%', '14%', '15%'],
  region: ['Bordeaux', 'Tuscany', 'La Rioja'],
};

interface FilterState {
  filters: { label: string; key: string; values: string[] }[];
  loading: boolean;
  error: string | null;
  initialized: boolean;
  initializeFilters: () => void;
}

const mapFilters = (filterData: any) => {
  const mappedArray = filterCategories.map(({ label, key }) => ({
    label,
    key,
    values: filterData[key as keyof typeof filtersFromServer] || [],
  }));

  return [
    ...mappedArray.slice(0, 1),
    priseRange,
    ...mappedArray.slice(1),
  ];
};

export const useFilterStore = create<FilterState>((set, get) => ({
  filters: [],
  loading: false,
  error: null,
  initialized: false,

  initializeFilters: () => {
    const state = get();
    if (state.initialized || state.loading || state.filters.length > 0) {
      return;
    }

    set({ loading: true });
    
    try {
      const mappedFilters = mapFilters(filtersFromServer);
      set({ 
        filters: mappedFilters, 
        initialized: true,
        loading: false 
      });
    } catch (error: any) {
      set({ 
        error: error.message,
        loading: false 
      });
      console.error('Filter initialization error:', error);
    }
  }
}));