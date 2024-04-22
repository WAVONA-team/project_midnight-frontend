import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TrackAdditionState } from './types';

export const parseTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  parsedTrack: null,
  setParsedTrack: (track: Track) => set({ parsedTrack: track }),
  parseTrack: async (url, userId, duration) => {
    set({ isParsedTrackLoading: true });

    return await httpClient
      .post<Track>('/track/get-info', {
        url,
        userId,
        duration,
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
  isParsedTrackLoading: false,
  setIsParsedTrackLoading: (state: boolean) =>
    set({ isParsedTrackLoading: state }),
  parsedTrackDuration: null,
  setParsedTrackDuration: (state: string | null) =>
    set({ parsedTrackDuration: state }),
  clearParsedTrack: () => {
    set({ parsedTrack: null });
  },
});

export { type TrackAdditionState };
