import React, { useCallback, useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

const TracksContainer: React.FC = React.memo(() => {
  const {
    isUserTracksLoading,
    setIsUserTracksLoading,
    user,
    userTracks,
    getTracksByUser,
    currentPage,
    totalTracks,
    setTracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
      totalTracks,
    }) => ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
      totalTracks,
    }),
  );

  const scrollHandler = useCallback(() => {
    if (
      document.documentElement.scrollHeight -
        (document.documentElement.scrollTop + window.innerHeight) <
        100 &&
      userTracks.length < totalTracks
    ) {
      setIsUserTracksLoading(true);
    }
  }, [userTracks, totalTracks]);

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage).then((tracks) =>
        setTracks(tracks),
      );
    }
  }, [isUserTracksLoading]);

  return (
    <TrackList
      tracks={userTracks}
      isLoading={isUserTracksLoading}
      header="У вас пока нет добавленных треков :("
      handler={scrollHandler}
    />
  );
});

export default TracksContainer;
