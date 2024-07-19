/* eslint-disable indent */
import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

const TracksContainer: React.FC = React.memo(() => {
  const {
    isUserTracksLoading,
    isQueryTracksLoading,
    setIsUserTracksLoading,
    user,
    getTracksByUser,
    currentPage,
    totalTracks,
    isFavouriteTracksLoading,
    clearUserPlaylist,
    userTracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userTracks,
    }) => ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userTracks,
    }),
  );

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserPlaylist();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage, {
        query: '',
        sortType: 'updatedAt',
        order: 'desc',
        isFavourite,
      });
    }
  }, [isUserTracksLoading]);

  return (
    <TrackList
      tracks={userTracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
    />
  );
});

export default TracksContainer;
