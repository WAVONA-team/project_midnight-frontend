import React from 'react';

import TrackPageHeader from '@/pages/TracksPage/TrackPageHeader/TrackPageHeader.tsx';
import TrackPageTracks from '@/pages/TracksPage/TrackPageTracks/TrackPageTracks.tsx';
import TrackPagesControls from '@/pages/TracksPage/TrackPagesControls/TrackPagesControls.tsx';

import { MainButton } from '@/ui/Button';
import { Container } from '@/ui/Container';

export const TracksPage: React.FC = React.memo(() => {
  return (
    <Container
      className="
        p-6
        md:px-20
        md:py-12
        bg-background-hight
        sm:bg-background-default-gradient
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
        <TrackPagesControls />
        <TrackPageTracks />
        <div>
          <MainButton
            className="sm:max-w-[285px]"
            title="Добавить"
            handler={() => {}}
          />
        </div>
      </div>
    </Container>
  );
});
