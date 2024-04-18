import React from 'react';

import classNames from 'classnames';

import dot from '@/assets/buttons/playerButtons/dots.svg';

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
          'cursor-pointer relative w-full grid grid-cols-[64px_1fr_24px] gap-x-4 lg:grid-cols-[64px_1fr_1fr_1fr_24px] items-center py-2 px-4 lg:px-20 xl:pr-64',
          {
            'bg-[linear-gradient(90deg,rgba(218,47,55,0.2)0%,rgba(218,47,55,0.05)74.4%,rgba(218,47,55,0)100%)]':
              isPlay && trackIndexPlay === trackIndex,
          },
        )}
      >
        <img src={imgUrl} alt={name} className="w-16 h-16 rounded-md" />

        <div className="lg:hidden min-w-48">
          <h3 className="flex text-base font-rubik text-on-primary-anti-flash-white truncate min-w-48">
            {name}
          </h3>

          <p className="text-on-secondary-dim-gray text-sm">{artist}</p>

          <p className="text-on-secondary-dim-gray text-sm flex items-center">
            {duration} <img src={dot} alt="separator" /> {provider}
          </p>
        </div>

        <h3 className="hidden lg:block text-base font-rubik text-on-primary-anti-flash-white truncate text-wrap">
          {name}
        </h3>

        <p className="hidden lg:block text-center text-on-primary-lavender-blush text-sm">
          {artist}
        </p>

        <p className="text-on-primary-lavender-blush text-sm items-center hidden lg:flex">
          {duration} <img src={dot} alt="separator" /> {provider}
        </p>

        <div className="flex flex-1 justify-end items-center lg:justify-center cursor-pointer ">
          <button
            type="button"
            className="flex gap-1 focus:outline-none focus-visible:outline-none w-6 h-6"
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
