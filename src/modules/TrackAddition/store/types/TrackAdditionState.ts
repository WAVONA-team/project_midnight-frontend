import { Track } from 'project_midnight';

import { ParsedTrack } from '@/modules/TrackAddition/store/types';

export type TrackAdditionState = {
  parsedTrack: Track | ParsedTrack | null;
  parseTrack: (
    url: string,
    userId: string,
    duration: string,
  ) => Promise<ParsedTrack>;
  parsedTrackDuration: string | null;
  setParsedTrackDuration: (state: string) => void;
  isParsedTrackLoading: boolean;
  setIsParsedTrackLoading: (state: boolean) => void;
  clearParsedTrack: () => void;
};
