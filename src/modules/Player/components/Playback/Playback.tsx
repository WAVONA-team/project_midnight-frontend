import React, { useEffect, useRef } from 'react';

import ReactPlayer from '@/lib/ReactPlayer';
import { OnProgressProps } from '@/lib/ReactPlayer/base';

import { useStore } from '@/store/index';

export const Playback: React.FC = React.memo(() => {
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
    changeSeeking,
    changeTrackNumber,
    changePlayerState,
    tracks,
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
      changeSeeking,
      changeTrackNumber,
      changePlayerState,
      tracks,
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
      changeSeeking,
      changeTrackNumber,
      changePlayerState,
      tracks,
    }),
  );

  useEffect(() => {
    if (seeking) {
      playerRef.current?.seekTo(seekTo);
    }
  }, [changeSeeking, seeking, seekTo]);

  const handleProgress = (state: OnProgressProps) => {
    if (!seeking) {
      changeCurrentTime(state.played);
      changeSecondsLoaded(state.loadedSeconds);
    }
  };

  const handleOnPlay = () => {
    changeTracksLenght(tracks.length);
  };

  const handleOnDuration = (state: number) => {
    changeDuration(state);
  };

  const handlerOnEnded = () => {
    if (tracks[trackNumber + 1]) {
      changeTrackNumber(trackNumber + 1);
    } else {
      changePlayerState(false);
    }
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
        onDuration={handleOnDuration}
        onProgress={handleProgress}
        onEnded={handlerOnEnded}
      />
    </div>
  );
});
