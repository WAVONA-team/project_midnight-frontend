import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { PlaylistList } from '@/pages/PlaylistsPage/components/PlaylistList/PlaylistList';
import { playlistsFilteringSlice } from '@/pages/PlaylistsPage/modules/PlaylistFiltration/store';

export const PlaylistContainer: React.FC = React.memo(() => {
  const {
    user,
    playlists,
    currentPlaylistPage,
    isPlaylistsLoading,
    isQueryPlaylistsLoading,
    totalPlaylists,
    setIsPlaylistsLoading,
    getPlaylists,
    playlistSearchQuery,
  } = useStore(
    ({
      user,
      playlists,
      currentPlaylistPage,
      isPlaylistsLoading,
      isQueryPlaylistsLoading,
      totalPlaylists,
      setIsPlaylistsLoading,
      getPlaylists,
      playlistSearchQuery,
    }) => ({
      user,
      playlists,
      currentPlaylistPage,
      isPlaylistsLoading,
      isQueryPlaylistsLoading,
      totalPlaylists,
      setIsPlaylistsLoading,
      getPlaylists,
      playlistSearchQuery,
    }),
  );

  const {
    playlistIsFiltering,
    playlistSortType,
    playlistOrder,
    setPlaylistIsFiltering,
  } = playlistsFilteringSlice(
    ({
      playlistIsFiltering,
      playlistSortType,
      playlistOrder,
      setPlaylistIsFiltering,
    }) => ({
      playlistIsFiltering,
      playlistSortType,
      playlistOrder,
      setPlaylistIsFiltering,
    }),
  );

  useEffect(() => {
    if (isPlaylistsLoading || playlistIsFiltering) {
      getPlaylists(user!.id, currentPlaylistPage, {
        query: playlistSearchQuery,
        sortType: playlistSortType.type,
        order: playlistOrder,
      }).finally(() => setPlaylistIsFiltering(false));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaylistsLoading, playlistIsFiltering]);

  return (
    <PlaylistList
      playlists={playlists}
      isLoading={
        isPlaylistsLoading || isQueryPlaylistsLoading || playlistIsFiltering
      }
      setIsLoading={setIsPlaylistsLoading}
      totalPlaylists={totalPlaylists}
    />
  );
});
