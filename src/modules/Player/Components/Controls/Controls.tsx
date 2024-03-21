import React from 'react';

import {
  LoopButton,
  TimeRange,
  TrackControlButtons,
  TrackInfo,
  VolumeChanger,
} from '@/modules/Player/Components/index';

export const Controls: React.FC = React.memo(() => {
  return (
    <div className="bg-error-turkey-red flex gap-3">
      <VolumeChanger />

      <TrackControlButtons />

      <TimeRange />

      <TrackInfo
        name="The Zephyr song"
        artist="Red Hot Chili Peppers"
        provider="YouTube"
      />

      <LoopButton />
    </div>
  );
});
