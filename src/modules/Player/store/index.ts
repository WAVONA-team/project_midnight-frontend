import { create } from 'zustand';

import { PlayerState } from './types/PlayerState';

export const useStore = create<PlayerState>((set) => ({
  playerState: false,
  isLoop: false,
  volume: 100,
  trackNumber: 0,
  currentTime: 0,
  secondsLoaded: 0,
  duration: 0,
  changePlayerState: (playerState: boolean) => set({ playerState: playerState }),
  changeIsLoop: (isLoop: boolean) => set({ isLoop: isLoop }),
  changeVolume: (volume: number) => set({ volume: volume }),
  changeTrackNumber: (trackNumber: number) => set({ trackNumber: trackNumber }),
  changeCurrentTime: (currentTime: number) => set({ currentTime: currentTime }),
  changeSecondsLoaded: (secondsLoaded: number) => set({ secondsLoaded: secondsLoaded }),
  changeDuration: (duration: number) => set({ duration: duration }),
}))

export { type PlayerState };
