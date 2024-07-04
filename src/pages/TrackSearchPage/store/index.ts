import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TracksSearchPageState } from './types';

export const tracksSearchPageSlice = create<TracksSearchPageState>()(
  persist(
    (set) => ({
      query: '',
      sortType: 'updatedAt',
      order: 'desc',
      isFiltering: false,
      setQuery: (query) => set({ query }),
      setSortType: (sortType) => set({ sortType }),
      setOrder: (order) => set({ order }),
      setIsFiltering: (isFiltering) => set({ isFiltering }),
    }),
    {
      name: 'tracks-search-page-storage',
    },
  ),
);
export { type TracksSearchPageState } from './types/TracksSearchPageState';
