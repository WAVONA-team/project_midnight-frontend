import playIcon from '@/../public/buttons/playerButtons/mainPagePlayIcon.svg';
import { StateCreator } from 'zustand';

import { TracksPlaylistControlsState } from './types';

export const tracksPlaylistControls: StateCreator<
  TracksPlaylistControlsState
> = (set) => ({
  tracksTitle: 'listen',
  tracksIcon: playIcon,
  setTracksTitle: (title) => set({ tracksTitle: title }),
  setTracksIcon: (icon) => set({ tracksIcon: icon }),
});

export { type TracksPlaylistControlsState };
