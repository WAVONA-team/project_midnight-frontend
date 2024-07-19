import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';

import { useStore } from '@/store';
import { Track } from 'project_midnight';

import TracksContainer from '@/pages/TracksPage/helpers/TracksContainer.tsx';
import TrackPageControls from '@/pages/TracksPage/modules/TrackPageControls/TrackPageControls';
import TrackPageHeader from '@/pages/TracksPage/modules/TrackPageHeader/TrackPageHeader';

import ToggleButton from '@/ui/Button/ToggleButton/ToggleButton.tsx';

import pauseIcon from '../../../public/buttons/playerButtons/mainPagePauseIcon.svg';
import playIcon from '../../../public/buttons/playerButtons/mainPagePlayIcon.svg';
import ActionButton from '../../ui/Button/ActionButton/ActionButton.tsx';

export const TracksPage: React.FC = React.memo(() => {
  const {
    currentTrack,
    isFavouriteTracksLoading,
    setIsFavouriteTracksLoading,
    userPlaylist,
    changeCurrentTrack,
    changePlayerState,
    playerState,
  } = useStore(
    ({
      setIsFavouriteTracksLoading,
      currentTrack,
      isFavouriteTracksLoading,
      userPlaylist,
      changeCurrentTrack,
      changePlayerState,
      playerState,
    }) => ({
      currentTrack,
      isFavouriteTracksLoading,
      setIsFavouriteTracksLoading,
      userPlaylist,
      changeCurrentTrack,
      changePlayerState,
      playerState,
    }),
  );

  const handleTrack = (track: Track) => {
    changeCurrentTrack(track);
    changePlayerState(track.url === currentTrack?.url ? !playerState : true);
  };

  const handleControlIsOpen = () => {
    if (playerState) {
      return 170;
    } else {
      return 15;
    }
  };

  useEffect(() => {
    handleControlIsOpen();
  }, [playerState]);

  return (
    <div
      className={`${currentTrack && 'pb-28'}
        bg-background-hight
        sm:bg-background-default-gradient
        w-full
        h-full
        font-rubik
        text-on-primary-anti-flash-white
      `}
    >
      <div className="grid lg:grid-flow-col">
        <div className="sm:col-start-1 sm:col-end-2">
          <TrackPageHeader />
        </div>

        <div className="justify-self-center mb-8 block sm:hidden">
          <ActionButton
            className="w-[62px] h-[62px]"
            icon={
              playerState &&
              userPlaylist?.tracks?.find(
                (track) => track.id === currentTrack?.id,
              )
                ? pauseIcon
                : playIcon
            }
            handler={() => handleTrack(userPlaylist!.tracks![0])}
            disabled={!userPlaylist?.tracks?.length}
          />
        </div>

        <div
          className="
            justify-self-center
            mb-8
            lg:pb-0
            lg:col-span-1
            lg:justify-self-end
            lg:pr-20
            lg:self-center
            pt-3
          "
        >
          <ToggleButton
            leftTitle="Все треки"
            rightTitle="Избранные"
            isFavouriteTracksLoading={isFavouriteTracksLoading}
            setIsFavouriteTracksLoading={setIsFavouriteTracksLoading}
          />
        </div>
      </div>

      <div className="sticky pt-1 top-0 bg-background-hight z-10 h-fit">
        <TrackPageControls />
      </div>

      <Toaster
        position={'bottom-center'}
        containerStyle={{
          bottom: handleControlIsOpen(),
          left: 300,
        }}
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          duration: 1000,
        }}
      />

      <TracksContainer />
    </div>
  );
});
