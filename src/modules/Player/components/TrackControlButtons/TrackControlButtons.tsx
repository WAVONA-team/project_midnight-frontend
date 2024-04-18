import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';

import back from '@/assets/buttons/playerButtons/back.svg';
import next from '@/assets/buttons/playerButtons/next.svg';

export const TrackControlButtons: React.FC = React.memo(() => {
  const { tracksLenght, changeTrackNumber, trackNumber } = useStore(
    ({ tracksLenght, changeTrackNumber, trackNumber }) => ({
      tracksLenght,
      changeTrackNumber,
      trackNumber,
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

  return (
    <div className="flex gap-2">
      <button type="button" onClick={NextTrack}>
        <img src={next} alt="" />
      </button>

      <PlayButton />

      <button type="button" onClick={PreviosTrack}>
        <img src={back} alt="" />
      </button>
    </div>
  );
});
