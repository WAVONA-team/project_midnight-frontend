import React from 'react';

import { useStore } from '@/store';

import TracksContainer from '@/pages/TracksPage/helpers/TracksContainer.tsx';
import TrackPageControls from '@/pages/TracksPage/modules/TrackPageControls/TrackPageControls';
import TrackPageHeader from '@/pages/TracksPage/modules/TrackPageHeader/TrackPageHeader';

export const TracksPage: React.FC = React.memo(() => {
  const { currentTrack } = useStore(({ currentTrack }) => ({
    currentTrack,
  }));

  return (
    <div
      className={`${currentTrack && 'pb-28'}
        bg-background-hight
        sm:bg-background-default-gradient
        w-full
        h-full
        font-rubik
        text-on-primary-anti-flash-white
      `}
    >
      <TrackPageHeader />
      <div className="sticky pt-1 top-0 bg-background-hight z-10">
        <TrackPageControls />
      </div>
      <TracksContainer />
    </div>
  );
});
