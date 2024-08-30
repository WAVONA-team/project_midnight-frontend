import React, { useCallback, useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from 'project_midnight';

import { createPlayerSlice } from '@/modules/Player/store';
import { modalButtons } from '@/modules/TrackModal';
import { TrackModal, useHandlerModal } from '@/modules/TrackModal';
import { DeleteButton } from '@/modules/TrackModal/components/buttons';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { MainButtonLink } from '@/ui/Button';
import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

type Props = {
  onTrackPage?: boolean;
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  tracks: Track[];
  totalTracks: number;
  headerCondition?: boolean;
  onMainPage?: boolean;
};

const { FavoriteButton, ShareButton, SaveOnMainButton } = modalButtons;

const TrackList: React.FC<Props> = React.memo(
  ({
    onTrackPage = false,
    isLoading,
    setIsLoading,
    tracks,
    totalTracks,
    headerCondition = true,
    onMainPage = false,
  }) => {
    const [isTrackFavourite, setIsTrackFavourite] = useState(false);
    const [isTrackSaved, setIsTrackSaved] = useState(false);

    const { playerState, changePlayerState, changeCurrentTrack, currentTrack } =
      createPlayerSlice();

    const {
      isFavouriteTracksLoading,
      user,
      checkFavouriteTrack,
      checkSavedTrack,
    } = useStore(
      ({
        isFavouriteTracksLoading,
        user,
        checkFavouriteTrack,
        checkSavedTrack,
      }) => ({
        isFavouriteTracksLoading,
        user,
        checkFavouriteTrack,
        checkSavedTrack,
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
    }, [totalTracks, setIsLoading]);

    useEffect(() => {
      document.addEventListener('scroll', scrollHandler);
      document.addEventListener('resize', scrollHandler);

      return () => {
        document.removeEventListener('scroll', scrollHandler);
        document.removeEventListener('resize', scrollHandler);
      };
    }, [scrollHandler]);

    const handlerProtectedModal = async (
      e: React.MouseEvent<HTMLDivElement> & { trackId?: string },
    ) => {
      await checkSavedTrack(e.trackId!, user!.id)
        .then(() => setIsTrackSaved(true))
        .catch(() => setIsTrackSaved(false));

      checkFavouriteTrack(e.trackId!, user!.id)
        .then(() => setIsTrackFavourite(true))
        .catch(() => setIsTrackFavourite(false))
        .finally(() => handlerTracksModal!(e));
    };

    return (
      <div className="mb-8 sm:mb-12 flex flex-col gap-11">
        {!isLoading && !tracks.length && (
          <Container
            className={classNames('flex flex-col justify-center', {
              'items-start': headerCondition,
              'items-center': !headerCondition,
            })}
          >
            {!headerCondition && onMainPage && (
              <div>
                <h1 className="font-openSans text-xl md:text-2xl font-normal mb-4 text-center">
                  {isFavouriteTracksLoading
                    ? 'Вы не добавили ни одного трека в избранное'
                    : 'Здесь пока нет ни одного трека'}
                </h1>
              </div>
            )}

            {headerCondition && (
              <h1 className="font-openSans text-xl md:text-2xl font-normal mb-4 text-left">
                Трек не найден. Попробуйте изменить поисковый запрос
              </h1>
            )}

            {!headerCondition && onMainPage && (
              <div className="flex flex-col items-center">
                <p className="font-rubik text-base font-normal text-on-secondary-dim-gray mb-5">
                  Добавьте любимые треки прямо сейчас
                </p>

                <MainButtonLink
                  title="Добавить трек"
                  path="/tracks/new"
                  className="w-fit"
                />
              </div>
            )}
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
                    track={track}
                    onTrackPage={onTrackPage}
                    id={track.id}
                    artist={track.author as string}
                    name={track.title}
                    handlerPlay={() => handleTrack(track)}
                    handlerModal={handlerProtectedModal!}
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
                      trackIsFavourite={isTrackFavourite}
                      setGlobalTrackIsFavourite={setIsTrackFavourite}
                      closeModal={modalOnCloseHandler!}
                      className="first:rounded-t-xl first:hover:rounded-t-xl"
                    />
                  </div>

                  <Menu.Item
                    as={SaveOnMainButton}
                    selectedTrack={selectedTrack!}
                    trackIsSaved={isTrackSaved}
                    setGlobalTrackIsSaved={setIsTrackSaved}
                    closeModal={modalOnCloseHandler!}
                    className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                  />

                  <Menu.Item
                    as={ShareButton}
                    selectedTrack={selectedTrack!}
                    className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
                  />

                  <Menu.Item
                    as={DeleteButton}
                    selectedTrack={selectedTrack!}
                    closeModal={modalOnCloseHandler!}
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
