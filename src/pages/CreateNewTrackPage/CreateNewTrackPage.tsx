import React, { useEffect } from 'react';

import { useStore } from '@/store';

import { createPlayerSlice } from '@/modules/Player/store';
import { TrackAddition } from '@/modules/TrackAddition';
import { TrackHistory } from '@/modules/TrackHistory';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  const { currentTrack } = createPlayerSlice();

  const {
    user,
    parsedTrack,
    userSearchHistory,
    getUserSearchHistory,
    isParsedTrackLoading,
  } = useStore(
    ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      isParsedTrackLoading,
    }) => ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      isParsedTrackLoading,
    }),
  );

  useEffect(() => {
    getUserSearchHistory(user?.id as string);
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
