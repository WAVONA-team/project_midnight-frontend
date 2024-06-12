import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

const TracksContainer: React.FC = React.memo(() => {
  const {
    isUserTracksLoading,
    isQueryTracksLoading,
    setIsUserTracksLoading,
    user,
    userTracks,
    getTracksByUser,
    currentPage,
    totalTracks,
    setTracks,
    isFavouriteTracksLoading,
    clearUserTracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentPage,
      setTracks,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserTracks,
    }) => ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentPage,
      setTracks,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserTracks,
    }),
  );

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserTracks();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage, {
        query: '',
        sortType: 'updatedAt',
        order: 'desc',
        isFavourite,
      }).then((tracks) => setTracks(tracks));
    }
  }, [isUserTracksLoading]);

  return (
    <TrackList
      tracks={userTracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
      header="У вас пока нет добавленных треков :("
    />
  );
});

export default TracksContainer;
