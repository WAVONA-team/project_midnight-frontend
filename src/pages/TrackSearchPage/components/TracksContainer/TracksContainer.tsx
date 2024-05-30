import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

export const TracksContainer: React.FC = React.memo(() => {
  const {
    isQueryTracksLoading,
    setIsQueryTracksLoading,
    user,
    userTracks,
    getTracksByUser,
    currentPage,
    totalTracks,
    setTracks,
    query,
  } = useStore(
    ({
      user,
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      userTracks,
      getTracksByUser,
      currentPage,
      setTracks,
      totalTracks,
      query,
    }) => ({
      user,
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      userTracks,
      getTracksByUser,
      currentPage,
      setTracks,
      totalTracks,
      query,
    }),
  );

  useEffect(() => {
    if (isQueryTracksLoading) {
      getTracksByUser(user!.id, currentPage, query).then((tracks) =>
        setTracks(tracks),
      );
    }
  }, [isQueryTracksLoading]);

  return (
    !!userTracks.length && (
      <TrackList
        tracks={userTracks}
        isLoading={isQueryTracksLoading}
        setIsLoading={setIsQueryTracksLoading}
        totalTracks={totalTracks}
        header="Трек не найден :("
      />
    )
  );
});
