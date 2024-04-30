import React from 'react';

import { useStore } from '@/store';

// import { useNavigate } from 'react-router-dom';
import TrackPageControls from '@/pages/TracksPage/modules/TrackPageControls/TrackPageControls';
import TrackPageHeader from '@/pages/TracksPage/modules/TrackPageHeader/TrackPageHeader';

import { TrackList } from '@/modules/TrackList';

// import { MainButton } from '@/ui/Button';

export const TracksPage: React.FC = React.memo(() => {
  // const navigate = useNavigate();
  const {
    isUserTracksLoading,
    setIsUserTracksLoading,
    userTracks,
    getTracksByUser,
    currentTrack,
    currentPage,
    totalTracks,
  } = useStore(
    ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
      totalTracks,
    }) => ({
      user,
      isUserTracksLoading,
      setIsUserTracksLoading,
      userTracks,
      getTracksByUser,
      currentTrack,
      changeCurrentTrack,
      playerState,
      changePlayerState,
      currentPage,
      setTracks,
      totalTracks,
    }),
  );

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
      <TrackPageHeader />
      <div className="sticky pt-1 top-0 bg-background-hight z-10">
        <TrackPageControls />
      </div>
      <TrackList
        tracks={userTracks}
        getTracks={getTracksByUser}
        totalTracks={totalTracks}
        currentPage={currentPage}
        setIsLoading={setIsUserTracksLoading}
        isLoading={isUserTracksLoading}
        header="У вас пока нет добавленных треков :("
      />
      {/*<div>*/}
      {/*  <MainButton*/}
      {/*    className="sm:max-w-[285px] z-0"*/}
      {/*    title="Добавить"*/}
      {/*    handler={() => navigate('/tracks/new')}*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
});
