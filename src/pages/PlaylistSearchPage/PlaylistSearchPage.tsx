/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import { PlaylistContainer } from '@/pages/PlaylistsPage/components/PlaylistContainer/PlaylistContainer';

import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';

export const PlaylistSearchPage: React.FC = React.memo(() => {
  const navigate = useNavigate();

  const {
    user,
    currentPlaylistPage,
    playlistSearchQuery,
    setPlaylistSearchQuery,
    clearPlaylists,
    getPlaylists,
    setIsQueryPlaylistsLoading,
  } = useStore(
    ({
      user,
      currentPlaylistPage,
      playlistSearchQuery,
      setPlaylistSearchQuery,
      clearPlaylists,
      getPlaylists,
      setIsQueryPlaylistsLoading,
    }) => ({
      user,
      currentPlaylistPage,
      playlistSearchQuery,
      setPlaylistSearchQuery,
      clearPlaylists,
      getPlaylists,
      setIsQueryPlaylistsLoading,
    }),
  );

  const getTracksByUserWrapper = useCallback((query: string) => {
    clearPlaylists();

    getPlaylists(user!.id, currentPlaylistPage, { query });
  }, []);

  const debouncedGet = useCallback(debounce(getTracksByUserWrapper, 500), [
    getTracksByUserWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistSearchQuery(e.target.value);
    clearPlaylists();
    setIsQueryPlaylistsLoading(true);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    clearPlaylists();
    setPlaylistSearchQuery('');
  };

  return (
    <Container
      className="
      bg-background-hight
        py-6
        sm:bg-background-default-gradient
        sm:py-12
        w-full
        h-full
      "
    >
      <header className="flex gap-4 items-center">
        <SearchInput
          value={playlistSearchQuery}
          onChange={onChangeHandler}
          clearValue={clearValueHandler}
          placeholder="Название"
          className="w-full"
        />

        <button
          className="mt-6 text-xs text-secondary-cadet-gray p-1"
          type="button"
          onClick={() => {
            clearPlaylists();
            setPlaylistSearchQuery('');
            getPlaylists(user!.id, currentPlaylistPage).then(() =>
              navigate(-1),
            );
          }}
        >
          Отмена
        </button>
      </header>

      {!!playlistSearchQuery.length && (
        <div className="mt-4">
          <PlaylistContainer />
        </div>
      )}
    </Container>
  );
});
