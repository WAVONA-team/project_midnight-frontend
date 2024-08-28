import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import dot from '@/../public/dot.svg';
import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import kebab from '@/../public/kebab/kebab.svg';
import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import { Track } from 'project_midnight';

import { createPlayerSlice } from '@/modules/Player/store';

import { PlayButton } from '@/ui/Button';
import { NotificationMessage } from '@/ui/NotificationMessage';
import Streamline from '@/ui/Streamline/Streamline';

type Props = {
  track?: Track;
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
  onTrackPage?: boolean;
  handlerModal: (
    e: React.MouseEvent<HTMLDivElement> & { trackId?: string },
  ) => void;
  modalOnBlurHandler: () => void;
};

const TrackInfo: React.FC<Props> = React.memo(
  ({
    track,
    isDesktop = false,
    id,
    name,
    artist,
    provider,
    imgUrl,
    duration,
    isPlay,
    isFavourite,
    onTrackPage,
    handlerPlay,
    handlerModal,
    modalOnBlurHandler,
  }) => {
    const navigate = useNavigate();
    const [isTrackFavourite, setIsTrackFavourite] = useState(isFavourite);
    const { playerState, currentTrack, changeCurrentTrack, changePlayerState } =
      createPlayerSlice();

    const {
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserTracks,
      user,
      setIsFavouriteTracksLoading,
      clearUserPlaylist,
      isUpdated,
    } = useStore(
      ({
        updateIsFavourite,
        isFavouriteTracksLoading,
        setIsUserTracksLoading,
        clearUserTracks,
        user,
        setIsFavouriteTracksLoading,
        clearUserPlaylist,
        isUpdated,
      }) => ({
        updateIsFavourite,
        isFavouriteTracksLoading,
        setIsUserTracksLoading,
        clearUserTracks,
        user,
        setIsFavouriteTracksLoading,
        clearUserPlaylist,
        isUpdated,
      }),
    );

    const toggleFavourite = () => {
      navigate('/tracks');
      if (isFavouriteTracksLoading) return;
      setIsFavouriteTracksLoading(true);
      clearUserPlaylist();
      setIsUserTracksLoading(true);
    };

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

    useEffect(() => {
      if (
        isUpdated.split(':')[0] === id &&
        isUpdated.split(':')[1] === 'false'
      ) {
        setIsTrackFavourite(false);
      }

      if (
        isUpdated.split(':')[0] === id &&
        isUpdated.split(':')[1] === 'true'
      ) {
        setIsTrackFavourite(true);
      }
    }, [isUpdated]);

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

    const handleTrack = (track: Track) => {
      changeCurrentTrack(track);
      changePlayerState(track.url === currentTrack?.url ? !playerState : true);
    };

    if (onTrackPage) {
      return (
        <div
          onClick={() => handleTrack(track!)}
          className={`
            flex
            mb-6
            justify-between
            cursor-pointer
            py-2
            px-2
            rounded-md
            ${track?.url === currentTrack?.url && playerState && '&& bg-background-trackInfo'}
          `}
        >
          <div className="relative w-16 h-16 mr-4 rounded-md">
            <img
              className="w-full h-full object-cover"
              src={track?.imgUrl as string}
              alt="Track Image"
            />

            {track?.url === currentTrack?.url && playerState && (
              <div
                className="absolute
                  top-0
                  right-0
                  left-0
                  bottom-0
                  flex
                  items-center
                  justify-center
                "
              >
                <Streamline />
              </div>
            )}
          </div>
          <div className="font-rubik text-on-primary-anti-flash-white break-words">
            <div className="flex flex-col">
              <h2 className="text-base truncate font-normal max-w-[280px]">
                {track?.title}
              </h2>
              <h4>{track?.author}</h4>
              <p>{track?.source}</p>
            </div>
          </div>
          <div className="flex items-center text-on-primary-anti-flash-white">
            <p>{track?.duration}</p>
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
                updateIsFavourite(id, user?.id as string).then((res) => {
                  setIsTrackFavourite(res);

                  if (isTrackFavourite) {
                    toast.custom(() => (
                      <NotificationMessage message="Удалено из избранных" />
                    ));
                  } else {
                    toast.custom(() => (
                      <NotificationMessage
                        message="Добавлено в избранное"
                        handlerText="Перейти в избранное"
                        handler={toggleFavourite}
                      />
                    ));
                  }

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
