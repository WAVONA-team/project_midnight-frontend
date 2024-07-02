import playIcon from '@/../public/buttons/playerButtons/mainPagePlayIcon.svg';
import { StateCreator } from 'zustand';

import { TracksPlaylistControlsState } from './types';

export const tracksPlaylistControls: StateCreator<
  TracksPlaylistControlsState
> = (set) => ({
  allTracksTitle: 'Слушать',
  favouriteTracksTitle: 'Слушать',
  allTracksIcon: playIcon,
  favouriteTracksIcon: playIcon,
  setAllTracksTitle: (title) => set({ allTracksTitle: title }),
  setFavouriteTracksTitle: (title) => set({ favouriteTracksTitle: title }),
  setAllTracksIcon: (icon) => set({ allTracksIcon: icon }),
  setFavouriteTracksIcon: (icon) => set({ favouriteTracksIcon: icon }),
});

export { type TracksPlaylistControlsState };
