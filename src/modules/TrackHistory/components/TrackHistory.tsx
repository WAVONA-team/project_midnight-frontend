import React, { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { AnimatePresence, motion } from 'framer-motion';

import { modalButtons } from '@/modules/TrackModal';
import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';

const { ShareButton } = modalButtons;

export const TrackHistory: React.FC = React.memo(() => {
  const [, setIsTrackSave] = useState(false);

  const {
    userSearchHistory,
    updateHistoryOrder,
    changeCurrentTrack,
    playerState,
    changePlayerState,
    currentTrack,
    checkTrack,
    user,
  } = useStore(
    ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
      checkTrack,
      user,
    }) => ({
      userSearchHistory,
      updateHistoryOrder,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentTrack,
      checkTrack,
      user,
    }),
  );
  const {
    modalOnBlurHandler,
    handlerTracksModal,
    modalOnCloseHandler,
    showModal,
    selectedTrack,
    childElement,
  } = useHandlerModal(userSearchHistory);

  useEffect(() => {
    return () => changeCurrentTrack(null);
  }, []);

  const handlerProtectedModal = async (
    e: React.MouseEvent<HTMLDivElement> & { trackId?: string },
  ) => {
    if (user && e.trackId && !showModal) {
      checkTrack(e.trackId, user?.id)
        .then(() => {
          setIsTrackSave(false);
        })
        .catch(() => {
          setIsTrackSave(true);
        })
        .finally(() => {
          handlerTracksModal!(e);
        });
    } else {
      handlerTracksModal!(e);
    }
  };

  useEffect(() => {
    if (showModal) {
      setIsTrackSave(false);
    }
  }, [showModal]);

  return (
    <div>
      <Container>
        <h2 className="font-notoSans text-on-primary-anti-flash-white">
          История Поиска
        </h2>
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
