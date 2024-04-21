import { Track } from 'project_midnight';

export type TrackAdditionState = {
  parsedTrack: Track | null;
  parseTrack: (url: string, userId: string, duration: string) => Promise<Track>;
  parsedTrackDuration: string | null;
  setParsedTrackDuration: (state: string) => void;
  isParsedTrackLoading: boolean;
  setIsParsedTrackLoading: (state: boolean) => void;
  clearParsedTrack: () => void;
};
