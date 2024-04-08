import React from 'react';
import ReactPlayer from 'react-player';

type Props = {
  name: string;
  artist: string;
  provider: string;
  duration: string;
};

export const TrackInfo: React.FC<Props> = React.memo(
  ({ name, artist, provider, duration }) => {
    return (
      <div>
        <p>{name}</p>
        <p>{artist}</p>
        <p>{provider}</p>
      </div>
    );
  },
);
