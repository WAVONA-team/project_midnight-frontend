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
            font-openSans
            font-normal
            text-2xl
            whitespace-nowrap
          "
        >
          Все треки
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
        <div>
          <ShuffleButton
            className="
              bg-transparent
              p-0
              sm:bg-primary-poppy
              sm:py-1.5
              sm:px-4
              sm:shadow-button-default
              sm:active:shadow-button-active
              sm:active:bg-primary-madder
              sm:hover:bg-primary-fire-brick
            "
            handler={() => {}}
            title="Перемешать"
          />
        </div>
        <TrackPageDropdown />
      </div>
    </div>
  );
});

export default TrackPageControls;
