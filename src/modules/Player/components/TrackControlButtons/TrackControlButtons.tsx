import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';

import back from '@/assets/buttons/playerButtons/back.svg';
import next from '@/assets/buttons/playerButtons/next.svg';

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
