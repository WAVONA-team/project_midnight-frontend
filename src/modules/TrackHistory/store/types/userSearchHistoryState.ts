import { Track } from 'project_midnight';

export type userSearchHistoryState = {
  userSearchHistory: Track[] | null;
  getUserSearchHistory: (userId: string) => Promise<void>;
  updateHistoryOrder: (trackId: string) => Promise<Track>;
};
