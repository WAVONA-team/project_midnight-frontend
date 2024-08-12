import { Playlist } from 'project_midnight';

import { FilterOptions } from '@/pages/PlaylistsPage/store/types/FilterOptions';

export type PlaylistsPageState = {
  playlists: Playlist[];
  isPlaylistsLoading: boolean;
  isQueryPlaylistsLoading: boolean;
  totalPlaylists: number;
  currentPlaylistPage: number;
  playlistSearchQuery: string;
  setPlaylistSearchQuery: (query: string) => void;
  setIsPlaylistsLoading: (state: boolean) => void;
  setIsQueryPlaylistsLoading: (state: boolean) => void;
  getPlaylists: (
    userId: string,
    page: number,
    filterOptions?: FilterOptions,
  ) => Promise<Playlist[]>;
  createPlaylist: (name: string, userId: string) => Promise<Playlist>;
  clearPlaylists: () => void;
  setCurrentPlaylistPage: (page: number) => void;
};
