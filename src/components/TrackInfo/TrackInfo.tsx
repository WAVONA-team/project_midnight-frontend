import React, { useState } from 'react';
import ReactPlayer from 'react-player';

type Props = {
  name: string;
  artist: string;
  provider: string;
  imgUrl: string;
  url: string;
  trackNumber: number;
  isPlay: boolean;
  currentTrack: number;
};

//состояние включенности если isPlay= true и trackNumber = trackNumberON

export const TrackInfo: React.FC<Props> = React.memo(
  ({ name, artist, provider, imgUrl, url }) => {
    const [duration, setDuration] = useState(0);

    const getDuration = (state: number) => {
      const min = state / 60;
      const sec = state - 60 * Math.floor(min);
      console.log('seconds)', sec);
      setDuration(state);
    };

    return (
      <div className="flex p-2 px-4 bg-[black]">
        <div
          className="w-16 h-16 mr-2 rounded 
        lg:mr-4
        "
        >
          <img className="rounded" src={imgUrl} alt="Cover"></img>
        </div>

        <div className="flex flex-col justify-between font-rubik lg:flex-row lg:items-center lg:flex-[4]">
          <p className="text-on-primary-anti-flash-white text-base font-normal tracking-wide">
            {name}
          </p>
          <p className="text-on-secondary-dim-gray text-sm font-normal tracking-[0.25px] ">
            {artist}
          </p>

          <div className="flex items-center gap-1 text-on-secondary-dim-gray text-xs font-normal lg:flex-row-reverse lg:gap-2">
            {provider}
            <a className=" block w-[3.5px] h-[3.5px] rounded-full bg-on-secondary-dim-gray"></a>
            {duration}
          </div>
        </div>
        <div className="flex flex-1 justify-end items-center lg:justify-center  ">
          <div className="flex gap-1 ">
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid "></div>
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid"></div>
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid"></div>
          </div>
        </div>
        <div className="hidden">
          <ReactPlayer url={url} playing={false} onDuration={getDuration} />
        </div>
      </div>
    );
  },
);
