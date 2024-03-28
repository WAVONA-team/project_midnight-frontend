import React from 'react';

import {
  LoopButton,
  Playback,
  TimeRange,
  TrackControlButtons,
  VolumeChanger,
} from '@/modules/Player/components';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  return (
    <div className="w-full h-screen bg-[black]">
      <h1>CreateTrackPage</h1>
      <TrackInfo />
      <LoopButton></LoopButton>
      {/* <Playback></Playback> */}
      <TimeRange></TimeRange>
      <TrackControlButtons></TrackControlButtons>
      <VolumeChanger></VolumeChanger>
    </div>
  );
});
