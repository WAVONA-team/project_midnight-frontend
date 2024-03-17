import React , {useRef, useEffect} from 'react';
import { type OnProgressProps } from 'react-player/base';
import ReactPlayer from 'react-player/lazy';

import { useStore } from '@/store/index';

type Props = {
  tracks: string[];
};
export const Playback: React.FC<Props> = React.memo(({ tracks }) => {
  const playerRef = useRef<ReactPlayer>(null);
  const {
    playerState,
    volume,
    isLoop,
    trackNumber,
    seekTo,
    seeking,
    changeCurrentTime,
    changeSecondsLoaded,
    changeDuration,
    changeTracksLenght,
  } = useStore(
    ({
      playerState,
      volume,
      isLoop,
      trackNumber,
      seekTo,
      seeking,
      changeCurrentTime,
      changeSecondsLoaded,
      changeDuration,
      changeTracksLenght,
    }) => ({
      playerState,
      volume,
      isLoop,
      trackNumber,
      seekTo,
      seeking,
      changeCurrentTime,
      changeSecondsLoaded,
      changeDuration,
      changeTracksLenght,
    }),
  );
  useEffect(() => {
    console.log('In useEffect')
    if (seeking) {
      playerRef.current?.seekTo(seekTo, 'fraction');
      console.log('seeking');
      console.log('seekto', seekTo);
    }
  }, [seeking]);
  const handleProgress = (state: OnProgressProps) => {
    console.log(seeking);
    if (!seeking) {
      changeCurrentTime(state.played);
      changeSecondsLoaded(state.loadedSeconds);
      console.log('In condition');
    }
  };
  const handleOnPlay = () => {
    changeTracksLenght(tracks.length);
  };
  const handleOnDuration = (state: number) => {
    changeDuration(state);
    console.log('Duration', state);
  };
  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={tracks[trackNumber]}
        controls={false}
        volume={volume}
        playing={playerState}
        width={0}
        height={0}
        loop={isLoop}
        onPlay={handleOnPlay}
        onSeek={(e) => console.log('onSeek', e)}
        onDuration={handleOnDuration}
        onProgress={handleProgress}
      />
    </div>
  );
});
