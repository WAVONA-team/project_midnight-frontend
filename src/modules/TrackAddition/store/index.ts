import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { ParsedTrack, TrackAdditionState } from './types';

export const createTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  newTrack: null,
  isNewTrackLoading: false,
  newTrackError: '',
  newTrackRequest: async (url, userId) => {
    set({ newTrackError: '' });
    return await httpClient
      .post<ParsedTrack>('/track/get-info', {
        url,
        userId,
      })
      .then(({ data: track }) => {
        set({ newTrack: track });
        return track;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;
        set({ newTrackError: formErrors });
        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isNewTrackLoading: false }));
  },
  clearNewTrack: () => {
    set({ newTrack: null, newTrackError: '' });
  },
});

export { type TrackAdditionState };
