import React, { useCallback } from 'react';

import { useStore } from '@/store';
import debounce from 'lodash.debounce';

import TrackPageActions from '@/pages/TracksPage/modules/TrackPageHeader/components/TrackPageActions/TrackPageActions';

import { SearchInput } from '@/ui/Input';
import { Logo } from '@/ui/Logo';

export const Search: React.FC = React.memo(() => {
  const {
    user,
    playlistSearchQuery,
    currentPlaylistPage,
    setPlaylistSearchQuery,
    clearPlaylists,
    setIsQueryPlaylistsLoading,
    getPlaylists,
  } = useStore(
    ({
      user,
      playlistSearchQuery,
      currentPlaylistPage,
      setPlaylistSearchQuery,
      clearPlaylists,
      setIsQueryPlaylistsLoading,
      getPlaylists,
    }) => ({
      user,
      playlistSearchQuery,
      currentPlaylistPage,
      setPlaylistSearchQuery,
      clearPlaylists,
      setIsQueryPlaylistsLoading,
      getPlaylists,
    }),
  );

  const getPlaylistsWrapper = useCallback((query: string) => {
    clearPlaylists();

    getPlaylists(user!.id, currentPlaylistPage, { query });
  }, []);

  const debouncedGet = useCallback(debounce(getPlaylistsWrapper, 500), [
    getPlaylistsWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    clearPlaylists();
    setIsQueryPlaylistsLoading(true);
    setPlaylistSearchQuery(e.target.value);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    setPlaylistSearchQuery('');
    clearPlaylists();
    getPlaylists(user?.id!, currentPlaylistPage);
  };

  return (
    <div className="">
      <div className="flex justify-between md:hidden">
        <Logo textSize="text-lg" logoWidth="w-6" />

        <TrackPageActions searchTo="/playlists/search" />
      </div>

      <SearchInput
        value={playlistSearchQuery}
        onChange={onChangeHandler}
        clearValue={clearValueHandler}
        placeholder="Название"
        className="!w-2/5 hidden md:block"
      />
    </div>
  );
});