import { type Playlist } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { PlaylistsPageState } from '@/pages/PlaylistsPage/store/types';

export const createPlaylistSlice: StateCreator<PlaylistsPageState> = (set) => ({
  playlists: [],
  isPlaylistsLoading: true,
  isQueryPlaylistsLoading: false,
  totalPlaylists: 0,
  currentPlaylistPage: 1,
  clearPlaylists: () => set({ playlists: [] }),
  setIsPlaylistsLoading: (state) => set({ isPlaylistsLoading: state }),
  getPlaylists: async (
    userId: string,
    page: number,
    filterOptions = {
      query: '',
      sortType: 'createdAt',
      order: 'desc',
    },
  ) => {
    const {
      query = '',
      sortType = 'createdAt',
      order = 'desc',
    } = filterOptions;

    return await httpClient
      .get<Playlist[]>(
        `/playlists/${userId}?page=${page}&query=${query}&sortType=${sortType}&order=${order}`,
      )
      .then(({ data, headers }) => {
        set((state) => ({
          playlists: [...state.playlists, ...data],
          currentPlaylistPage: state.currentPlaylistPage + 1,
          totalPlaylists: headers['x-total-count'],
        }));

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() =>
        set({ isPlaylistsLoading: false, isQueryPlaylistsLoading: false }),
      );
  },
  createPlaylist: async (name, userId) => {
    return await httpClient
      .post<Playlist>('/playlists/new', {
        name,
        userId,
      })
      .then(({ data }) => data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
});

export { type PlaylistsPageState };
