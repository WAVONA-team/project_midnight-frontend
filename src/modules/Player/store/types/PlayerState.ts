export type PlayerState = {
  playerState: boolean;
  isLoop: boolean;
  volume: number;
  trackNumber: number;
  currentTime: number;
  secondsLoaded: number;
  duration: number;
  changePlayerState: (playerState: boolean) => void;
  changeIsLoop: (isLoop: boolean) => void;
  changeVolume: (volume: number) => void;
  changeTrackNumber: (trackNumber: number) => void;
  changeCurrentTime: (currentTime: number) => void;
  changeSecondsLoaded: (secondsLoaded: number) => void;
  changeDuration: (duraation: number) => void;
};
