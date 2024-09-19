import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { playlistsFilteringState } from './types';

export const playlistsFilteringSlice = create<playlistsFilteringState>()(
  persist(
    (set) => ({
      playlistSortType: {
        name: 'date',
        type: 'createdAt',
      },
      playlistOrder: 'desc',
      playlistIsFiltering: false,
      setPlaylistSortType: ({ name, type }) =>
        set({ playlistSortType: { name, type } }),
      setPlaylistOrder: (order) => set({ playlistOrder: order }),
      setPlaylistIsFiltering: (isFiltering) =>
        set({ playlistIsFiltering: isFiltering }),
    }),
    {
      name: 'playlist-filtering-storage',
    },
  ),
);
export { type playlistsFilteringState } from './types';
