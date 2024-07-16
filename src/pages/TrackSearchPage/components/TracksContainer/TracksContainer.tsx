import React from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

export const TracksContainer: React.FC = React.memo(() => {
  const {
    userTracks,
    isQueryTracksLoading,
    setIsQueryTracksLoading,
    totalTracks,
    query,
  } = useStore(
    ({
      userTracks,
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      totalTracks,
      query,
    }) => ({
      userTracks,
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      totalTracks,
      query,
    }),
  );

  return isQueryTracksLoading ? (
    <Container className="flex justify-center absolute left-1/2 -translate-x-1/2 top-4">
      <Spinner width="w-10" height="h-10" />
    </Container>
  ) : (
    <TrackList
      tracks={userTracks}
      isLoading={isQueryTracksLoading}
      setIsLoading={setIsQueryTracksLoading}
      totalTracks={totalTracks}
      headerCondition={!!query.length}
    />
  );
});
