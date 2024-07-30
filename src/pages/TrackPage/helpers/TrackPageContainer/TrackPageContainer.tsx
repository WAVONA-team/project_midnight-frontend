import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

const TrackPageContainer: React.FC = React.memo(() => {
  const {
    isUserTracksLoading,
    setIsUserTracksLoading,
    user,
    getTracksByUser,
    currentPage,
    totalTracks,
    isFavouriteTracksLoading,
    clearUserPlaylist,
    userPlaylist,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userPlaylist,
    }) => ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userPlaylist,
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
      onTrackPage={true}
      tracks={userPlaylist?.tracks!}
      isLoading={isUserTracksLoading}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
    />
  );
});

export default TrackPageContainer;
