import React from 'react';

import { Controls, Playback } from '@/modules/Player';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  return (
    <div className="w-full h-screen ">
      <h1>CreateTrackPage</h1>
      <Controls></Controls>
      <Playback
        tracks={[
          'https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/ozunapr/ozuna-david-guetta-vocation?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing',
        ]}
      ></Playback>
    </div>
  );
});
