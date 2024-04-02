import { ParsedTrack } from '@/modules/TrackAddition/store/types';

export type TrackAdditionState = {
  newTrack: ParsedTrack | null;
  isNewTrackLoading: boolean;
  newTrackError: string;
  newTrackRequest: (url: string, userId: string) => Promise<ParsedTrack>;
  clearNewTrack: () => void;
};
