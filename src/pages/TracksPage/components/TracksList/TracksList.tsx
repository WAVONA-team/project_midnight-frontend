import React, { MouseEventHandler, useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import Dropdown from '@/components/Dropdown/Dropdown';
import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import TrackFavoriteButton from '@/ui/Button/MenuButton/TrackFavoriteButton/TrackFavoriteButton';
import TrackShareButton from '@/ui/Button/MenuButton/TrackShareButton/TrackShareButton';
import { Container } from '@/ui/Container';
import DropdownTrackInfo from '@/ui/DropdownTrackInfo/DropdownTrackInfo';
import { Spinner } from '@/ui/Spinner';

const TracksList: React.FC = React.memo(() => {
  const [showModal, setShowModal] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const {
    user,
    isUserTracksLoading,
    setIsUserTracksLoading,
    userTracks,
    getTracksByUser,
    currentTrack,
    changeCurrentTrack,
    playerState,
    changePlayerState,
    currentPage,
    setTracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
    }) => ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
    }),
  );

  useEffect(() => {
    getTracksByUser(user!.id, currentPage).then(() => setTracks(userTracks));
  }, []);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + e.currentTarget.clientHeight) <
      100
    ) {
      setIsUserTracksLoading(true);
    }
  };

  const handlerModal = ({
    currentTarget,
    trackId,
  }: React.MouseEvent<HTMLButtonElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      setShowModal((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;
      const track = userTracks?.find((item) => item.id === trackId);
      track && setSelectedTrack(track);
      setChildElement(element);
      setShowModal(true);
    }
  };

  const modalOnBlurHandler = () => {
    setShowModal(false);
  };

  return (
    <div
      onScroll={scrollHandler}
      className="mb-8 sm:mb-12 flex flex-col gap-11"
    >
      {!isUserTracksLoading && !userTracks.length && (
        <Container>
          <h2
            className="
            font-rubik
            font-semibold
            text-secondary-cadet-gray
            text-2xl
            sm:text-2xl
            lg:text-xl
            tracking-wide
          "
          >
            У вас пока нет добавленных треков :(
          </h2>
        </Container>
      )}

      {isUserTracksLoading && (
        <Container>
          <Spinner
            className="relative"
            backgroundColor="bg-surface-eerie_black"
          />
        </Container>
      )}

      <AnimatePresence>
        {!isUserTracksLoading && userTracks && (
          <div>
            {userTracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrackInfo
                  id={track.id}
                  artist={track.author}
                  name={track.title}
                  handlerPlay={() => {
                    changeCurrentTrack(track);
                    changePlayerState(!playerState);
                  }}
                  handlerModal={handlerModal}
                  modalOnBlurHandler={modalOnBlurHandler}
                  duration={track.duration}
                  provider={track.source}
                  imgUrl={track.imgUrl!}
                  isPlay={track.url === currentTrack?.url}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
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

export default TracksList;
