import React from 'react';

import { TrackAddition } from '@/modules/TrackAddition';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  return (
    <div
      className="
      bg-background-hight
      h-screen
      pt-8
      flex
      lg:p-0
      lg:bg-background-desktop
    "
    >
      <TrackAddition />
    </div>
  );
});
