import React, { MouseEventHandler, useEffect, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { Track } from 'project_midnight';

import { TrackModal } from '@/modules/TrackModal';
import useHandlerModal from '@/modules/TrackModal/hooks/useHandlerModal';

import Portal from '@/components/Portal/Portal';
import { TrackInfo } from '@/components/TrackInfo';

import { TrackShareButton } from '@/ui/Button';
import TrackFavoriteButton from '@/ui/Button/MenuButton/TrackFavoriteButton/TrackFavoriteButton';
import { Container } from '@/ui/Container';

export const TrackHistory: React.FC = React.memo(() => {
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
  const {
    modalOnBlurHandler,
    handlerTracksModal,
    setShowModal,
    showModal,
    selectedTrack,
    childElement,
  } = useHandlerModal(userSearchHistory);

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
            handlerModal={handlerTracksModal!}
            modalOnBlurHandler={modalOnBlurHandler}
          />
        ))}
      </div>
      <Portal openPortal={showModal} element={childElement}>
        <TrackModal
          showModal={showModal}
          setShowModal={setShowModal}
          actionButtons={
            <>
              <Menu.Item
                as={TrackFavoriteButton}
                className="first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
              />
              <Menu.Item
                as={TrackShareButton}
                className="border-none first:rounded-t-xl first:hover:rounded-t-xl last:border-b-0 last:hover:rounded-b-xl "
              />
            </>
          }
          trackAuthor={selectedTrack! && selectedTrack.author}
          trackImgUrl={selectedTrack! && selectedTrack.imgUrl}
          trackTitle={selectedTrack! && selectedTrack.title}
          trackSource={selectedTrack! && selectedTrack.source}
        />
      </Portal>
    </div>
  );
});

export default TrackHistory;
