/* eslint-disable indent */
import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

import { TrackList } from '@/modules/TrackList';

import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

const TracksContainer: React.FC = React.memo(() => {
  const {
    user,
    isUserTracksLoading,
    isQueryTracksLoading,
    setIsUserTracksLoading,
    userPlaylist,
    getTracksByUser,
    currentPage,
    totalTracks,
    isFavouriteTracksLoading,
    clearUserPlaylist,
    setTracks,
    tracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      userPlaylist,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      setTracks,
      tracks,
    }) => ({
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      userPlaylist,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      setTracks,
      tracks,
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
      }).then((playlist) => setTracks(playlist.tracks!));
    }
  }, [isUserTracksLoading, isFiltering]);

  return (isUserTracksLoading || isQueryTracksLoading) &&
    !userPlaylist?.tracks?.length ? (
    <Container className="flex justify-center">
      <Spinner width="w-10" height="h-10" />
    </Container>
  ) : (
    <TrackList
      tracks={tracks}
      isLoading={isUserTracksLoading || isQueryTracksLoading}
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
    />
  );
});

export default TracksContainer;
