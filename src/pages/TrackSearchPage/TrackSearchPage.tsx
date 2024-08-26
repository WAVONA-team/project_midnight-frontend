import React from 'react';

import { Search, TracksContainer } from '@/pages/TrackSearchPage/components';

import { Container } from '@/ui/Container';

export const TrackSearchPage: React.FC = React.memo(() => {
  return (
    <div
      className="
        bg-background-hight
        sm:bg-background-default-gradient
        w-full
        h-full
        font-rubik
        text-on-primary-anti-flash-white
      "
    >
      <Container>
        <Search />
      </Container>

      <div className="mt-4 relative">
        <TracksContainer />
      </div>
    </div>
  );
});
