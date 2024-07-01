import React from 'react';

import dot from '@/../public/dot.svg';
import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import kebab from '@/../public/kebab/kebab.svg';
import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';

import { PlayButton } from '@/ui/Button';
import Streamline from '@/ui/Streamline/Streamline';

type Props = {
  isDesktop?: boolean;
  id: string;
  name: string;
  artist: string | null;
  provider: string;
  imgUrl: string;
  duration: string;
  isPlay: boolean;
  isFavourite: boolean;
  handlerPlay: React.MouseEventHandler<HTMLDivElement>;

  handlerModal: (
    e: React.MouseEvent<HTMLDivElement> & { trackId?: string },
  ) => void;
  modalOnBlurHandler: () => void;
};

const TrackInfo: React.FC<Props> = React.memo(
  ({
    isDesktop = false,
    id,
    name,
    artist,
    provider,
    imgUrl,
    duration,
    isPlay,
    isFavourite,
    handlerPlay,
    handlerModal,
    modalOnBlurHandler,
  }) => {
    const { playerState } = useStore(({ playerState }) => ({ playerState }));

    const handlerModalEvent = (e: React.MouseEvent<HTMLDivElement>) => {
      if (id) {
        const customEvent = {
          ...e,
          trackId: id,
        };
        handlerModal(customEvent);
      } else {
        handlerModal(e);
      }
    };

    if (isDesktop) {
      return (
        <div className="px-20">
          <div
            className={classNames(
              'bg-surface-eerie_black relative w-full flex items-center p-6 rounded-lg  ',
            )}
          >
            <div className="relative w-32 h-32 rounded-md mr-6">
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

            <div className="flex-1 pt-4">
              <h3 className="flex text-2xl font-normal font-openSans text-on-primary-anti-flash-white mb-[6px]">
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
              <Menu
                className={`
              relative
              focus:border-[none]
              focus:outline-[none]
              `}
                as="div"
                onClick={handlerModalEvent}
                onBlur={modalOnBlurHandler}
                tabIndex={0}
              >
                <button
                  className={`
                  flex
                  gap-1
                  w-6
                  h-6
                  focus:border-none
                  focus:outline-none
                  focus-visible:outline-none
              `}
                >
                  <img src={kebab} alt="kebab" />
                </button>
              </Menu>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="lg:px-20 ">
        <div
          onClick={handlerPlay}
          className={classNames(
            'cursor-pointer relative w-full grid grid-cols-[64px_1fr_24px] gap-x-4 lg:grid-cols-[64px_1fr_1fr_1fr_48px_24px] lg:rounded-[4px] items-center py-2 px-4 lg:px-2',
            {
              'bg-background-trackInfo': isPlay && playerState,
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
            <h3 className="block text-base font-rubik text-on-primary-anti-flash-white overflow-hidden whitespace-nowrap text-ellipsis">
              {name}
            </h3>

            <p className="text-on-secondary-dim-gray text-sm">{artist}</p>

            <p className="text-on-secondary-dim-gray text-sm flex items-center flex-row-reverse justify-end">
              {duration} <img src={dot} alt="separator" /> {provider}
            </p>
          </div>

          <h3 className="hidden lg:block text-base font-rubik text-on-primary-anti-flash-white overflow-hidden whitespace-nowrap text-ellipsis">
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
            className="hidden lg:flex flex-1 justify-end items-center lg:justify-center cursor-pointer opacity-0 hover:opacity-100 transition"
          >
            <button
              type="button"
              className="flex gap-1 w-6 h-6 focus:outline-none focus:border-none"
              onClick={() => {
                updateIsFavourite(id, user?.id as string).then(() => {
                  setIsTrackFavourite((prev) => !prev);

                  if (isFavouriteTracksLoading) {
                    clearUserTracks();
                    setIsUserTracksLoading(true);
                  }
                });
              }}
            >
              <img
                src={isTrackFavourite ? checked : uncheked}
                alt="favourite"
              />
            </button>
          </div>

          <div
            onClick={(e) => e.stopPropagation()}
            className="flex flex-1 justify-end items-center lg:justify-center cursor-pointer "
          >
            <Menu
              className={`
              relative
              focus:border-[none]
              focus:outline-[none]
              `}
              as="div"
              onClick={handlerModalEvent}
              onBlur={modalOnBlurHandler}
              tabIndex={0}
            >
              <button
                className={`
                  focus:border-none
                  focus:outline-none
                  focus-visible:outline-none
              `}
              >
                <img src={kebab} alt="kebab" />
              </button>
            </Menu>
          </div>
        </div>
      </div>
    );
  },
);

export default TrackInfo;
