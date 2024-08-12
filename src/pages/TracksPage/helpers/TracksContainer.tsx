/* eslint-disable indent */
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

  const { order, query, sortType, isFiltering } = tracksSearchPageSlice(
    ({ query, isFiltering, order, sortType }) => ({
      isFiltering,
      query,
      order,
      sortType,
    }),
  );

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserPlaylist();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading || isFiltering) {
      getTracksByUser(user!.id, currentPage, {
        query: query,
        order: order,
        sortType: sortType.type,
        isFavourite,
      });
    }
  }, [isUserTracksLoading, isFiltering]);

  return (
    <TrackList
      tracks={userTracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading || isFiltering}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
    />
  );
});

export default TracksContainer;
