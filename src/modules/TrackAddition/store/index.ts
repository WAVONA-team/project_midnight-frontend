import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { ParsedTrack, TrackAdditionState } from './types';

export const createTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  parsedTrack: null,
  setParsedTrack: (track: Track) => set({ parsedTrack: track }),
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
  addParsedTrack: async (userId, parsedTrack, duration) => {
    return await httpClient
      .post<Track>('/track/new', {
        userId,
        ...parsedTrack,
        duration,
      })
      .then(({ data: track }) => track)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  clearParsedTrack: () => {
    set({ parsedTrack: null });
  },
});

export { type TrackAdditionState };
