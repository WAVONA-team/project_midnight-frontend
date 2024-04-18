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

import navigation from '@/assets/buttons/playerButtons/navigation.svg';

export const Controls: React.FC = React.memo(() => {
  return (
    <div className="lg:gap-3 lg:bottom-1/4 lg:p-4 lg:absolute bg-surface-eerie_black lg:w-full lg:mx-24 flex flex-col-reverse pt-3 lg:backdrop-filter lg:backdrop-blur-lg lg:bg-opacity-80 lg:rounded-lg rounded-t-lg">
      <TimeRange />
      <div className=" items-center flex justify-between px-4">
        <TrackInformation
          name="The Zephyr song"
          artist="Red Hot Chili Peppers"
          provider="YouTube"
          imgUrl={navigation}
        />
        <div className="block lg:hidden">
          <PlayButton />
        </div>
        <div className="hidden lg:block">
          <TrackControlButtons />
        </div>
        <div className=" lg:flex hidden">
          <LoopButton />
          <Dots />
          <VolumeChanger />
        </div>
      </div>
    </div>
  );
});
