import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { ParsedTrack, TrackAdditionState } from './types';

export const parseTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  parsedTrack: null,
  isParsedTrackLoading: false,
  parseTrack: async (url, userId) => {
    return await httpClient
      .post<ParsedTrack>('/track/get-info', {
        url,
        userId,
      })
      .then(({ data: track }) => {
        set({ parsedTrack: track });
        return track;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isParsedTrackLoading: false }));
  },
  clearParsedTrack: () => {
    set({ parsedTrack: null });
  },
});

export { type TrackAdditionState };
