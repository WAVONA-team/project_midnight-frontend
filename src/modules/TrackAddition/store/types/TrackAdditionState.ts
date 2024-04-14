import { Track } from 'project_midnight';

import { ParsedTrack } from '@/modules/TrackAddition/store/types';

export type TrackAdditionState = {
  parsedTrack: Track | ParsedTrack | null;
  isParsedTrackLoading: boolean;
  parseTrack: (url: string, userId: string) => Promise<ParsedTrack>;
  clearParsedTrack: () => void;
};
