import React from 'react';
import { useStore } from '../../store/index.ts'

const VolumeChanger: React.FC = React.memo(() => {

  const changeVolume = useStore((state) => state.changeVolume)
  const volume = useStore((state) => state.volume)

  const VolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    changeVolume(newVolume);
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
    </div>
  );
});

export default VolumeChanger;
