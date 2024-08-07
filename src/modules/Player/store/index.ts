import { Track } from 'project_midnight';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { PlayerState } from './types/PlayerState';

export const createPlayerSlice = create<PlayerState>()(
  persist(
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
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(
            ([key]) => !['playerState'].includes(key),
          ),
        ),
    },
  ),
);

export { type PlayerState };
