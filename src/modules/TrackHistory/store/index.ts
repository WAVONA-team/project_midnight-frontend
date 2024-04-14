import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { userSearchHistoryState } from '@/modules/TrackHistory/store/types';

export const userSearchHistorySlice: StateCreator<userSearchHistoryState> = (set) => ({
  userSearchHistory: null,
  getUserSearchHistory: async (userId: string) => {
    return await httpClient
      .get<Track[]>(`/users/search-history/${userId}`)
      .then((res) => set({ userSearchHistory: res.data }))
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
});

export { type userSearchHistoryState };
