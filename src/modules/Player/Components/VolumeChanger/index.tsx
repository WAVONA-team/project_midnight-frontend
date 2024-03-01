// VolumeChanger.tsx
import React from 'react';

type Props = {
  volume: number;
  onVolumeChange: React.Dispatch<React.SetStateAction<number>>;
};

const VolumeChanger: React.FC<Props> = React.memo(({volume, onVolumeChange}) => {
  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    onVolumeChange(newVolume);
  };

  return (
    <div>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolumeChange}
      />
    </div>
  );
});

export default VolumeChanger;
