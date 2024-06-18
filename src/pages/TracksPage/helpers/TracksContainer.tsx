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
    isFavouriteTracksLoading,
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
      isFavouriteTracksLoading,
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
      isFavouriteTracksLoading,
      clearUserTracks,
      isFiltering,
      query,
      order,
      sortType,
    }),
  );

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserTracks();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading || isFiltering) {
      getTracksByUser(user!.id, currentPage, {query:query, order: order, sortType: sortType}).then((tracks) =>
    if (isUserTracksLoading || isFiltering) {
      getTracksByUser(user!.id, currentPage, {query:query, order: order, sortType: sortType}).then((tracks) =>
        setTracks(tracks),
      );
    }
  }, [isUserTracksLoading, isFiltering]);
  }, [isUserTracksLoading, isFiltering]);

  return (
    <TrackList
      tracks={userTracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
      header={
        query.length
          ? 'Трек не найден :('
          : 'У вас пока нет добавленных треков :('
      }
    />
  );
});

export default TracksContainer;
