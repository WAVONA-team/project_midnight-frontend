import React from 'react';

import TrackPageDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageDropdown/TrackPageDropdown.tsx';

import { ShuffleButton } from '@/ui/Button';
import { Container } from '@/ui/Container';

const TrackPageControls: React.FC = React.memo(() => {
  return (
    <Container
      className="
        flex
        flex-col
        mb-12
        lg:flex-row
      "
    >
      <div className="mr-5 xl:mr-20">
        <h1
          className="
            font-rubik
            font-semibold
            text-2xl
            tracking-wide
            whitespace-nowrap
            lg:font-openSans
            lg:font-normal
            lg:font-3xl
          "
        >
          Сохраненные треки
        </h1>
      </div>

      <div
        className="
          mt-4
          lg:mt-0
          flex
          justify-between
          sm:w-full
          items-center
        "
      >
        <ShuffleButton handler={() => {}} title="Перемешать" />
        <TrackPageDropdown />
      </div>
    </Container>
  );
});

export default TrackPageControls;
