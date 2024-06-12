import { Track } from 'project_midnight';

import { FilterOptions } from '@/pages/TracksPage/store/types/FilterOptions';

export type TracksPageState = {
  userTracks: Track[];
  totalTracks: number;
  isFavouriteTracksLoading: boolean;
  isUserTracksLoading: boolean;
  isQueryTracksLoading: boolean;
  currentPage: number;
  setIsFavouriteTracksLoading: (state: boolean) => void;
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
