import React, { useEffect } from 'react';

import { useStore } from '@/store';
import { Track } from 'project_midnight';

import { TrackList } from '@/modules/TrackList';

import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';

import useHandlerModal from '../../modules/TrackModal/hooks/useHandlerModal.tsx';
import Streamline from '../../ui/Streamline/Streamline.tsx';

export const TrackPage: React.FC = React.memo(() => {
  const {
    currentTrack,
    isUserTracksLoading,
    isQueryTracksLoading,
    setIsUserTracksLoading,
    user,
    getTracksByUser,
    currentPage,
    totalTracks,
    isFavouriteTracksLoading,
    clearUserPlaylist,
    userTracks,
    userPlaylist,
    playerState,
    changeCurrentTrack,
    changePlayerState,
  } = useStore(
    ({
      currentTrack,
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userTracks,
      userPlaylist,
      playerState,
      changeCurrentTrack,
      changePlayerState,
    }) => ({
      currentTrack,
      user,
      isUserTracksLoading,
      isQueryTracksLoading,
      setIsUserTracksLoading,
      getTracksByUser,
      currentPage,
      totalTracks,
      isFavouriteTracksLoading,
      clearUserPlaylist,
      userTracks,
      userPlaylist,
      playerState,
      changeCurrentTrack,
      changePlayerState,
    }),
  );

  const handleTrack = (track: Track) => {
    changeCurrentTrack(track);
    changePlayerState(track.url === currentTrack?.url ? !playerState : true);
  };

  console.log(userPlaylist?.tracks);

  const isFavourite = isFavouriteTracksLoading;

  useEffect(() => {
    setIsUserTracksLoading(true);

    return () => clearUserPlaylist();
  }, []);

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage, {
        query: '',
        sortType: 'updatedAt',
        order: 'desc',
        isFavourite,
      });
    }
  }, [isUserTracksLoading]);

  console.log(window.innerHeight - 300);

  return (
    <div className="h-screen flex justify-center items-center bg-background-default-gradient">
      <Container>
        <div className="flex items-center gap-12">
          <div className="">
            <img
              className="w-[430px] h-[430px] object-cover"
              src={currentTrack?.imgUrl as string}
              alt="Track Image"
            />
          </div>
          <div>
            <h1 className="border-b-2 pb-2 border-on-secondary-dim-gray font-rubik text-2xl font-semibold text-on-primary-anti-flash-white tracking-wide">
              Дальше
            </h1>

            <div
              className={`${userPlaylist?.tracks!.length >= 6 && 'overflow-y-auto'} mt-4  max-h-[680px] min-w-[480px]`}
            >
              {userPlaylist?.tracks?.map((track) => (
                <div
                  onClick={() => handleTrack(track)}
                  className={`
                  flex 
                  mb-6 
                  justify-between 
                  cursor-pointer 
                  py-2 
                  px-2 
                  rounded-md
                  ${track.url === currentTrack?.url && playerState && '&& bg-background-trackInfo'}
                  `}
                >
                  <div className="relative w-16 h-16 mr-4 rounded-md">
                    <img
                      className="w-full h-full object-cover"
                      src={track.imgUrl as string}
                      alt="Track Image"
                    />

                    {track.url === currentTrack?.url && playerState && (
                      <div className="absolute top-0 right-0 left-0 bottom-0 flex items-center justify-center ">
                        <Streamline />
                      </div>
                    )}
                  </div>
                  <div className="font-rubik text-on-primary-anti-flash-white break-words">
                    <div className="flex flex-col">
                      <h2 className="text-base font-normal max-w-[280px]">
                        {track.title}
                      </h2>
                      <h4>{track.author}</h4>
                      <p>{track.source}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-on-primary-anti-flash-white">
                    <p>{track.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
});
