import React from 'react';

import {
  LoopButton,
  TimeRange,
  TrackControlButtons,
  VolumeChanger,
} from '@/modules/Player/components';
import { Dots } from '@/modules/Player/components/Dots/Dots';
import { TrackInformation } from '@/modules/Player/components/TrackInformation/TrackInformation';

import { PlayButton } from '@/ui/Button';

export const Controls: React.FC = React.memo(() => {
  return (
    <div className="lg:gap-3 lg:bottom-6 lg:p-4 lg:sticky bg-surface-eerie_black lg:mx-6 flex flex-col-reverse pt-3 lg:backdrop-filter lg:backdrop-blur-lg lg:bg-opacity-90 lg:rounded-lg rounded-t-lg">
      <TimeRange />
      <div className=" items-center flex justify-between px-4">
        <TrackInformation/>
        <div className="block lg:hidden">
          <PlayButton />
        </div>
        <div className="hidden lg:block">
          <TrackControlButtons />
        </div>
        <div className=" lg:flex hidden gap-6 ">
          <VolumeChanger />
          <LoopButton />
          <Dots />
        </div>
      </div>
    </div>
  );
});
