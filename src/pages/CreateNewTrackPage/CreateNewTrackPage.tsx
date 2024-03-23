import React from 'react';

import { MusicAddition } from '@/modules/MusicAddition';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  return (
    <div
      className="
      bg-background-hight
      h-screen
      pt-8
    "
    >
      <MusicAddition />
    </div>
  );
});
