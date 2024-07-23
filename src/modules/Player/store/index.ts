import { Track } from 'project_midnight';
import { type StateCreator } from 'zustand';
import { PersistOptions, createJSONStorage, persist } from 'zustand/middleware';

import { PlayerState } from './types/PlayerState';

type MyPersist = (
  config: StateCreator<PlayerState>,
  options: PersistOptions<PlayerState>,
) => StateCreator<PlayerState>;

export const createPlayerSlice: StateCreator<PlayerState, []> = (
  persist as MyPersist
)(
  (set) => ({
    playerState: false,
    isLoop: false,
    volume: 0.7,
    currentTrack: null,
    currentTime: 0,
    secondsLoaded: 0,
    duration: 0,
    seekTo: 0,
    seeking: false,
    changePlayerState: (playerState: boolean) => set({ playerState }),
    changeIsLoop: (isLoop: boolean) => set({ isLoop }),
    changeVolume: (volume: number) => set({ volume }),
    changeCurrentTrack: (currentTrack: Track | null) => set({ currentTrack }),
    changeCurrentTime: (currentTime: number) => set({ currentTime }),
    changeSecondsLoaded: (secondsLoaded: number) => set({ secondsLoaded }),
    changeDuration: (duration: number) => set({ duration }),
    changeSeekTo: (seekTo: number) => set({ seekTo }),
    changeSeeking: (seeking: boolean) => set({ seeking }),
  }),
  {
    name: 'playerStorage',
    storage: createJSONStorage(() => localStorage),
  },
);

export { type PlayerState };
