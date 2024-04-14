import React from 'react';

import { useStore } from '@/store';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const TrackHistory: React.FC = React.memo(() => {
  const {
    playerState,
    trackNumber,
    userSearchHistory,
  } = useStore(
    ({
      user,
      playerState,
      trackNumber,
      userSearchHistory,
    }) => ({
      user,
      playerState,
      trackNumber,
      userSearchHistory,
    }),
  );

  return (
    <div className="mt-8">
      <h2 className="font-notoSans text-on-primary-anti-flash-white">
        История Поиска
      </h2>

      <div className="flex flex-col gap-3">
        {userSearchHistory?.map((track) => (
          <TrackInfo
            key={track.id}
            name={track.title}
            artist={track.author}
            provider={track.source}
            duration={track.duration}
            imgUrl={track.imgUrl as string}
            trackIndexPlay={trackNumber}
            trackIndex={trackNumber}
            isPlay={playerState}
            handlerPlay={() => {}}
            handlerModal={() => {}}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackHistory;
