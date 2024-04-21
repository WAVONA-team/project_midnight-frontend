import React from 'react';

import { Controls, Playback } from '@/modules/Player';

export const ExtendedPlayer: React.FC = React.memo(() => {
  return (
    <div>
      <Playback />
      <Controls />
    </div>
  );
});
