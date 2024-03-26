import React from 'react';

import { Controls, Playback } from '@/modules/Player';

type Props = {
  tracks: string[];
};

export const ExtendedPlayer: React.FC<Props> = React.memo(({ tracks }) => {
  return (
    <div>
      <Playback tracks={tracks} />
      <Controls />
    </div>
  );
});
