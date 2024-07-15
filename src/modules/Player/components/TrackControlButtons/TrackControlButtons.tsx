import React from 'react';

import { useStore } from '@/store/index';

import { PlayButton } from '@/ui/Button';
import BackTrackIcon from '@/ui/icons/BackTrackIcon/BackTrackIcon';
import NextTrackIcon from '@/ui/icons/NextTrackIcon/NextTrackIcon';

export const TrackControlButtons: React.FC = React.memo(() => {
  const { userPlaylist, currentTrack, changeCurrentTrack } = useStore(
    ({ userPlaylist, currentTrack, changeCurrentTrack }) => ({
      userPlaylist,
      currentTrack,
      changeCurrentTrack,
    }),
  );

  const NextTrack = () => {
    const currentTrackIndex = userPlaylist?.tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const nextTrack = userPlaylist?.tracks![currentTrackIndex + 1];

    if (userPlaylist?.tracks && nextTrack) {
      return changeCurrentTrack(nextTrack);
    }

    if (userPlaylist?.tracks && !nextTrack) {
      return changeCurrentTrack(userPlaylist.tracks[0]);
    }
  };

  const PreviosTrack = () => {
    const currentTrackIndex = userPlaylist?.tracks?.findIndex(
      (track) => track.url === currentTrack?.url,
    ) as number;

    const previousTrack = userPlaylist?.tracks![currentTrackIndex - 1];

    if (userPlaylist?.tracks && previousTrack) {
      return changeCurrentTrack(previousTrack);
    }

    if (userPlaylist?.tracks && !previousTrack) {
      return changeCurrentTrack(
        userPlaylist.tracks[userPlaylist.tracks.length - 1],
      );
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
