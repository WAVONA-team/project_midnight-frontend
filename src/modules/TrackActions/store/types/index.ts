import { Track } from 'project_midnight';

export interface TrackActionsState {
  isUpdated: string;
  checkTrack: (trackId: string, userId: string) => Promise<Track>;
  saveTrack: (track: Track, userId: string) => Promise<Track>;
  updateIsFavourite: (trackId: string, userId: string) => Promise<boolean>;
  deleteTrack: (trackId: string, userId: string) => Promise<Track>;
}
