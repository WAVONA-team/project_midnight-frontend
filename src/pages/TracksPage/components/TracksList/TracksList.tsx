import React, { useEffect } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import { TrackInfo } from '@/components/TrackInfo';

import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

const TracksList: React.FC = React.memo(() => {
  const {
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
    }),
  );

  useEffect(() => {
    getTracksByUser(user!.id, currentPage).then(() => setTracks(userTracks));
  }, []);

  const scrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight -
        (e.currentTarget.scrollTop + e.currentTarget.clientHeight) <
      100
    ) {
      setIsUserTracksLoading(true);
    }
  };

  return (
    <div
      onScroll={scrollHandler}
      className="mb-8 sm:mb-12 flex flex-col gap-11"
    >
      {!isUserTracksLoading && !userTracks.length && (
        <Container>
          <h2
            className="
            font-rubik
            font-semibold
            text-secondary-cadet-gray
            text-2xl
            sm:text-2xl
            lg:text-xl
            tracking-wide
          "
          >
            У вас пока нет добавленных треков :(
          </h2>
        </Container>
      )}

      {isUserTracksLoading && (
        <Container>
          <Spinner
            className="relative"
            backgroundColor="bg-surface-eerie_black"
          />
        </Container>
      )}

      <AnimatePresence>
        {!isUserTracksLoading && userTracks && (
          <div>
            {userTracks.map((track) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <TrackInfo
                  artist={track.author}
                  name={track.title}
                  handlerPlay={() => {
                    changeCurrentTrack(track);
                    changePlayerState(!playerState);
                  }}
                  handlerModal={() => {}}
                  duration={track.duration}
                  provider={track.source}
                  imgUrl={track.imgUrl!}
                  isPlay={track.url === currentTrack?.url}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default TracksList;
