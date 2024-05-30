import { Track } from 'project_midnight';

export type TracksPageState = {
  userTracks: Track[];
  totalTracks: number;
  isUserTracksLoading: boolean;
  isQueryTracksLoading: boolean;
  currentPage: number;
  setCurrentPage: (number: number) => void;
  setIsUserTracksLoading: (state: boolean) => void;
  setIsQueryTracksLoading: (state: boolean) => void;
  getTracksByUser: (userId: string, page: number, query: string) => Promise<Track[]>;
  clearUserTracks: () => void;
};
