import React from 'react';

import {
  Dots,
  IsFavouriteButton,
  LoopButton,
  TimeRange,
  TrackControlButtons,
  TrackInformation,
  VolumeChanger,
} from '@/modules/Player/components';

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
        z-10
        w-full
        py-3
        flex
        flex-col-reverse
        lg:block
        bg-surface-eerie_black
        backdrop-filter
        backdrop-blur-lg
        bg-opacity-70
        lg:rounded-lg
        lg:w-11/12
        lg:left-1/2
        lg:-translate-x-1/2
        rounded-t-lg
      "
    >
      <TimeRange />

      <div className="flex justify-between gap-x-5 lg:grid lg:grid-cols-3 justify-items-center items-center mt-3 px-4 lg:px-0">
        <TrackInformation />

        <div className="lg:hidden flex gap-6 items-center">
          <IsFavouriteButton />
          <PlayButton className="w-10 h-10" />
        </div>

        <div className="hidden lg:block">
          <TrackControlButtons />
        </div>

        <div className="lg:grid grid-cols-[1fr_24px_24px_24px] items-center w-full hidden gap-6">
          <VolumeChanger />
          <IsFavouriteButton />
          <LoopButton />
          <Dots />
        </div>
      </div>
    </div>
  );
});
