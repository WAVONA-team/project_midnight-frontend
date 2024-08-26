import React from 'react';
import { useNavigate } from 'react-router-dom';

import { createPlayerSlice } from '@/modules/Player/store';

export const TrackInformation: React.FC = React.memo(() => {
  const { currentTrack } = createPlayerSlice();

  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        if (window.innerWidth < 640) {
          return;
        }

        navigate(`/tracks/${currentTrack!.id}`);
      }}
      className="cursor-pointer flex gap-4 items-center max-sm:w-6/12 w-10/12 lg:w-full"
    >
      <img
        src={currentTrack?.imgUrl as string}
        alt={currentTrack?.title}
        className="w-16 h-16 rounded-md"
      />

      <div className="w-2/3">
        <h3 className="block w-full overflow-hidden text-ellipsis whitespace-nowrap text-sm font-rubik text-on-primary-anti-flash-white">
          {currentTrack?.title}
        </h3>

        <p className="text-secondary-cadet-gray text-xs">
          {currentTrack?.author}
        </p>

        <p className="text-secondary-cadet-gray text-xs flex items-center">
          {currentTrack?.source}
        </p>
      </div>
    </div>
  );
});
