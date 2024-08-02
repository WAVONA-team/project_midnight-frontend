import { Track } from 'project_midnight';

export interface TrackActionsState {
  checkTrack: (trackId: string, userId: string) => Promise<Track>;
  saveTrack: (track: Track, userId: string) => Promise<Track>;
  updateIsFavourite: (trackId: string, userId: string) => Promise<Track>;
  deleteTrack: (trackId: string, userId: string) => Promise<Track>;
}
