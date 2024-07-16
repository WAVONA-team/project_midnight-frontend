import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';
import BackTrackIcon from '@/ui/icons/BackTrackIcon/BackTrackIcon';
import NextTrackIcon from '@/ui/icons/NextTrackIcon/NextTrackIcon';

export const TrackControlButtons: React.FC = React.memo(() => {
  const { userTracks, currentTrack, changeCurrentTrack } = useStore(
    ({ userTracks, currentTrack, changeCurrentTrack }) => ({
      userTracks,
      currentTrack,
      changeCurrentTrack,
    }),
  );

  const NextTrack = () => {
    const currentTrackIndex = userTracks.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const nextTrack = userTracks[currentTrackIndex + 1];

    if (userTracks && nextTrack) {
      return changeCurrentTrack(nextTrack);
    }

    if (userTracks && !nextTrack) {
      return changeCurrentTrack(userTracks[0]);
    }
  };

  const PreviosTrack = () => {
    const currentTrackIndex = userTracks.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const previousTrack = userTracks[currentTrackIndex - 1];

    if (userTracks && previousTrack) {
      return changeCurrentTrack(previousTrack);
    }

    if (userTracks && !previousTrack) {
      return changeCurrentTrack(userTracks[userTracks.length - 1]);
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
