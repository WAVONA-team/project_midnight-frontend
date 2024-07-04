import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

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
      clearUserTracks,
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
      })
        .then((tracks) => setTracks(tracks))
        .finally(() => setIsFiltering(false));
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
