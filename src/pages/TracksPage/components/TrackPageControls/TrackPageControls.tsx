import React from 'react';

import TrackPageDropdown from '@/pages/TracksPage/components/TrackPageControls/components/TrackPageDropdown/TrackPageDropdown.tsx';

import { ShuffleButton } from '@/ui/Button';

const TrackPageControls: React.FC = React.memo(() => {
  return (
    <div
      className="
        flex
        flex-col
        mb-12
        lg:flex-row
      "
    >
      <div className="mr-[87px]">
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
    </div>
  );
});

export default TrackPageControls;
