import React from 'react';

import classNames from 'classnames';

import Streamline from '@/ui/Streamline/Streamline';

type Props = {
  name: string;
  artist: string;
  provider: string;
  imgUrl: string;
  duration: string;
  trackIndexPlay: number;
  trackIndex: number;
  isPlay: boolean;
  handlerPlay: React.MouseEventHandler<HTMLDivElement>;
  handlerModal: React.MouseEventHandler<HTMLButtonElement>;
};

export const TrackInfo: React.FC<Props> = React.memo(
  ({
    name,
    artist,
    provider,
    imgUrl,
    duration,
    trackIndexPlay,
    trackIndex,
    isPlay,
    handlerPlay,
    handlerModal,
  }) => {
    return (
      <div
        onClick={handlerPlay}
        className={classNames('flex p-2 px-4 bg-[black] cursor-pointer', {
          'bg-[linear-gradient(90deg,rgba(218,47,55,0.2)0%,rgba(218,47,55,0.05)74.4%,rgba(218,47,55,0)100%)]':
            isPlay && trackIndexPlay === trackIndex,
        })}
      >
        <div
          className="relative w-16 h-16 mr-2 rounded 
        lg:mr-4
        "
        >
          <img className="rounded" src={imgUrl} alt="Cover"></img>
          {isPlay && trackIndexPlay === trackIndex && (
            <div className="absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center">
              <Streamline />
            </div>
          )}
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
        <div className="flex flex-1 justify-end items-center lg:justify-center cursor-pointer ">
          <button
            type="button"
            className="flex gap-1 focus:outline-none focus-visible:outline-none"
            onClick={handlerModal}
          >
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid " />
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid" />
            <div className="w-[3px] h-[3px] rounded-sm bg-[transparent] border-[1px] border-on-primary-anti-flash-white border-solid" />
          </button>
        </div>
      </div>
    );
  },
);
