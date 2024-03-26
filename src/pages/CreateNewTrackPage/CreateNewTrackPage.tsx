import React from 'react';

import { TrackAddition } from '@/modules/TrackAddition';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  return (
    <div
      className="
      bg-background-hight
      h-screen
      pt-8
    "
    >
      <TrackAddition />
    </div>
  );
});
