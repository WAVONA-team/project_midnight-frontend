import { Track } from 'project_midnight';

export type TrackAdditionState = {
  newTrack: Track | null;
  isNewTrackLoading: boolean;
  newTrackError: string;
  newTrackRequest: (url: string, userId: string) => Promise<Track>;
  clearNewTrack: () => void;
};
