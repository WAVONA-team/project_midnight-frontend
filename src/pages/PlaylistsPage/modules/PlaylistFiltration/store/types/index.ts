import { SortType } from '@/pages/PlaylistsPage/store/types/SortType';

export type playlistsFilteringState = {
  playlistSortType: SortType;
  playlistOrder: 'desc' | 'asc';
  playlistIsFiltering: boolean;
  setPlaylistSortType: (sortType: SortType) => void;
  setPlaylistOrder: (order: 'desc' | 'asc') => void;
  setPlaylistIsFiltering: (isFiltering: boolean) => void;
};
