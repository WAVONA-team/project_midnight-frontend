import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { ParsedTrack, TrackAdditionState } from './types';

export const parseTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  parsedTrack: null,
  isParsedTrackLoading: false,
  setIsParsedTrackLoading: (state: boolean) =>
    set({ isParsedTrackLoading: state }),
  parseTrack: async (url, userId) => {
    set({ isParsedTrackLoading: true });

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

        set({ isParsedTrackLoading: false });

        throw { fieldErrors, formErrors };
      });
  },
  clearParsedTrack: () => {
    set({ parsedTrack: null });
  },
});

export { type TrackAdditionState };
