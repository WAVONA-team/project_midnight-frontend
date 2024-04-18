import React from 'react';

type Props = {
  name: string;
  artist: string | null;
  provider: string;
  imgUrl: string;

};

export const TrackInformation: React.FC<Props> = React.memo(
  ({
    name,
    artist,
    provider,
    imgUrl,
  }) => {
    return (
      <div className=" flex">
        <img src={imgUrl} alt={name} className="w-16 h-16 rounded-md" />

        <div className="">
          <h3 className="flex text-base font-rubik text-on-primary-anti-flash-white truncate min-w-48">
            {name}
          </h3>

          <p className="text-on-secondary-dim-gray text-sm">{artist}</p>

          <p className="text-on-secondary-dim-gray text-sm flex items-center">
            {provider}
          </p>
        </div>
      </div>
    );
  },
);
