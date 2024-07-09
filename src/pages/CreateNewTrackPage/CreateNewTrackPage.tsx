import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { TrackAddition } from '@/modules/TrackAddition';
import { TrackHistory } from '@/modules/TrackHistory';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  const {
    user,
    parsedTrack,
    userSearchHistory,
    getUserSearchHistory,
    isParsedTrackLoading,
    currentTrack,
  } = useStore(
    ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      isParsedTrackLoading,
      currentTrack,
    }) => ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      isParsedTrackLoading,
      currentTrack,
    }),
  );

  useEffect(() => {
    getUserSearchHistory(user?.id as string);
  }, [parsedTrack]);

  return (
    <div
      className={`
        ${currentTrack && 'pb-28'}
        bg-background-hight
        pt-8
        h-full
        overflow-auto
        lg:p-0
        lg:bg-background-desktop
      `}
    >
      <TrackAddition />

      {!parsedTrack && !isParsedTrackLoading && userSearchHistory?.length && (
        <TrackHistory />
      )}
    </div>
  );
});
