import React, { useEffect } from 'react';

import { useStore } from '@/store';
import classNames from 'classnames';

import { TrackAddition } from '@/modules/TrackAddition';
import { TrackHistory } from '@/modules/TrackHistory';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  const {
    user,
    parsedTrack,
    userSearchHistory,
    getUserSearchHistory,
    clearParsedTrack,
  } = useStore(
    ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      clearParsedTrack,
    }) => ({
      user,
      parsedTrack,
      userSearchHistory,
      getUserSearchHistory,
      clearParsedTrack,
    }),
  );

  useEffect(() => {
    getUserSearchHistory(user?.id as string);
  }, [clearParsedTrack]);

  return (
    <div
      className={classNames(
        `
          bg-background-hight
          pt-8
          h-screen
          lg:p-0
          lg:bg-background-desktop
        `,
        {
          'h-full': userSearchHistory && userSearchHistory.length === 5,
          'h-screen': userSearchHistory && userSearchHistory.length < 5,
        },
      )}
    >
      <TrackAddition />

      {!parsedTrack && <TrackHistory />}
    </div>
  );
});
