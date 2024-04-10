import React from 'react';

type Props = {
  name: string;
  artist: string | null;
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
        <p>{duration}</p>
      </div>
    );
  },
);
