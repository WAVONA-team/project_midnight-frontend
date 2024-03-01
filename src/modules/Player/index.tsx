import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import VolumeChanger from './Components/VolumeChanger';
import PlayButton from './Components/PlayButton';
import SkipButton from './Components/SkipButton';

type Props = {
  tracks: string[];
};

const Player: React.FC<Props> = React.memo(({tracks}) => {
  const [playerState, setPlayerState] = useState(false);
  const [volume, setVolume] = useState(1);
  const [trackNumber, setTrackNumber] = useState(0)
  console.log(trackNumber)
  return (
    <div className=' bg-red-200 flex gap-3'>
      <ReactPlayer
        url={tracks[trackNumber]}
        controls={false}
        volume={volume}
        playing={playerState}
        width={0}
        height={0}
      />
      <VolumeChanger volume={volume} onVolumeChange={setVolume} />
      <SkipButton trackNumber={trackNumber} setTrackNumber={setTrackNumber} tracks={tracks.length}>
        <PlayButton playerState={playerState} setPlayerState={setPlayerState}/>
      </SkipButton>
    </div>
  );
});

export default Player;
