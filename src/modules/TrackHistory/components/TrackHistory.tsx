import React, { MouseEventHandler, useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { Track } from 'project_midnight';

import Dropdown from '@/components/Dropdown/Dropdown';
import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { TrackShareButton } from '@/ui/Button';
import TrackFavoriteButton from '@/ui/Button/MenuButton/TrackFavoriteButton/TrackFavoriteButton';
import { Container } from '@/ui/Container';
import DropdownTrackInfo from '@/ui/DropdownTrackInfo/DropdownTrackInfo';

export const TrackHistory: React.FC = React.memo(() => {
  const [showModal, setShowModal] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const {
    userSearchHistory,
    updateHistoryOrder,
    changeCurrentTrack,
    playerState,
    changePlayerState,
    currentTrack,
  } = useStore(
    ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
    }) => ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
    }),
  );

  const handlerModal = ({
    currentTarget,
    trackId,
  }: React.MouseEvent<HTMLButtonElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      const track = userSearchHistory?.find((item) => item.id === trackId);
      track && setSelectedTrack(track);
      setChildElement(element);
      setShowModal(true);
    }
  };

  const modalOnBlurHandler = () => {
    setShowModal(false);
    setSelectedTrack(null);
  };

  useEffect(() => {
    return () => changeCurrentTrack(null);
  }, []);

  return (
    <div className="mt-8">
      <Container>
        <h2 className="font-notoSans text-on-primary-anti-flash-white">
          История Поиска
        </h2>
      </Container>

      <div className="flex flex-col gap-3 mt-3">
        {userSearchHistory?.map((track) => (
          <TrackInfo
            key={track.id}
            id={track.id}
            name={track.title}
            artist={track.author as string}
            provider={track.source}
            duration={track.duration}
            imgUrl={track.imgUrl as string}
            isPlay={currentTrack?.url === track.url}
            handlerPlay={() => {
              changeCurrentTrack(track);
              changePlayerState(
                currentTrack?.url !== track.url ? true : !playerState,
              );

              updateHistoryOrder(track.id);
            }}
            handlerModal={handlerModal}
            modalOnBlurHandler={modalOnBlurHandler}
          />
        ))}
      </div>
      <Portal openPortal={showModal} element={childElement}>
        <Menu>
          <Dropdown
            headerItem={
              selectedTrack && (
                <DropdownTrackInfo
                  artist={selectedTrack?.author}
                  imgUrl={selectedTrack?.imgUrl}
                  name={selectedTrack?.title}
                  provider={selectedTrack?.source}
                />
              )
            }
            className="
                sm:right-0
                sm:top-8
                sm:w-[254px]
                sm:absolute
                py-4
                sm:py-0
                shadow-[16px_-16px_16px_0px_#0C0D0B80]
                "
            isOpen={showModal}
            setIsOpen={setShowModal}
          >
            <Menu.Item
              as={TrackFavoriteButton}
              className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
            ></Menu.Item>
            <Menu.Item
              as={TrackShareButton}
              className="border-none first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
            ></Menu.Item>
          </Dropdown>
        </Menu>
      </Portal>
    </div>
  );
});

export default TrackHistory;
