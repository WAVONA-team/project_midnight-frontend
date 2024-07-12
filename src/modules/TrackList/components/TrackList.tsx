import React, { useCallback, useEffect } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from 'project_midnight';

import { modalButtons } from '@/modules/TrackModal';
<<<<<<< HEAD
import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';
=======
import { TrackModal, useHandlerModal } from '@/modules/TrackModal';
import { DeleteButton } from '@/modules/TrackModal/components/buttons';
>>>>>>> 6c81ec4 (feat(DEV-21): add delete modal button)

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { MainButtonLink } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

type Props = {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  tracks: Track[];
  totalTracks: number;
  headerCondition?: boolean;
};

const { FavoriteButton, ShareButton } = modalButtons;

const TrackList: React.FC<Props> = React.memo(
  ({
    isLoading,
    setIsLoading,
    tracks,
    totalTracks,
    headerCondition = true,
  }) => {
    const {
      currentTrack,
      changeCurrentTrack,
      changePlayerState,
      playerState,
      isFavouriteTracksLoading,
    } = useStore(
      ({
        currentTrack,
        changeCurrentTrack,
        changePlayerState,
        playerState,
        isFavouriteTracksLoading,
      }) => ({
        currentTrack,
        changeCurrentTrack,
        changePlayerState,
        playerState,
        isFavouriteTracksLoading,
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

    // useEffect(() => {
    // return () => changeCurrentTrack(null);
    // }, []);

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
            <div className="flex flex-col items-center justify-center">
              <h1 className="font-openSans text-2xl font-normal mb-4 text-center">
                {!isFavouriteTracksLoading
                  ? 'Здесь пока нет ни одного трека'
                  : 'Вы не добавили ни одного трека в избранное'}
              </h1>
              <p className="font-rubik text-base font-normal text-on-secondary-dim-gray mb-5">
                Добавьте любимые треки прямо сейчас
              </p>
              <div>
                <MainButtonLink title="Добавить трек" path="/tracks/new" />
              </div>
            </div>
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
                  <div className="lg:hidden">
                    <Menu.Item
                      as={FavoriteButton}
                      selectedTrack={selectedTrack!}
                      closeModal={modalOnCloseHandler!}
                      className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                    />
                  </div>

                  <Menu.Item
                    as={ShareButton}
                    selectedTrack={selectedTrack!}
                    className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                  />
                  <Menu.Item
                    as={DeleteButton}
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
