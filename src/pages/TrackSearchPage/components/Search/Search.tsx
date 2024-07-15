import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

import debounce from 'lodash.debounce';

import { SearchInput } from '@/ui/Input';

export const Search: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const {
    user,
    getTracksByUser,
    currentPage,
    clearUserPlaylist,
    setIsQueryTracksLoading,
  } = useStore(
    ({
      user,
      getTracksByUser,
      currentPage,
      clearUserPlaylist,
      setIsQueryTracksLoading,
    }) => ({
      user,
      getTracksByUser,
      currentPage,
      clearUserPlaylist,
      setIsQueryTracksLoading,
    }),
  );

  const { query, setQuery } = tracksSearchPageSlice(({ query, setQuery }) => ({
    query,
    setQuery,
  }));

  const getTracksByUserWrapper = useCallback((query: string) => {
    clearUserPlaylist();

    getTracksByUser(user!.id, currentPage, { query });
  }, []);

  const debouncedGet = useCallback(debounce(getTracksByUserWrapper, 500), [
    getTracksByUserWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    clearUserPlaylist();
    setIsQueryTracksLoading(true);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    setQuery('');
    clearUserPlaylist();
  };

  return (
    <header className="flex gap-4">
      <SearchInput
        clearValue={clearValueHandler}
        placeholder="Название, исполнитель..."
        value={query}
        onChange={onChangeHandler}
        className="w-full"
      />

      <button
        className="mt-6 text-xs text-secondary-cadet-gray p-1"
        type="button"
        onClick={() => {
          clearUserPlaylist();
          getTracksByUser(user!.id, currentPage).then(() => navigate(-1));
        }}
      >
        Отмена
      </button>
    </header>
  );
});
