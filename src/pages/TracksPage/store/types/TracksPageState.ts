import { Playlist } from 'project_midnight';

import { FilterOptions } from '@/pages/TracksPage/store/types/FilterOptions';

export type TracksPageState = {
  userPlaylist: Playlist | null;
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
  ) => Promise<Playlist>;
  clearUserPlaylist: () => void;
};
