import { Track } from 'project_midnight';
export type TracksSearchPageState = {
  query: string;
  sortType: keyof Track;
  order: 'desc' | 'asc' ;
  isFiltering: boolean;
  setQuery: (query: string) => void;
  setSortType: (sortType: keyof Track) => void;
  setOrder: (order: 'desc' | 'asc' ) => void;
  setIsFiltering: (isFiltering: boolean) => void;
};
