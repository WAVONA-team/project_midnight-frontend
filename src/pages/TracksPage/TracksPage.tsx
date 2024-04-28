import React from 'react';

import { useStore } from '@/store';

// import { useNavigate } from 'react-router-dom';
import TrackPageControls from '@/pages/TracksPage/components/TrackPageControls/TrackPageControls';
import TrackPageHeader from '@/pages/TracksPage/components/TrackPageHeader/TrackPageHeader';
import TracksList from '@/pages/TracksPage/components/TracksList/TracksList';

// import { MainButton } from '@/ui/Button';

export const TracksPage: React.FC = React.memo(() => {
  // const navigate = useNavigate();
  const { currentTrack } = useStore(({ currentTrack }) => ({
    currentTrack,
  }));

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
        <TrackPageControls />
      </div>
      <TracksList />
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
