import React from 'react';

import { useStore } from '@/store';
import classNames from 'classnames';

import { PlayButton } from '@/ui/Button';
import Streamline from '@/ui/Streamline/Streamline';

import dot from '@/assets/dot.svg';

type Props = {
  isDesktop?: boolean;
  name: string;
  artist: string | null;
  provider: string;
  imgUrl: string;
  duration: string;
  isPlay: boolean;
  handlerPlay: React.MouseEventHandler<HTMLDivElement>;
  handlerModal: React.MouseEventHandler<HTMLButtonElement>;
};

const TrackInfo: React.FC<Props> = React.memo(
  ({
    isDesktop = false,
    name,
    artist,
    provider,
    imgUrl,
    duration,
    isPlay,
    handlerPlay,
    handlerModal,
  }) => {
    const { playerState } = useStore(({ playerState }) => ({ playerState }));

    return isDesktop ? (
      <div className="px-20">
        <div
          className={classNames(
            'bg-surface-eerie_black relative w-full flex p-6 rounded-lg  ',
          )}
        >
          <div className="relative w-32 h-32 rounded-md  mr-6">
            <img
              src={imgUrl}
              alt={name}
              className="w-full h-full object-cover rounded-md"
            />
            {isPlay && playerState && (
              <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center">
                <Streamline isDesktop={isDesktop} />
              </div>
            )}
          </div>

          <div className=" min-w-48 flex-1 pt-4">
            <h3 className="flex text-2xl font-normal font-openSans text-on-primary-anti-flash-white truncate min-w-48 mb-[6px]">
              {name}
            </h3>

            <p className="text-on-primary-anti-flash-white font-rubik text-sm mb-[6px]">
              {artist}
            </p>
            <p className="text-on-primary-anti-flash-white font-rubik text-sm flex items-center">
              {duration} <img src={dot} alt="separator" /> {provider}
            </p>
          </div>
          <div className="flex gap-8 justify-end items-center lg:justify-center cursor-pointer">
            <div onClick={handlerPlay}>
              <PlayButton />
            </div>

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
      </div>
    ) : (
      <div className="lg:px-20 ">
        <div
          onClick={handlerPlay}
          className={classNames(
            'cursor-pointer relative w-full grid grid-cols-[64px_1fr_24px] gap-x-4 lg:grid-cols-[64px_1fr_1fr_1fr_24px] lg:rounded-[4px] items-center py-2 px-4 lg:px-2  xl:pr-64',
            {
              'bg-[linear-gradient(90deg,rgba(218,47,55,0.2)0%,rgba(218,47,55,0.05)74.4%,rgba(218,47,55,0)100%)]':
                isPlay && playerState,
            },
          )}
        >
          <div className="relative w-16 h-16 rounded-md">
            <img
              src={imgUrl}
              alt={name}
              className="w-full h-full object-cover rounded-md"
            />
            {isPlay && playerState && (
              <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center ">
                <Streamline />
              </div>
            )}
          </div>

          <div className="lg:hidden min-w-48">
            <h3 className="flex text-base font-rubik text-on-primary-anti-flash-white truncate min-w-48">
              {name}
            </h3>

            <p className="text-on-secondary-dim-gray text-sm">{artist}</p>

            <p className="text-on-secondary-dim-gray text-sm flex items-center flex-row-reverse justify-end">
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

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 justify-end items-center lg:justify-center cursor-pointer "
          >
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
      </div>
    );
  },
);

export default TrackInfo;
