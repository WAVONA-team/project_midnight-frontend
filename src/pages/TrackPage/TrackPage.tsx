import React from 'react';

import { useStore } from '@/store';

import TrackPageContainer from '@/pages/TrackPage/helpers/TrackPageContainer/TrackPageContainer.tsx';

import { createPlayerSlice } from '@/modules/Player/store';

import { Container } from '@/ui/Container';

export const TrackPage: React.FC = React.memo(() => {
  const { currentTrack } = createPlayerSlice();

  const { userPlaylist } = useStore(({ userPlaylist }) => ({
    userPlaylist,
  }));

  return (
    <div className="h-screen flex justify-center items-center bg-background-default-gradient">
      <Container>
        <div className="flex items-center gap-12">
          <div className="">
            <img
              className="w-[430px] h-[430px] object-cover"
              src={currentTrack?.imgUrl as string}
              alt="Track Image"
            />
          </div>
          <div>
            <h1
              className="
                border-b-2
                pb-2
                border-on-secondary-dim-gray
                font-rubik
                text-2xl
                font-semibold
                text-on-primary-anti-flash-white
                tracking-wide"
            >
              Дальше
            </h1>

            <div
              className={`
              ${userPlaylist?.tracks?.length! >= 6 && 'overflow-y-auto'} 
              mt-4 
              ${window.innerHeight <= 1000 ? 'max-h-[550px]' : 'max-h-[800px]'} 
              min-w-[480px]
              `}
            >
              <TrackPageContainer />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
});
