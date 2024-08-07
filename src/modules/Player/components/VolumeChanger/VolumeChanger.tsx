import React, { useState } from 'react';

import classNames from 'classnames';

import { createPlayerSlice } from '@/modules/Player/store';

import { RangeInput } from '@/ui/Input';
import VolumeIcon from '@/ui/icons/VolumeIcon/VolumeIcon';

export const VolumeChanger: React.FC = React.memo(() => {
  const [showInput, setShowInput] = useState(false);
  const { volume, changeVolume } = createPlayerSlice();

  const VolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    changeVolume(newVolume);
  };

  const handleMute = () => {
    volume === 0 ? changeVolume(0.7) : changeVolume(0);
  };

  return (
    <div
      className="flex items-center h-6 relative"
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
    >
      <RangeInput
        min={0}
        max={1}
        step={0.01}
        value={volume}
        multiplier={100}
        onChange={VolumeChange}
        className={classNames(
          '!absolute bg-secondary-cadet-gray right-8 h-[2px]',
          {
            visible: showInput,
            invisible: !showInput,
          },
        )}
        inputClassName="[&::-webkit-slider-thumb]:bg-on-primary-anti-flash-white"
        rangeColor="bg-on-primary-anti-flash-white"
      />

      <button
        onClick={handleMute}
        type="button"
        className="focus:outline-none w-6 h-6 absolute right-0"
      >
        <VolumeIcon />
      </button>
    </div>
  );
});
