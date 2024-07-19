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
    currentTrack,
    seekTo,
    seeking,
    changeCurrentTime,
    changeSecondsLoaded,
    changeDuration,
    changeSeeking,
    changeCurrentTrack,
    changePlayerState,
    userTracks,
  } = useStore(
    ({
      playerState,
      volume,
      isLoop,
      currentTrack,
      seekTo,
      seeking,
      changeCurrentTime,
      changeSecondsLoaded,
      changeDuration,
      changeSeeking,
      changeCurrentTrack,
      changePlayerState,
      userTracks,
    }) => ({
      playerState,
      volume,
      isLoop,
      currentTrack,
      seekTo,
      seeking,
      changeCurrentTime,
      changeSecondsLoaded,
      changeDuration,
      changeSeeking,
      changeCurrentTrack,
      changePlayerState,
      userTracks,
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

  const handleOnDuration = (state: number) => {
    changeDuration(state);
  };

  const handlerOnEnded = () => {
    const currentTrackIndex = userTracks.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    if (userTracks && userTracks[currentTrackIndex + 1]) {
      changeCurrentTrack(userTracks[currentTrackIndex + 1]);
    } else {
      changePlayerState(false);
      changeCurrentTrack(null);
    }
  };

  return (
    <ReactPlayer
      style={{
        position: 'absolute',
      }}
      ref={playerRef}
      url={currentTrack?.url}
      controls={false}
      volume={volume}
      playing={playerState}
      width={0}
      height={0}
      loop={isLoop}
      onDuration={handleOnDuration}
      onProgress={handleProgress}
      onEnded={handlerOnEnded}
    />
  );
});
