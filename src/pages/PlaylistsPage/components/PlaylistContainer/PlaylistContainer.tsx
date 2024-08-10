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
    }) => ({
      user,
      playlists,
      currentPlaylistPage,
      isPlaylistsLoading,
      isQueryPlaylistsLoading,
      totalPlaylists,
      setIsPlaylistsLoading,
      getPlaylists,
    }),
  );

  useEffect(() => {
    if (isPlaylistsLoading) {
      getPlaylists(user!.id, currentPlaylistPage, {
        query: '',
        sortType: 'updatedAt',
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
