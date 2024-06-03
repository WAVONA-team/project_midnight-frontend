import { Track } from 'project_midnight';

import { FilterOptions } from '@/pages/TracksPage/store/types/FilterOptions';

export type TracksPageState = {
  userTracks: Track[];
  totalTracks: number;
  isUserTracksLoading: boolean;
  isQueryTracksLoading: boolean;
  currentPage: number;
  setUserTracks: (tracks: Track[]) => void;
  setCurrentPage: (number: number) => void;
  setIsUserTracksLoading: (state: boolean) => void;
  setIsQueryTracksLoading: (state: boolean) => void;
  getTracksByUser: (
    userId: string,
    page: number,
    filterOptions?: FilterOptions,
  ) => Promise<Track[]>;
  clearUserTracks: () => void;
};
