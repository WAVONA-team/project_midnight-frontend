import React from 'react';
import ReactPlayer from 'react-player';

import { Controls, Playback } from '@/modules/Player';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo';

export const CreateNewTrackPage: React.FC = React.memo(() => {
  const handleDuration = (dur: number) => {
    console.log('duration ', dur);
  };

  return (
    <div className="w-full h-screen ">
      <TrackInfo
        imgUrl="https://i1.sndcdn.com/artworks-ccQ0kQCf9M41-0-t500x500.jpg"
        name="Boyz Don't Cry by Rod Wave"
        artist="Rod Wave"
        provider="SoundCloud"
        url="https://soundcloud.com/oembed?format=json&url=https://soundcloud.com/rodwave/track-11?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing"
      />
    </div>
  );
});
