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
    isFavouriteTracksLoading,
    changeCurrentTrack,
    changePlayerState,
    currentTrack,
    playerState,
    tracks,
    allTracksTitle,
    favouriteTracksTitle,
    allTracksIcon,
    favouriteTracksIcon,
    setAllTracksTitle,
    setFavouriteTracksTitle,
    setAllTracksIcon,
    setFavouriteTracksIcon,
  } = useStore(
    ({
      isFavouriteTracksLoading,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      tracks,
      user,
      allTracksTitle,
      favouriteTracksTitle,
      allTracksIcon,
      favouriteTracksIcon,
      setAllTracksTitle,
      setFavouriteTracksTitle,
      setAllTracksIcon,
      setFavouriteTracksIcon,
    }) => ({
      isFavouriteTracksLoading,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      tracks,
      user,
      allTracksTitle,
      favouriteTracksTitle,
      allTracksIcon,
      favouriteTracksIcon,
      setAllTracksTitle,
      setFavouriteTracksTitle,
      setAllTracksIcon,
      setFavouriteTracksIcon,
    }),
  );

  const handleTrack = (track: Track) => {
    changeCurrentTrack(track);
    changePlayerState(track.url === currentTrack?.url ? !playerState : true);
  };

  const handlePlaylistStateButton = () => {
    setAllTracksTitle('Слушать');
    setAllTracksIcon(playIcon);
    setFavouriteTracksTitle('Слушать');
    setFavouriteTracksIcon(playIcon);

    if (!isFavouriteTracksLoading && (playerState || !playerState)) {
      setAllTracksTitle('Пауза');
      setAllTracksIcon(pauseIcon);
    }

    if (!isFavouriteTracksLoading && !playerState) {
      setAllTracksTitle('Слушать');
      setAllTracksIcon(playIcon);
    }

    if (isFavouriteTracksLoading && (playerState || !playerState)) {
      setFavouriteTracksTitle('Пауза');
      setFavouriteTracksIcon(pauseIcon);
    }

    if (isFavouriteTracksLoading && !playerState) {
      setFavouriteTracksTitle('Слушать');
      setFavouriteTracksIcon(playIcon);
    }
  };

  useEffect(() => {
    handlePlaylistStateButton();
  }, [playerState]);

  return (
    <Container
      className="
        flex
        flex-col
        mb-12
      "
    >
      <div className="mr-5 mb-6 xl:mr-20">
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
          {isFavouriteTracksLoading ? 'Избранные' : 'Сохраненные треки'}
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
        <div className="flex w-[184px] items-center">
          <ActionButton
            icon={
              isFavouriteTracksLoading ? favouriteTracksIcon : allTracksIcon
            }
            title={
              isFavouriteTracksLoading ? favouriteTracksTitle : allTracksTitle
            }
            handler={() => handleTrack(tracks![0])}
            disabled={!tracks?.length}
          />

          <TrackPageAdditionActionsDropdown />
        </div>

        <TrackPageFiltersDropdown />
      </div>
    </Container>
  );
});

export default TrackPageControls;
