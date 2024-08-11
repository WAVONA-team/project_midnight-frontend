import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { PlaylistList } from '@/pages/PlaylistsPage/components/PlaylistList/PlaylistList';

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

  useEffect(() => {
    if (isPlaylistsLoading) {
      getPlaylists(user!.id, currentPlaylistPage, {
        query: playlistSearchQuery,
        sortType: 'createdAt',
        order: 'desc',
      });
    }
  }, [isPlaylistsLoading]);

  return (
    <PlaylistList
      playlists={playlists}
      isLoading={isPlaylistsLoading || isQueryPlaylistsLoading}
      setIsLoading={setIsPlaylistsLoading}
      totalPlaylists={totalPlaylists}
    />
  );
});
