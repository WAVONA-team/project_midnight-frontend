import React, { useState } from 'react';

import classNames from 'classnames';

import { useStore } from '@/store/index';

import { RangeInput } from '@/ui/Input';
import VolumeIcon from '@/ui/icons/VolumeIcon/VolumeIcon';

export const VolumeChanger: React.FC = React.memo(() => {
  const [showInput, setShowInput] = useState(false);
  const { volume, changeVolume } = useStore(({ volume, changeVolume }) => ({
    volume,
    changeVolume,
  }));
  const VolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    changeVolume(newVolume);
  };
  const handleMute = () => {
    volume === 0 ? changeVolume(1) : changeVolume(0);
  };
  return (
    <div
      className="flex items-center gap-6"
      onMouseEnter={() => setShowInput(true)}
      onMouseLeave={() => setShowInput(false)}
    >
      <RangeInput
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={VolumeChange}
        multiplier={100}
        className={
          ' bg-secondary-cadet-gray h-[2px]' +
          classNames({
            visible: showInput,
            invisible: !showInput,
          })
        }
        inputClassName='[&::-webkit-slider-thumb]:bg-on-primary-anti-flash-white'
        rangeColor='bg-on-primary-anti-flash-white'
      />
      <button onClick={handleMute} className=" focus:outline-none">
        <VolumeIcon />
      </button>
    </div>
  );
});
