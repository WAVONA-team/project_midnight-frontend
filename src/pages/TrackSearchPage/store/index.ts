import { StateCreator } from 'zustand';

import { TracksSearchPageState } from './types';

export const tracksSearchPageSlice: StateCreator<TracksSearchPageState> = (
  set,
) => ({
  query: '',
  setQuery: (query) => set({ query }),
});

export { type TracksSearchPageState };
