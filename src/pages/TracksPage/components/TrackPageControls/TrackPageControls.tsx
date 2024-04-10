import React from 'react';

import TrackPageDropdown from '@/pages/TracksPage/components/TrackPageControls/TrackPageDropdown/TrackPageDropdown.tsx';

import { ShuffleButton } from '@/ui/Button';

const TrackPageControls: React.FC = React.memo(() => {
  return (
    <div className="sm:flex mb-12">
      <div className="mb-4 mr-20">
        <h1 className="font-semibold text-2xl whitespace-nowrap">Все треки</h1>
      </div>

      <div className="flex justify-between sm:w-full">
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
