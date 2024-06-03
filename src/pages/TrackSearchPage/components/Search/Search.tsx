import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import { SearchInput } from '@/ui/Input';

export const Search: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const {
    user,
    getTracksByUser,
    currentPage,
    clearUserTracks,
    query,
    setQuery,
    setTracks,
    setIsQueryTracksLoading,
  } = useStore(
    ({
      user,
      getTracksByUser,
      currentPage,
      clearUserTracks,
      query,
      setQuery,
      setTracks,
      setIsQueryTracksLoading,
    }) => ({
      user,
      getTracksByUser,
      currentPage,
      clearUserTracks,
      query,
      setQuery,
      setTracks,
      setIsQueryTracksLoading,
    }),
  );

  const getTracksByUserWrapper = useCallback((query: string) => {
    getTracksByUser(user!.id, currentPage, { query }).then((tracks) =>
      setTracks(tracks.slice(0, 5)),
    );
  }, []);

  const debouncedGet = useCallback(debounce(getTracksByUserWrapper, 500), [
    getTracksByUserWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    clearUserTracks();
    setIsQueryTracksLoading(true);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    setQuery('');
    clearUserTracks();
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
          clearUserTracks();

          getTracksByUser(user!.id, currentPage).then((tracks) => {
            setTracks(tracks);
            navigate(-1);
          });
        }}
      >
        Отмена
      </button>
    </header>
  );
});
