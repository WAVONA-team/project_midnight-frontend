import React from 'react';

import { useStore } from '@/store';

import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';

export const TrackHistory: React.FC = React.memo(() => {
  const {
    userSearchHistory,
    updateHistoryOrder,
    changeCurrentTrack,
    playerState,
    changePlayerState,
    currentTrack,
  } = useStore(
    ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
    }) => ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
    }),
  );

  return (
    <div className="mt-8">
      <Container>
        <h2 className="font-notoSans text-on-primary-anti-flash-white">
          История Поиска
        </h2>
      </Container>

      <div className="flex flex-col gap-3 mt-3">
        {userSearchHistory?.map((track) => (
          <TrackInfo
            key={track.id}
            name={track.title}
            artist={track.author as string}
            provider={track.source}
            duration={track.duration}
            imgUrl={track.imgUrl as string}
            isPlay={currentTrack?.url === track.url}
            handlerPlay={() => {
              changeCurrentTrack(track);
              changePlayerState(
                currentTrack?.url !== track.url ? true : !playerState,
              );

              updateHistoryOrder(track.id);
            }}
            handlerModal={() => {}}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackHistory;
