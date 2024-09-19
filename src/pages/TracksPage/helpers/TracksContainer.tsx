/* eslint-disable react-hooks/exhaustive-deps */
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
    isFiltering,
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
      isFiltering,
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
      isFiltering,
    }),
  );

  const { order, query, sortType } = tracksSearchPageSlice(
    ({ query, order, sortType }) => ({
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
      onTrackPage={false}
      tracks={userTracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading || isFiltering}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
      headerCondition={!!query.length}
      onMainPage
    />
  );
});

export default TracksContainer;
