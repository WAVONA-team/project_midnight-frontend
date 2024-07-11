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
  setIsLoading: (state: boolean) => void;
  tracks: Track[];
  totalTracks: number;
  header?: string;
  headerCondition?: boolean;
};

const { ShareButton } = modalButtons;

const TrackList: React.FC<Props> = React.memo(
  ({
    isLoading,
    setIsLoading,
    tracks,
    totalTracks,
    header,
    headerCondition = true,
  }) => {
    const { currentTrack, changeCurrentTrack, changePlayerState, playerState } =
      useStore(
        ({
          currentTrack,
          changeCurrentTrack,
          changePlayerState,
          playerState,
        }) => ({
          currentTrack,
          changeCurrentTrack,
          changePlayerState,
          playerState,
        }),
      );

    const handleTrack = (track: Track) => {
      changeCurrentTrack(track);
      changePlayerState(track.url === currentTrack?.url ? !playerState : true);
    };

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

    const scrollHandler = useCallback(() => {
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
          100 &&
        tracks.length < totalTracks
      ) {
        setIsLoading(true);
      }
    }, [tracks.length, totalTracks, setIsLoading]);

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
        {!isLoading && !tracks.length && headerCondition && (
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
          {(tracks || !isLoading) && (
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
                    handlerPlay={() => handleTrack(track)}
                    handlerModal={handlerTracksModal!}
                    modalOnBlurHandler={modalOnBlurHandler}
                    duration={track.duration}
                    provider={track.source}
                    imgUrl={track.imgUrl!}
                    isPlay={track.url === currentTrack?.url}
                    isFavourite={track.isFavourite}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        <Menu>
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
        </Menu>

        {isLoading && (
          <Container className="flex justify-center">
            <Spinner />
          </Container>
        )}
      </div>
    );
  },
);

export default TrackList;
