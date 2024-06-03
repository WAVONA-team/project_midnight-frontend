import { Track } from 'project_midnight';

export type PlayerState = {
  tracks: Track[] | null;
  playerState: boolean;
  isLoop: boolean;
  volume: number;
  currentTrack: Track | null;
  currentTime: number;
  secondsLoaded: number;
  duration: number;
  seekTo: number;
  seeking: boolean;
  setTracks: (tracks: Track[] | null) => void;
  changePlayerState: (playerState: boolean) => void;
  changeIsLoop: (isLoop: boolean) => void;
  changeVolume: (volume: number) => void;
  changeCurrentTrack: (track: Track | null) => Promise<void>;
  changeCurrentTime: (currentTime: number) => void;
  changeSecondsLoaded: (secondsLoaded: number) => void;
  changeDuration: (duration: number) => void;
  changeSeekTo: (playerState: number) => void;
  changeSeeking: (seeking: boolean) => void;
};
