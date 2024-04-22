import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TracksPageState } from './types';

export const tracksPageSlice: StateCreator<TracksPageState> = (set) => ({
  userTracks: [],
  isUserTracksLoading: false,
  currentPage: 1,
  setIsUserTracksLoading: (state) => set({ isUserTracksLoading: state }),
  getTracksByUser: async (userId: string, page: number) => {
    set({ isUserTracksLoading: true });

    return await httpClient
      .get<Track[]>(`/users/tracks/${userId}?page=${page}`)
      .then(({ data }) => {
        set((state) => ({
          userTracks: [...state.userTracks, ...data],
          currentPage: state.currentPage + 1,
        }));

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isUserTracksLoading: false }));
  },
});

export { type TracksPageState };