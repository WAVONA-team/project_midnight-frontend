import { Playlist, Track } from 'project_midnight';

import { FilterOptions } from '@/pages/TracksPage/store/types/FilterOptions';

export type TracksPageState = {
  userTracks: Track[];
  userPlaylist: Playlist | null;
  totalTracks: number;
  isFavouriteTracksLoading: boolean;
  isFiltering: boolean;
  isUserTracksLoading: boolean;
  isQueryTracksLoading: boolean;
  currentPage: number;
  clearUserTracks: () => void;
  setIsFiltering: (state: boolean) => void;
  setIsFavouriteTracksLoading: (state: boolean) => void;
  setCurrentPage: (number: number) => void;
  setIsUserTracksLoading: (state: boolean) => void;
  setIsQueryTracksLoading: (state: boolean) => void;
  getTracksByUser: (
    userId: string,
    page: number,
    filterOptions?: FilterOptions,
  ) => Promise<Playlist>;
  clearUserPlaylist: () => void;
};
