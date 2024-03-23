import React from 'react';

import { useStore } from '@/store/index';

export const VolumeChanger: React.FC = React.memo(() => {
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
    <div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={VolumeChange}
      />
      <button onClick={handleMute}>{volume == 0 ? 'UnMute' : 'Mute'}</button>
    </div>
  );
});
