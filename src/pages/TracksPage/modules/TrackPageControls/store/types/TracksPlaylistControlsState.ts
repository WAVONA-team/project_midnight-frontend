export type TracksPlaylistControlsState = {
  tracksTitle: 'Пауза' | 'Слушать';
  tracksIcon: string;
  setTracksTitle: (title: 'Пауза' | 'Слушать') => void;
  setTracksIcon: (icon: string) => void;
};
