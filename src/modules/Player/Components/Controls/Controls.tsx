import React from 'react';

import {
  LoopButton,
  PlayButton,
  SkipButton,
  TimeRange,
  TrackInfo,
  VolumeChanger,
} from '@/modules/Player/Components/index';


export const Controls: React.FC = React.memo(() => {
  return (
    <div className="bg-red-200 flex gap-3">
      <VolumeChanger />
      <SkipButton>
        <PlayButton />
      </SkipButton>
      <TimeRange/>
      <TrackInfo
        name="The Zephyr song"
        artist="Red Hot Chili Peppers"
        provider="YouTube"
      />
      <LoopButton />
    </div>
  );
});
