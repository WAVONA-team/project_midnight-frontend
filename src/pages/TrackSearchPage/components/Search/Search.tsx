/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

import { SearchInput } from '@/ui/Input';

export const Search: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', { keyPrefix: 'mainPage' });

  const navigate = useNavigate();

  const {
    user,
    getTracksByUser,
    currentPage,
    clearUserPlaylist,
    setIsQueryTracksLoading,
    clearUserTracks,
  } = useStore(
    ({
      user,
      getTracksByUser,
      currentPage,
      clearUserPlaylist,
      setIsQueryTracksLoading,
      clearUserTracks,
    }) => ({
      user,
      getTracksByUser,
      currentPage,
      clearUserPlaylist,
      setIsQueryTracksLoading,
      clearUserTracks,
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
        placeholder={t('searchInputPlaceholder')}
        value={query}
        onChange={onChangeHandler}
        className="w-full"
      />

      <button
        className="mt-6 text-xs text-secondary-cadet-gray p-1"
        type="button"
        onClick={() => {
          clearUserPlaylist();
          clearUserTracks();
          setQuery('');
          navigate(-1);
        }}
      >
        {t('cancel')}
      </button>
    </header>
  );
});
