import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { TracksSearchPageState, SortType  } from './types';

export const tracksSearchPageSlice = create<TracksSearchPageState>()(
  persist(
    (set) => ({
      query: '',
      sortType: {
        name: 'По дате загрузки',
        type: 'createdAt'
      },
      order: 'desc',
      isFiltering: false,
      setQuery: (query) => set({ query }),
      setSortType: ({ name, type }: SortType) => set({ sortType: { name, type } }),
      setOrder: (order) => set({ order }),
      setIsFiltering: (isFiltering) => set({ isFiltering }),
    }),
    {
      name: 'tracks-search-page-storage',
    },
  ),
);
export { type TracksSearchPageState } from './types/TracksSearchPageState';
