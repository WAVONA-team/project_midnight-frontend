import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';

import NextTrackIcon from '@/ui/icons/NextTrackIcon/NextTrackIcon';
import BackTrackIcon from '@/ui/icons/BackTrackIcon/BackTrackIcon';
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
    <div className="flex gap-11">
      <button type="button" onClick={NextTrack} className='focus:outline-none'>
        <NextTrackIcon />
      </button>

      <PlayButton />

      <button type="button" onClick={PreviosTrack} className='focus:outline-none'>
        <BackTrackIcon />
      </button>
    </div>
  );
});
