import React from 'react';

import { Playback } from '@/modules/Player';

type Props = {
  name: string;
  artist: string;
  provider: string;
  url: string;
};

export const TrackInfo: React.FC<Props> = React.memo(
  ({ name, artist, provider, url }) => {
    return (
      <div className="flex">
        <div></div>
        <div>
          <p>{name}</p>
          <p>{artist}</p>
          <p>{provider}</p>
        </div>
        <div></div>
        <Playback
          tracks={[
            'https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/ozunapr/ozuna-david-guetta-vocation?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
          ]}
        ></Playback>
      </div>
    );
  },
);
