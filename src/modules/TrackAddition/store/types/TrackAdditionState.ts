import { Track } from 'project_midnight';

import { ParsedTrack } from '@/modules/TrackAddition/store/types';

export type TrackAdditionState = {
  parsedTrack: ParsedTrack | null;
  isParsedTrackLoading: boolean;
  parsedTrackRequest: (url: string, userId: string) => Promise<ParsedTrack>;
  addParsedTrack: (
    userId: string,
    track: ParsedTrack,
    duration: string,
  ) => Promise<Track>;
  clearParsedTrack: () => void;
};
