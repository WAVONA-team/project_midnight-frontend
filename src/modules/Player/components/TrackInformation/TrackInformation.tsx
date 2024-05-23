import React from 'react';

import { useStore } from '@/store/index';

export const TrackInformation: React.FC = React.memo(() => {
  const { currentTrack } = useStore(({ currentTrack }) => ({
    currentTrack,
  }));
  return (
    <div className="flex gap-4 items-center w-full max-sm:col-span-3">
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
