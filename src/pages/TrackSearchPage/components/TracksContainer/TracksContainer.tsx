import React from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

export const TracksContainer: React.FC = React.memo(() => {
  const {
    isQueryTracksLoading,
    setIsQueryTracksLoading,
    userTracks,
    totalTracks,
    query,
  } = useStore(
    ({
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      userTracks,
      totalTracks,
      query,
    }) => ({
      isQueryTracksLoading,
      setIsQueryTracksLoading,
      userTracks,
      totalTracks,
      query,
    }),
  );

  return !isQueryTracksLoading ? (
    <TrackList
      tracks={userTracks.slice(0, 5)}
      isLoading={isQueryTracksLoading}
      setIsLoading={setIsQueryTracksLoading}
      totalTracks={totalTracks}
      header="Трек не найден :("
      headerCondition={!!query.length}
    />
  ) : (
    <Container className="flex justify-center absolute left-1/2 -translate-x-1/2 top-4">
      <Spinner width="w-10" height="h-10" />
    </Container>
  );
});
