import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TracksPageState } from './types';

export const tracksPageSlice: StateCreator<TracksPageState> = (set, get) => ({
  userTracks: [],
  totalTracks: 0,
  isUserTracksLoading: true,
  isUserFavoriteTracksLoading: true,
  isQueryTracksLoading: false,
  currentPage: 1,
  setCurrentPage: (number: number) => set({ currentPage: number }),
  setIsUserTracksLoading: (state) => set({ isUserTracksLoading: state }),
  setIsQueryTracksLoading: (state) => set({ isQueryTracksLoading: state }),
  getTracksByUser: async (
    userId: string,
    page: number,
    filterOptions = {
      query: '',
      sortType: 'updatedAt',
      order: 'desc',
      isFavourite: false,
    },
  ) => {
    const { query, sortType, order, isFavourite } = filterOptions;

    return await httpClient
      .get<Track[]>(
        `/users/tracks/${userId}?page=${page}&query=${query}&sortType=${sortType}&order=${order}&isFavourite=${isFavourite}`,
      )
      .then(({ data, headers }) => {
        set((state) => ({
          userTracks: [...state.userTracks, ...data],
          currentPage: state.currentPage + 1,
        }));
        set({ totalTracks: headers['x-total-count'] });

        return get().userTracks;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() =>
        set({ isUserTracksLoading: false, isQueryTracksLoading: false }),
      );
  },

  clearUserTracks: () => set({ userTracks: [], currentPage: 1 }),
});

export { type TracksPageState };
