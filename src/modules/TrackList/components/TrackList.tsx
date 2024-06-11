import React, { useCallback, useEffect } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from 'project_midnight';

import { modalButtons } from '@/modules/TrackModal';
import { TrackModal, useHandlerModal } from '@/modules/TrackModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';
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

const { ShareButton } = modalButtons;

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

    const {
      modalOnBlurHandler,
      handlerTracksModal,
      modalOnCloseHandler,
      showModal,
      selectedTrack,
      childElement,
    } = useHandlerModal(tracks);

    useEffect(() => {
      return () => changeCurrentTrack(null);
    }, []);

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
                    handlerModal={handlerTracksModal!}
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
          <TrackModal
            showModal={showModal}
            modalOnCloseHandler={modalOnCloseHandler!}
            actionButtons={
              <>
                <Menu.Item
                  as={ShareButton}
                  selectedTrack={selectedTrack!}
                  className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                />
              </>
            }
            trackAuthor={selectedTrack! && selectedTrack.author}
            trackImgUrl={selectedTrack! && selectedTrack.imgUrl}
            trackTitle={selectedTrack! && selectedTrack.title}
            trackSource={selectedTrack! && selectedTrack.source}
          />
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
