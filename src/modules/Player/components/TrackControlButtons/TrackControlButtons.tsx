import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';
import BackTrackIcon from '@/ui/icons/BackTrackIcon/BackTrackIcon';
import NextTrackIcon from '@/ui/icons/NextTrackIcon/NextTrackIcon';

export const TrackControlButtons: React.FC = React.memo(() => {
  const { tracks, currentTrack, changeCurrentTrack } = useStore(
    ({ tracks, currentTrack, changeCurrentTrack }) => ({
      tracks,
      currentTrack,
      changeCurrentTrack,
    }),
  );

  const NextTrack = async () => {
    const currentTrackIndex = tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const nextTrack = tracks![currentTrackIndex + 1];

    if (tracks && nextTrack) {
      return await changeCurrentTrack(nextTrack);
    }

    if (tracks && !nextTrack) {
      return await changeCurrentTrack(tracks[0]);
    }
  };

  const PreviosTrack = async () => {
    const currentTrackIndex = tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const previousTrack = tracks![currentTrackIndex - 1];

    if (tracks && previousTrack) {
      return await changeCurrentTrack(previousTrack);
    }

    if (tracks && !previousTrack) {
      return await changeCurrentTrack(tracks[tracks.length - 1]);
    }
  };

  return (
    <div className="flex gap-11">
      <button
        type="button"
        onClick={PreviosTrack}
        className="focus:outline-none"
      >
        <BackTrackIcon />
      </button>

      <PlayButton />

      <button type="button" onClick={NextTrack} className="focus:outline-none">
        <NextTrackIcon />
      </button>
    </div>
  );
});
