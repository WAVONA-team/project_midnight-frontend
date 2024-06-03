import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TracksPageState } from './types';

export const tracksPageSlice: StateCreator<TracksPageState> = (set, get) => ({
  userTracks: [],
  totalTracks: 0,
  isUserTracksLoading: true,
  isQueryTracksLoading: false,
  currentPage: 1,
  setUserTracks: (tracks) => set({ userTracks: tracks }),
  setCurrentPage: (number: number) => set({ currentPage: number }),
  setIsUserTracksLoading: (state) => set({ isUserTracksLoading: state }),
  setIsQueryTracksLoading: (state) => set({ isQueryTracksLoading: state }),
  getTracksByUser: async (
    userId: string,
    page: number,
    filterOptions = { query: '', sortType: 'updatedAt', order: 'desc' },
  ) => {
    const { query, sortType, order } = filterOptions;

    return await httpClient
      .get<Track[]>(
        `/users/tracks/${userId}?page=${page}&query=${query}&sortType=${sortType}&order=${order}`,
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
  clearUserTracks: () => set({ userTracks: [] }),
});

export { type TracksPageState };
