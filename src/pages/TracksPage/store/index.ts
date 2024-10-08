import { Playlist } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TracksPageState } from './types';

export const tracksPageSlice: StateCreator<TracksPageState> = (set) => ({
  userTracks: [],
  userPlaylist: null,
  isFavouriteTracksLoading: false,
  totalTracks: 0,
  isUserTracksLoading: true,
  isFiltering: false,
  isQueryTracksLoading: false,
  currentPage: 1,
  setIsFiltering: (isFiltering) => set({ isFiltering }),
  clearUserTracks: () => set({ userTracks: [], currentPage: 1 }),
  setIsFavouriteTracksLoading: (state: boolean) =>
    set({ isFavouriteTracksLoading: state }),
  setCurrentPage: (number: number) => set({ currentPage: number }),
  setIsUserTracksLoading: (state) => set({ isUserTracksLoading: state }),
  setIsQueryTracksLoading: (state) => set({ isQueryTracksLoading: state }),
  clearUserPlaylist: () =>
    set({ userPlaylist: null, userTracks: [], currentPage: 1 }),
  getTracksByUser: async (
    userId: string,
    page: number,
    filterOptions = {
      query: '',
      sortType: 'createdAt',
      order: 'desc',
      isFavourite: false,
    },
  ) => {
    const {
      query = '',
      sortType = 'createdAt',
      order = 'desc',
      isFavourite = false,
    } = filterOptions;

    return await httpClient
      .get<Playlist>(
        `/users/tracks/${userId}?page=${page}&query=${query}&sortType=${sortType}&order=${order}&isFavourite=${isFavourite}`,
      )
      .then(({ data, headers }) => {
        set((state) => ({
          userPlaylist: {
            ...data,
            tracks: [...(state.userPlaylist?.tracks || []), ...data.tracks!],
          },
          userTracks: [...state.userTracks, ...data.tracks!],
          currentPage: state.currentPage + 1,
          totalTracks: +headers['x-total-count'],
        }));

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() =>
        set({
          isUserTracksLoading: false,
          isQueryTracksLoading: false,
          isFiltering: false,
        }),
      );
  },
});

export { type TracksPageState };
