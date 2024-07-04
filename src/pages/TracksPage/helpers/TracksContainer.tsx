import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

import { TrackList } from '@/modules/TrackList';

const TracksContainer: React.FC = React.memo(() => {
  const {
    user,
    isUserTracksLoading,
    isQueryTracksLoading,
    setIsUserTracksLoading,
    userTracks,
    getTracksByUser,
    currentPage,
    setTracks,
    totalTracks,
    order,
    query,
    sortType,
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
      isFiltering,
      query,
      order,
      sortType,
    }),
  );
  const { order, query, sortType, isFiltering, setIsFiltering } =
    tracksSearchPageSlice(
      ({ query, isFiltering, order, sortType, setIsFiltering }) => ({
        isFiltering,
        query,
        order,
        sortType,
        setIsFiltering,
      }),
    );

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserTracks();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading || isFiltering) {
      getTracksByUser(user!.id, currentPage, {
        query: query,
        order: order,
        sortType: sortType,
        isFavourite,
      })
        .then((tracks) => setTracks(tracks))
        .finally(() => setIsFiltering(false));
    }
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
