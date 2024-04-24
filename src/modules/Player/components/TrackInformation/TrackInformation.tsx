import React from 'react';

import { useStore } from '@/store/index';

export const TrackInformation: React.FC = React.memo(() => {
  const { currentTrack } = useStore(({ currentTrack }) => ({
    currentTrack,
  }));
  return (
    <div className=" flex">
      <img
        src={currentTrack?.imgUrl ?? ''}
        alt={currentTrack?.title}
        className="w-16 h-16 rounded-md"
      />

      <div className="">
        <h3 className="flex text-sm font-rubik text-on-primary-anti-flash-white truncate min-w-48">
          {currentTrack?.title}
        </h3>

        <p className="text-secondary-cadet-gray text-xs">
          {currentTrack?.author}
        </p>

        <p className=" text-secondary-cadet-gray text-xs flex items-center">
          {currentTrack?.source}
        </p>
      </div>
    </div>
  );
});
