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
    order,
    query,
    sortType,
    setTracks,
    clearUserTracks,
    isFiltering,
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
      clearUserTracks,
      query,
      isFiltering,
      order,
      sortType,
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
      clearUserTracks,
      isFiltering,
      query,
      order,
      sortType,
    }),
  );

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserTracks();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading || isFiltering) {
      getTracksByUser(user!.id, currentPage, {query:query, order: order, sortType: sortType}).then((tracks) =>
        setTracks(tracks),
      );
    }
  }, [isUserTracksLoading, isFiltering]);

  return (
    (!isUserTracksLoading || !isQueryTracksLoading) && (
      <TrackList
        tracks={userTracks}
        isLoading={isUserTracksLoading || isQueryTracksLoading}
        setIsLoading={setIsUserTracksLoading}
        totalTracks={totalTracks}
        header="У вас пока нет добавленных треков :("
      />
    )
  );
});

export default TracksContainer;
