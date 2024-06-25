import React from 'react';

import pauseIcon from '@/../public/buttons/playerButtons/mainPagePauseIcon.svg';
import playIcon from '@/../public/buttons/playerButtons/mainPagePlayIcon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import TrackPageDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageDropdown/TrackPageDropdown.tsx';

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
  } = useStore(
    ({
      isFavouriteTracksLoading,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      tracks,
    }) => ({
      isFavouriteTracksLoading,
      changeCurrentTrack,
      changePlayerState,
      currentTrack,
      playerState,
      tracks,
    }),
  );

  const favouriteTracks = tracks?.filter((track) => track.isFavourite);

  console.log(currentTrack?.playlist);

  const handleTrack = (track: Track) => {
    changeCurrentTrack(track);
    changePlayerState(track.url === currentTrack?.url ? !playerState : true);
  };

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
        <ActionButton
          // TODO Плейлист (все треки и избранные)
          icon={pauseIcon}
          title={'Пауза'}
          handler={() =>
            handleTrack(
              isFavouriteTracksLoading ? favouriteTracks![0] : tracks![0],
            )
          }
          disabled={!tracks?.length}
        />
        <TrackPageDropdown />
      </div>
    </Container>
  );
});

export default TrackPageControls;
