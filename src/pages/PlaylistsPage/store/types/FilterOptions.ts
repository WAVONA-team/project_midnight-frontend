import { type Playlist } from 'project_midnight';

export type FilterOptions = {
  query?: string;
  sortType?: keyof Playlist;
  order?: 'asc' | 'desc';
  isFavourite?: boolean;
};
