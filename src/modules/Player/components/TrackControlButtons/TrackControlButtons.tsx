import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';

import NextTrackIcon from '@/ui/icons/NextTrackIcon/NextTrackIcon';
import BackTrackIcon from '@/ui/icons/BackTrackIcon/BackTrackIcon';
export const TrackControlButtons: React.FC = React.memo(() => {
  const { tracks, currentTrack, changeCurrentTrack } = useStore(
    ({ tracks, currentTrack, changeCurrentTrack }) => ({
      tracks,
      currentTrack,
      changeCurrentTrack,
    }),
  );

  const NextTrack = () => {
    const currentTrackIndex = tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const nextTrack = tracks![currentTrackIndex + 1];

    if (tracks && nextTrack) {
      return changeCurrentTrack(nextTrack);
    }

    if (tracks && !nextTrack) {
      return changeCurrentTrack(tracks[0]);
    }
  };

  const PreviosTrack = () => {
    const currentTrackIndex = tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const previousTrack = tracks![currentTrackIndex - 1];

    if (tracks && previousTrack) {
      return changeCurrentTrack(previousTrack);
    }

    if (tracks && !previousTrack) {
      return changeCurrentTrack(tracks[tracks.length - 1]);
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
