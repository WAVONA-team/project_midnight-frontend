export type TracksPlaylistControlsState = {
  tracksTitle: 'Пауза' | 'Слушать';
  tracksIcon: string;
  setTracksTitle: (title: string) => void;
  setTracksIcon: (icon: string) => void;
};
