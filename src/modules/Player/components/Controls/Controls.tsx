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
    <div
      className="
        gap-3
        lg:bottom-6
        lg:p-4
        absolute
        bottom-0
        w-full
        py-3
        flex
        flex-col-reverse
        lg:block
        bg-surface-eerie_black
        lg:backdrop-filter
        lg:backdrop-blur-lg
        lg:bg-opacity-90
        lg:rounded-lg
        lg:w-11/12
        lg:left-1/2
        lg:-translate-x-1/2
        rounded-t-lg
      "
    >
      <TimeRange />

      <div className="grid grid-cols-[1fr_min-content] lg:grid-cols-3 justify-items-center items-center mt-3 px-4 lg:px-0">
        <TrackInformation />

        <div className="block lg:hidden">
          <PlayButton />
        </div>

        <div className="hidden lg:block">
          <TrackControlButtons />
        </div>

        <div className="lg:flex justify-end w-full hidden gap-6">
          <VolumeChanger />
          <LoopButton />
          <Dots />
        </div>
      </div>
    </div>
  );
});
