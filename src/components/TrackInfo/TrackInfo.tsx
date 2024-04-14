import React from 'react';

import classNames from 'classnames';

import Streamline from '@/ui/Streamline/Streamline';

import dot from '@/assets/dot.svg';

type Props = {
  name: string;
  artist: string | null;
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
        className={classNames(
          'cursor-pointer relative w-full grid grid-cols-[64px_1fr_24px] gap-x-4 md:grid-cols-[64px_1fr_1fr_1fr_24px] items-center px-4 py-2',
          {
            'bg-[linear-gradient(90deg,rgba(218,47,55,0.2)0%,rgba(218,47,55,0.05)74.4%,rgba(218,47,55,0)100%)]':
              isPlay && trackIndexPlay === trackIndex,
          },
        )}
      >
        <img src={imgUrl} alt={name} className="w-16 h-16" />

        {isPlay && trackIndexPlay === trackIndex && (
          <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center pl-9">
            <Streamline />
          </div>
        )}

        <div className="md:hidden w-full">
          <h3 className="flex text-base font-rubik text-on-primary-anti-flash-white truncate max-w-48">
            {name}
          </h3>

          <p className="text-on-secondary-dim-gray text-sm">{artist}</p>

          <p className="text-on-secondary-dim-gray text-sm flex items-center">
            {duration} <img src={dot} alt="separator" /> {provider}
          </p>
        </div>

        <h3 className="hidden md:block text-base font-rubik text-on-primary-anti-flash-white truncate text-wrap">
          {name}
        </h3>

        <p className="hidden md:block text-center text-on-primary-lavender-blush text-sm">
          {artist}
        </p>

        <p className="text-on-primary-lavender-blush text-sm items-center hidden md:flex">
          {duration} <img src={dot} alt="separator" /> {provider}
        </p>

        <div className="flex flex-1 justify-end items-center lg:justify-center cursor-pointer ">
          <button
            type="button"
            className="flex gap-1 focus:outline-none focus-visible:outline-none"
            onClick={handlerModal}
          >
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                x="18"
                y="11.1678"
                width="3"
                height="3"
                rx="1"
                stroke="#A09F9F"
                strokeWidth="1.5"
              />
              <rect
                x="10.5"
                y="11.1678"
                width="3"
                height="3"
                rx="1"
                stroke="#A09F9F"
                strokeWidth="1.5"
              />
              <rect
                x="3"
                y="11.1678"
                width="3"
                height="3"
                rx="1"
                stroke="#A09F9F"
                strokeWidth="1.5"
              />
            </svg>
          </button>
        </div>
      </div>
    );
  },
);
