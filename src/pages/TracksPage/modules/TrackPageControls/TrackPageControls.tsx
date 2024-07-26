import React, { useEffect } from 'react';

import pauseIcon from '@/../public/buttons/playerButtons/mainPagePauseIcon.svg';
import playIcon from '@/../public/buttons/playerButtons/mainPagePlayIcon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import TrackPageAdditionActionsDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageAdditionActionsDropdown/TrackPageAdditionActionsDropdown.tsx';
import TrackPageFiltersDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageFiltersDropdown/TrackPageFiltersDropdown.tsx';

import ActionButton from '@/ui/Button/ActionButton/ActionButton.tsx';
import { Container } from '@/ui/Container';

const TrackPageControls: React.FC = React.memo(() => {
  const {
    changeCurrentTrack,
    changePlayerState,
    currentTrack,
    playerState,
    userPlaylist,
    setTracksTitle,
    setTracksIcon,
  } = useStore(
    ({
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      userPlaylist,
      user,
      setTracksTitle,
      setTracksIcon,
    }) => ({
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      userPlaylist,
      user,
      setTracksTitle,
      setTracksIcon,
    }),
  );

  const handleTrack = (track: Track) => {
    changeCurrentTrack(track);
    changePlayerState(track.url !== currentTrack?.url ? !playerState : false);
  };

  const handlePlaylistStateButton = () => {
    if (
      playerState &&
      userPlaylist?.tracks?.find((track) => track.id === currentTrack?.id)
    ) {
      setTracksTitle('Пауза');
      setTracksIcon(pauseIcon);
    } else {
      setTracksTitle('Слушать');
      setTracksIcon(playIcon);
    }
  };

  useEffect(() => {
    handlePlaylistStateButton();
  }, [playerState, userPlaylist]);

  return (
    <Container
      className="
        flex
        flex-col
        mb-12
      "
    >
      <div className="mr-5 mb-6 xl:mr-20 hidden sm:block">
        <h1
          className="
            font-rubik
            font-semibold
            text-2xl
            tracking-wide
            whitespace-nowrap
            lg:font-openSans
            lg:font-normal
            lg:font-3xl
          "
        >
          {userPlaylist?.name || 'Загрузка...'}
        </h1>
      </div>

      <div
        className="
          mt-4
          lg:mt-0
          flex
          justify-between
          sm:w-full
          items-center
        "
      >
        <div className="flex sm:justify-start justify-between w-full">
          <div className="hidden sm:flex">
            <ActionButton
              icon={
                playerState &&
                userPlaylist?.tracks?.find(
                  (track) => track.id === currentTrack?.id,
                )
                  ? pauseIcon
                  : playIcon
              }
              title={
                playerState &&
                userPlaylist?.tracks?.find(
                  (track) => track.id === currentTrack?.id,
                )
                  ? 'Пауза'
                  : 'Слушать'
              }
              handler={() =>
                handleTrack(currentTrack || userPlaylist!.tracks![0])
              }
              disabled={!userPlaylist?.tracks?.length}
            />
          </div>

          <div className="order-2 sm:order-1 self-center">
            <TrackPageAdditionActionsDropdown />
          </div>

          <div className="order-1 sm:order-1 sm:ml-auto self-center">
            <TrackPageFiltersDropdown />
          </div>
        </div>
      </div>
    </Container>
  );
});

export default TrackPageControls;
