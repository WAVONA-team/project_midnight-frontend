import React from 'react';

type Props = {
  name: string;
  artist: string;
  provider: string;
};

export const TrackInfo: React.FC<Props> = React.memo(
  ({ name, artist, provider }) => {
    return (
      <div>
        <p>{name}</p>
        <p>{artist}</p>
        <p>{provider}</p>
      </div>
    );
  },
);
