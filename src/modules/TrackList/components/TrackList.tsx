import React, { useCallback, useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from 'project_midnight';

import Dropdown from '@/components/Dropdown/Dropdown';
import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { TrackShareButton } from '@/ui/Button';
import TrackFavoriteButton from '@/ui/Button/MenuButton/TrackFavoriteButton/TrackFavoriteButton';
import { Container } from '@/ui/Container';
import DropdownTrackInfo from '@/ui/DropdownTrackInfo/DropdownTrackInfo';
import { Spinner } from '@/ui/Spinner';

type Props = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  tracks: Track[];
  totalTracks: number;
  getTracks: (userId: string, page: number) => Promise<Track[]>;
  currentPage: number;
  header?: string;
};

const TrackList: React.FC<Props> = React.memo(
  ({
    isLoading,
    tracks,
    totalTracks,
    getTracks,
    currentPage,
    setIsLoading,
    header,
  }) => {
    const [showModal, setShowModal] = useState(false);
    const [childElement, setChildElement] = useState<HTMLElement | null>(null);
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    const {
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      user,
      setTracks,
    } = useStore(
      ({
        currentTrack,
        changeCurrentTrack,
        playerState,
        changePlayerState,
        user,
        setTracks,
      }) => ({
        currentTrack,
        changeCurrentTrack,
        playerState,
        changePlayerState,
        user,
        setTracks,
      }),
    );

    useEffect(() => {
      if (isLoading) {
        getTracks(user!.id, currentPage).then((tracks) => setTracks(tracks));
      }
    }, [isLoading]);

    const scrollHandler = useCallback(() => {
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
          100 &&
        tracks.length < totalTracks
      ) {
        setIsLoading(true);
      }
    }, [tracks, totalTracks]);

    useEffect(() => {
      document.addEventListener('scroll', scrollHandler);
      document.addEventListener('resize', scrollHandler);

      return () => {
        document.removeEventListener('scroll', scrollHandler);
        document.removeEventListener('resize', scrollHandler);
      };
    }, [scrollHandler]);

    const handlerModal = ({
      currentTarget,
      trackId,
    }: React.MouseEvent<HTMLButtonElement> & { trackId?: string }) => {
      if (currentTarget === childElement) {
        setShowModal((state) => !state);
      } else {
        const element = currentTarget as HTMLElement;
        const track = tracks?.find((item) => item.id === trackId);
        track && setSelectedTrack(track);
        setChildElement(element);
        setShowModal(true);
      }
    };

    const modalOnBlurHandler = () => {
      setShowModal(false);
    };

    return (
      <div className="mb-8 sm:mb-12 flex flex-col gap-11">
        {!isLoading && !tracks.length && (
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
              {header}
            </h2>
          </Container>
        )}

        <AnimatePresence>
          {tracks && (
            <div>
              {tracks.map((track) => (
                <motion.div
                  key={track.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TrackInfo
                    id={track.id}
                    artist={track.author as string}
                    name={track.title}
                    handlerPlay={() => {
                      changeCurrentTrack(track);
                      changePlayerState(
                        track.url === currentTrack?.url ? !playerState : true,
                      );
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

        {isLoading && (
          <Container>
            <Spinner
              className="relative"
              backgroundColor="bg-surface-eerie_black"
            />
          </Container>
        )}
      </div>
    );
  },
);

export default TrackList;
