import React from 'react';

// import { useNavigate } from 'react-router-dom';
import TrackPageControls from '@/pages/TracksPage/components/TrackPageControls/TrackPageControls.tsx';
import TrackPageHeader from '@/pages/TracksPage/components/TrackPageHeader/TrackPageHeader.tsx';
import TrackPageTracks from '@/pages/TracksPage/components/TrackPageTracks/TrackPageTracks.tsx';

// import { MainButton } from '@/ui/Button';
import { Container } from '@/ui/Container';

export const TracksPage: React.FC = React.memo(() => {
  // const navigate = useNavigate();

  return (
    <Container
      className="
        p-6
        lg:px-20
        lg:py-12
        bg-background-hight
        sm:bg-background-default-gradient
        w-full
      "
    >
      <div
        className="
          font-rubik
          text-on-primary-anti-flash-white
          h-dvh
        "
      >
        <TrackPageHeader />
        <TrackPageControls />
        <TrackPageTracks />
        {/*<div>*/}
        {/*  <MainButton*/}
        {/*    className="sm:max-w-[285px] z-0"*/}
        {/*    title="Добавить"*/}
        {/*    handler={() => navigate('/tracks/new')}*/}
        {/*  />*/}
        {/*</div>*/}
      </div>
    </Container>
  );
});
