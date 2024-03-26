import { Track } from '../../types';

export type TrackAdditionState = {
  track: Track | null;
  isLoading: boolean;
  isError: boolean;
  trackRequest: (url: string) => Promise<Track>;
};
