import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

import { httpClient } from '@/shared/api/httpClient';
import { ServerErrors } from '@/shared/types/ServerErrors.ts';

import { TrackActionsState } from './types/index.ts';

const getUrl = (sub: string): string => {
  return `/track/${sub}`;
};

export const trackActionsSlice: StateCreator<TrackActionsState> = (set) => ({
  isUpdated: '',
  checkFavouriteTrack: async (trackId: string, userId: string) => {
    return await httpClient
      .get<Track>(getUrl(`check-favourite-track/${userId}/${trackId}`))
      .then(({ data }) => data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  checkSavedTrack: async (trackId: string, userId: string) => {
    return await httpClient
      .get<Track>(getUrl(`check-saved-track/${userId}/${trackId}`))
      .then(({ data }) => data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  updateIsFavourite: async (trackId, userId) => {
    return await httpClient
      .patch<boolean>(getUrl('update-favourite'), { trackId, userId })
      .then(({ data }) => {
        set({ isUpdated: `${trackId}:${data}` });

        return data;
      })
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  updateIsSaved: async (trackId, userId) => {
    return await httpClient
      .patch<boolean>(getUrl('update-saved'), { trackId, userId })
      .then(({ data }) => data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
  deleteTrack: async (trackId: string, userId: string) => {
    return await httpClient
      .delete(getUrl(`delete-from-saved/${userId}/${trackId}`))
      .then((res) => res.data)
      .catch((serverErrors) => {
        const { fieldErrors, formErrors }: ServerErrors =
          serverErrors.response.data;

        throw { fieldErrors, formErrors };
      });
  },
});

export { type TrackActionsState };
