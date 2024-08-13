import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors';

import { TrackAdditionState } from './types';

export const parseTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  parsedTrack: null,
  isParsedTrackLoading: false,
  parsedTrackDuration: null,
  setIsParsedTrackLoading: (state: boolean) =>
    set({ isParsedTrackLoading: state }),
  setParsedTrackDuration: (state: string | null) =>
    set({ parsedTrackDuration: state }),
  clearParsedTrack: () => {
    set({ parsedTrack: null });
  },
  setParsedTrack: (track) => set({ parsedTrack: track }),
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
        set({ isParsedTrackLoading: false });
        return track;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;
        throw { fieldErrors, formErrors };
      })
      .finally(() => set({ isParsedTrackLoading: false }));
  },
  resolvedUrl: null,
  setResolvedUrl: (url) => set({ resolvedUrl: url }),
  resolveShortUrl: async (shortUrl) => {
    set({ isParsedTrackLoading: true });

    return await httpClient
      .post<string>('/track/resolve', {
        url: shortUrl,
      })
      .then(({ data }) => set({ resolvedUrl: data }))
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;
        throw { fieldErrors, formErrors };
      });
  },
});

export { type TrackAdditionState };
