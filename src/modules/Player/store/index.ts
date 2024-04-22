import { Track } from 'project_midnight';
import { type StateCreator } from 'zustand';

import { PlayerState } from './types/PlayerState';

export const createPlayerSlice: StateCreator<PlayerState> = (set) => ({
  tracks: null,
  playerState: false,
  isLoop: false,
  volume: 70,
  currentTrack: null,
  currentTime: 0,
  secondsLoaded: 0,
  duration: 0,
  seekTo: 0,
  seeking: false,
  setTracks: (tracks: Track[]) => set({ tracks }),
  changePlayerState: (playerState: boolean) => set({ playerState }),
  changeIsLoop: (isLoop: boolean) => set({ isLoop }),
  changeVolume: (volume: number) => set({ volume }),
  changeCurrentTrack: (currentTrack: Track | null) => set({ currentTrack }),
  changeCurrentTime: (currentTime: number) => set({ currentTime }),
  changeSecondsLoaded: (secondsLoaded: number) => set({ secondsLoaded }),
  changeDuration: (duration: number) => set({ duration }),
  changeSeekTo: (seekTo: number) => set({ seekTo }),
  changeSeeking: (seeking: boolean) => set({ seeking }),
});

export { type PlayerState };
