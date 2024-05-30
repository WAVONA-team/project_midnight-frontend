// import { Track } from 'project_midnight';
import { StateCreator } from 'zustand';

// import { httpClient } from '@/shared/api/httpClient';
// import { ServerErrors } from '@/shared/types/ServerErrors';
import { TracksSearchPageState } from './types';

export const tracksSearchPageSlice: StateCreator<TracksSearchPageState> = (
  set,
) => ({
  query: '',
  setQuery: (query) => set({ query }),
});

export { type TracksSearchPageState };
