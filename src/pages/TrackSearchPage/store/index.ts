
import { StateCreator } from 'zustand';
import { Track } from 'project_midnight';

import { TracksSearchPageState } from './types';

export const tracksSearchPageSlice: StateCreator<TracksSearchPageState> = (
  set,
) => ({
  query: '',
  sortType: 'updatedAt',
  order: 'desc',
  isFiltering: false,
  setQuery: (query: string) => set({ query }),
  setSortType: (sortType: keyof Track) => set({ sortType }),
  setOrder: (order: 'desc' | 'asc' ) => set({ order }),
  setIsFiltering: (isFiltering: boolean) => set({ isFiltering }),
});

export { type TracksSearchPageState };
