import React, { useRef, useEffect } from 'react';

import { useStore } from './store/index'

import ReactPlayer from 'react-player/lazy';
import PlayerControls from './Components/PlayerControls';

type Props = {
  tracks: string[];
};

const Player: React.FC<Props> = React.memo(({tracks}) => {
  const playerState = useStore((state) => state.playerState)
  const volume = useStore((state) => state.volume)
  const isLoop = useStore((state) => state.isLoop)
  const trackNumber = useStore((state) => state.trackNumber)
  const changeCurrentTime = useStore((state) => state.changeCurrentTime)
  const changeSecondsLoaded = useStore((state) => state.changeSecondsLoaded)
  const changeDuration = useStore((state) => state.changeDuration)
  const playerRef = useRef<ReactPlayer>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (playerRef.current) {
        changeCurrentTime(playerRef.current.getCurrentTime());
        changeSecondsLoaded(playerRef.current.getSecondsLoaded());
        changeDuration(playerRef.current.getDuration());
      }
    }, 1000)
    return () => clearInterval(interval)
  }, [playerState]);

  return (
    <div className='bg-red-200 flex gap-3'>
      <ReactPlayer
        ref={playerRef}
        url={tracks[trackNumber]}
        controls={false}
        volume={volume}
        playing={playerState}
        width={0}
        height={0}
        loop={isLoop}
      />
      <PlayerControls tracks={tracks}/>
    </div>
  );
});

export default Player;
