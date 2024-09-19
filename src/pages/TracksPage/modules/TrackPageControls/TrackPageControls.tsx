/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import pauseIcon from '@/../public/buttons/playerButtons/mainPagePauseIcon.svg';
import playIcon from '@/../public/buttons/playerButtons/mainPagePlayIcon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import TrackPageAdditionActionsDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageAdditionActionsDropdown/TrackPageAdditionActionsDropdown.tsx';
import { TrackPageDropdown } from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageFiltersDropdown/TrackPageFiltersDropdown';

import { createPlayerSlice } from '@/modules/Player/store';

import ActionButton from '@/ui/Button/ActionButton/ActionButton.tsx';
import { Container } from '@/ui/Container';

const TrackPageControls: React.FC = React.memo(() => {
  const { t } = useTranslation();

  const { playerState, changePlayerState, changeCurrentTrack, currentTrack } =
    createPlayerSlice();

  const { userPlaylist, setTracksTitle, setTracksIcon } = useStore(
    ({ userPlaylist, setTracksTitle, setTracksIcon }) => ({
      userPlaylist,
      setTracksTitle,
      setTracksIcon,
    }),
  );

  const handleTrack = (track: Track) => {
    if (track !== currentTrack) {
      changePlayerState(track.url !== currentTrack?.url ? !playerState : false);
      changeCurrentTrack(track);
    } else {
      changePlayerState(track.url === currentTrack?.url ? !playerState : true);
    }
  };

  const handlePlaylistStateButton = () => {
    if (
      playerState &&
      userPlaylist?.tracks?.find((track) => track.id === currentTrack?.id)
    ) {
      setTracksTitle(t('tracksTitle.pause'));
      setTracksIcon(pauseIcon);
    } else {
      setTracksTitle(t('tracksTitle.listen'));
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
          {userPlaylist?.name
            ? t(`userPlaylists.${userPlaylist.name}`)
            : t('loading')}
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
                  ? t('tracksTitle.pause')
                  : t('tracksTitle.listen')
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
            <TrackPageDropdown />
          </div>
        </div>
      </div>
    </Container>
  );
});

export default TrackPageControls;
