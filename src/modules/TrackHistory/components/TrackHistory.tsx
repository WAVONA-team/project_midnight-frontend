import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { createPlayerSlice } from '@/modules/Player/store';
import { modalButtons } from '@/modules/TrackModal';
import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import TextButton from '@/ui/Button/TextButtonWithIcon/TextButtonWithIcon';
import { Container } from '@/ui/Container';

const { ShareButton, FavoriteButton, SaveOnMainButton } = modalButtons;

export const TrackHistory: React.FC = React.memo(() => {
  const { t } = useTranslation('translation', { keyPrefix: 'trackHistory' });
  const [isTrackFavourite, setIsTrackFavourite] = useState(false);
  const [isTrackSaved, setIsTrackSaved] = useState(false);

  const {
    user,
    userSearchHistory,
    clearUserSearchHistory,
    updateHistoryOrder,
    checkFavouriteTrack,
    checkSavedTrack,
  } = useStore(
    ({
      user,
      userSearchHistory,
      clearUserSearchHistory,
      updateHistoryOrder,
      checkFavouriteTrack,
      checkSavedTrack,
    }) => ({
      user,
      userSearchHistory,
      clearUserSearchHistory,
      updateHistoryOrder,
      checkFavouriteTrack,
      checkSavedTrack,
    }),
  );

  const { playerState, currentTrack, changeCurrentTrack, changePlayerState } =
    createPlayerSlice();

  const {
    modalOnBlurHandler,
    handlerTracksModal,
    modalOnCloseHandler,
    showModal,
    selectedTrack,
    childElement,
  } = useHandlerModal(userSearchHistory);

  const clearHistory = () => {
    clearUserSearchHistory(user?.id as string);
  };

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
    <div>
      <Container className=" justify-between flex">
        <h2 className="font-notoSans text-on-primary-anti-flash-white">
          {t('title')}
        </h2>
        <TextButton
          title={t('clear')}
          handler={clearHistory}
          className=" focus:text-secondary-satin-sheen-gold !w-fit"
        />
      </Container>
      <div className="flex flex-col gap-3 mt-3">
        <AnimatePresence>
          {userSearchHistory?.map((track) => (
            <motion.div
              key={track.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <TrackInfo
                id={track.id}
                name={track.title}
                artist={track.author as string}
                provider={track.source}
                duration={track.duration}
                imgUrl={track.imgUrl as string}
                isPlay={currentTrack?.url === track.url}
                isFavourite={track.isFavourite}
                handlerPlay={() => {
                  changeCurrentTrack(track);
                  changePlayerState(
                    currentTrack?.url !== track.url ? true : !playerState,
                  );

                  updateHistoryOrder(track.id);
                }}
                handlerModal={handlerProtectedModal!}
                modalOnBlurHandler={modalOnBlurHandler}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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
                    className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
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
              </>
            }
            trackAuthor={selectedTrack! && selectedTrack.author}
            trackImgUrl={selectedTrack! && selectedTrack.imgUrl}
            trackTitle={selectedTrack! && selectedTrack.title}
            trackSource={selectedTrack! && selectedTrack.source}
          />
        </Portal>
      </Menu>
    </div>
  );
});

export default TrackHistory;
