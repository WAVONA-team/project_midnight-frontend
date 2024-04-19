import { type StateCreator } from 'zustand';

import { PlayerState } from './types/PlayerState';

export const createPlayerSlice: StateCreator<PlayerState> = (set) => ({
  tracks: [],
  playerState: false,
  isLoop: false,
  volume: 70,
  trackNumber: 0,
  tracksLenght: 0,
  currentTime: 0,
  secondsLoaded: 0,
  duration: 0,
  seekTo: 0,
  seeking: false,
  setTracks: (tracks: string[]) => set({ tracks }),
  changePlayerState: (playerState: boolean) => {
    set({ playerState });
  },
  changeIsLoop: (isLoop: boolean) => set({ isLoop }),
  changeVolume: (volume: number) => set({ volume }),
  changeTrackNumber: (trackNumber: number) => set({ trackNumber }),
  changeTracksLenght: (tracksLenght: number) => set({ tracksLenght }),
  changeCurrentTime: (currentTime: number) => set({ currentTime }),
  changeSecondsLoaded: (secondsLoaded: number) => set({ secondsLoaded }),
  changeDuration: (duration: number) => set({ duration }),
  changeSeekTo: (seekTo: number) => set({ seekTo }),
  changeSeeking: (seeking: boolean) => set({ seeking }),
});

export { type PlayerState };
