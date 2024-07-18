export type TracksPlaylistControlsState = {
  allTracksTitle: string;
  favouriteTracksTitle: string;
  allTracksIcon: string;
  favouriteTracksIcon: string;
  setAllTracksTitle: (title: string) => void;
  setFavouriteTracksTitle: (title: string) => void;
  setAllTracksIcon: (icon: string) => void;
  setFavouriteTracksIcon: (icon: string) => void;
};
