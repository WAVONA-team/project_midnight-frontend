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
          <h3 className="flex text-sm font-rubik text-on-primary-anti-flash-white truncate min-w-48">
            {name}
          </h3>

          <p className="text-secondary-cadet-gray text-xs">{artist}</p>

          <p className=" text-secondary-cadet-gray text-xs flex items-center">
            {provider}
          </p>
        </div>
      </div>
    );
  },
);
