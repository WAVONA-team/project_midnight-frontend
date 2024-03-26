import { StateCreator } from 'zustand';

import { createClient } from '@/shared/http';

import { Track } from '../types';
import { TrackAdditionState } from './types/TrackAdditionState';

const authClient = createClient();

export const createTrackSlice: StateCreator<TrackAdditionState> = (set) => ({
  track: null,
  isLoading: false,
  isError: false,
  trackRequest: async (url) => {
    return await authClient
      .post<Track>('/track', {
        url,
      })
      .then(({ data: track }) => {
        set({ track: track });
        return track;
      })
      .catch((e) => {
        set(e.response.data.message);
        throw e.response.data;
      })
      .finally(() => set({ isLoading: false }));
  },
});

export { type TrackAdditionState };
