import { Playlist } from 'project_midnight';

import { FilterOptions } from '@/pages/TracksPage/store/types';

export type PlaylistsPageState = {
  playlists: Playlist[];
  isPlaylistsLoading: boolean;
  isQueryPlaylistsLoading: boolean;
  totalPlaylists: number;
  currentPlaylistPage: number;
  setIsPlaylistsLoading: (state: boolean) => void;
  getPlaylists: (
    userId: string,
    page: number,
    filterOptions: FilterOptions,
  ) => Promise<Playlist[]>;
  createPlaylist: (name: string, userId: string) => Promise<Playlist>;
  clearPlaylists: () => void;
};
