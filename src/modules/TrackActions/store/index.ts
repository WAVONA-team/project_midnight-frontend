import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors.ts';

import { TrackActionsState } from './types/index.ts';

export const trackActionsSlice: StateCreator<TrackActionsState> = () => ({
  checkTrack: async (trackId: string, userId: string) => {
    return await httpClient
      .get<Track>(`check-track/${userId}/${trackId}`)
      .then((res) => {
        return res.data as Track;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  saveTrack: async (track: Track, userId: string) => {
    return await httpClient
      .post('new', { ...track, userId })
      .then((res) => res.data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  updateIsFavourite: async (trackId, userId) => {
    return await httpClient
      .patch<Track>('track/update-favourite', { trackId, userId })
      .then((res) => res.data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
});
