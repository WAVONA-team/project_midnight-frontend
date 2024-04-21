import React from 'react';

import {
  LoopButton,
  TimeRange,
  TrackControlButtons,
  VolumeChanger,
} from '@/modules/Player/components';

// import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const Controls: React.FC = React.memo(() => {
  return (
    <div className="bg-error-turkey-red flex gap-3">
      <VolumeChanger />

      <TrackControlButtons />

      <TimeRange />

      {/* <TrackInfo
        name="The Zephyr song"
        artist="Red Hot Chili Peppers"
        provider="YouTube"
      /> */}

      <LoopButton />
    </div>
  );
});
