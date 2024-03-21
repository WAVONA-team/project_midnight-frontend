import React from 'react';

import { useStore } from '@/store/index';

export const TrackControlButtons: React.FC = React.memo(() => {
  const {
    tracksLenght,
    changeTrackNumber,
    trackNumber,
    playerState,
    changePlayerState,
  } = useStore(
    ({
      tracksLenght,
      changeTrackNumber,
      trackNumber,
      playerState,
      changePlayerState,
    }) => ({
      tracksLenght,
      changeTrackNumber,
      trackNumber,
      playerState,
      changePlayerState,
    }),
  );

  const NextTrack = () => {
    if (trackNumber === tracksLenght - 1) {
      return changeTrackNumber(0);
    } else {
      changeTrackNumber(trackNumber + 1);
    }
  };

  const PreviosTrack = () => {
    if (trackNumber === 0) {
      return changeTrackNumber(trackNumber);
    } else {
      changeTrackNumber(trackNumber - 1);
    }
  };

  const changeState = () => {
    changePlayerState(!playerState);
  };

  return (
    <div className="flex gap-2">
      <button type="button" onClick={NextTrack}>
        Next
      </button>

      <button type="button" onClick={changeState}>
        {playerState ? 'Pause' : 'Play'}
      </button>

      <button type="button" onClick={PreviosTrack}>
        Previos
      </button>
    </div>
  );
});
