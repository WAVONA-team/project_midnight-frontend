import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackList } from '@/modules/TrackList';

type Props = {
  isFavourite: boolean;
};

const TracksContainer: React.FC<Props> = React.memo(({ isFavourite }) => {
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
    }),
  );

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage, {
        // TODO Добавить динамичность фильтров
        isFavourite,
        query: '',
        sortType: 'updatedAt',
        order: 'desc',
      }).then((tracks) => setTracks(tracks));
    }
  }, [isUserTracksLoading]);

  return (
    !!userTracks.length && (
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
