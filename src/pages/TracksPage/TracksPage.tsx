import React from 'react';

import { useStore } from '@/store';

import TracksContainer from '@/pages/TracksPage/helpers/TracksContainer.tsx';
// import { useNavigate } from 'react-router-dom';
import TrackPageControls from '@/pages/TracksPage/modules/TrackPageControls/TrackPageControls';
import TrackPageHeader from '@/pages/TracksPage/modules/TrackPageHeader/TrackPageHeader';

// import { MainButton } from '@/ui/Button';

export const TracksPage: React.FC = React.memo(() => {
  // const navigate = useNavigate();
  const { currentTrack, isFavouriteTracksLoading } = useStore(
    ({ currentTrack, isFavouriteTracksLoading }) => ({
      currentTrack,
      isFavouriteTracksLoading,
    }),
  );

  return (
    <div
      className={`${currentTrack && 'pb-28'}
        bg-background-hight
        sm:bg-background-default-gradient
        w-full
        h-full
        font-rubik
        text-on-primary-anti-flash-white
      `}
    >
      <TrackPageHeader />
      <div className="sticky pt-1 top-0 bg-background-hight z-10">
        <TrackPageControls
          title={!isFavouriteTracksLoading ? 'Все треки' : 'Избранные'}
        />
      </div>
      <TracksContainer />
      {/*<div>*/}
      {/*  <MainButton*/}
      {/*    className="sm:max-w-[285px] z-0"*/}
      {/*    title="Добавить"*/}
      {/*    handler={() => navigate('/tracks/new')}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
});
