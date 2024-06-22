import { Track } from 'project_midnight';

export type TrackAdditionState = {
  parsedTrack: Track | null;
  setParsedTrack: (track: Track) => void;
  parseTrack: (url: string, userId: string, duration: string) => Promise<Track>;
  parsedTrackDuration: string | null;
  setParsedTrackDuration: (state: string | null) => void;
  isParsedTrackLoading: boolean;
  setIsParsedTrackLoading: (state: boolean) => void;
  clearParsedTrack: () => void;
  resolvedUrl: string | null;
  setResolvedUrl: (url: string | null) => void;
  resolveShortUrl: (url: string) => Promise<void>;
};
