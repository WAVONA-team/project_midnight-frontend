import { type Playlist } from 'project_midnight';

export type SortType = {
  name: string;
  type: keyof Playlist;
};
