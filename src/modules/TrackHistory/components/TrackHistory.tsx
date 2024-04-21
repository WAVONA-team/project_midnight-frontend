import React from 'react';

import { useStore } from '@/store';

import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';

export const TrackHistory: React.FC = React.memo(() => {
  const { userSearchHistory, setParsedTrack, updateHistoryOrder } = useStore(
    ({ userSearchHistory, setParsedTrack, updateHistoryOrder }) => ({
      userSearchHistory,
      setParsedTrack,
      updateHistoryOrder,
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
            artist={track.author}
            provider={track.source}
            duration={track.duration}
            imgUrl={track.imgUrl as string}
            isPlay={false}
            handlerPlay={() =>
              updateHistoryOrder(track.id).then(() => setParsedTrack(track))
            }
            handlerModal={() => {}}
          />
        ))}
      </div>
    </div>
  );
});

export default TrackHistory;
