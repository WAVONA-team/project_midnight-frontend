import React, { useEffect } from 'react';

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
      currentPage,
      setTracks,
      totalTracks,
    }) => ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentPage,
      setTracks,
      totalTracks,
    }),
  );

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
      setIsLoading={setIsUserTracksLoading}
      totalTracks={totalTracks}
      header="У вас пока нет добавленных треков :("
    />
  );
});

export default TracksContainer;
