import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  url: string;
};

const Player: React.FC<Props> = React.memo(({url}) => {
  const [playerState, setPlayerState] = useState(false);
  const [volume, setVolume] = useState(1);

  const Play = () => {
    setPlayerState(true);
  };

  const Pause = () => {
    setPlayerState(false);
  };

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(event.target.value);
    setVolume(newVolume);
  };

  return (
    <div>
      <ReactPlayer
        url={url}
        controls={false}
        volume={volume}
        playing={playerState}
        width={0}
        height={0}
      />
      <button onClick={Play}>Play</button>
      <button onClick={Pause}>Pause</button>
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

export default Player;
