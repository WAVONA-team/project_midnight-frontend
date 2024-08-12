import { Track } from 'project_midnight';

export type SortType = {
  name: string;
  type: keyof Track;
};

export type TracksSearchPageState = {
  query: string;
  sortType: SortType;
  order: 'desc' | 'asc';
  isFiltering: boolean;
  setQuery: (query: string) => void;
  setSortType: (sortType: SortType) => void;
  setOrder: (order: 'desc' | 'asc') => void;
  setIsFiltering: (isFiltering: boolean) => void;
};
