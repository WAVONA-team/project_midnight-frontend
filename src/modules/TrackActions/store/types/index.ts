import { Track } from 'project_midnight';

export interface TrackActionsState {
  isUpdated: string;
  checkFavouriteTrack: (trackId: string, userId: string) => Promise<Track>;
  checkSavedTrack: (trackId: string, userId: string) => Promise<Track>;
  updateIsFavourite: (trackId: string, userId: string) => Promise<boolean>;
  updateIsSaved: (trackId: string, userId: string) => Promise<boolean>;
  deleteTrack: (trackId: string, userId: string) => Promise<Track>;
}
