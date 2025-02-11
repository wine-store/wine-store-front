import { create } from 'zustand';
import { Wine } from '../types/Wine';

interface WineState {
  wine: Wine[];
  setWine: (wine: Wine[]) => void;
}
export const useStoreForWine = create<WineState>((set) => ({
  wine: [],
  setWine: (wine: Wine[]) => set({ wine }),
}));