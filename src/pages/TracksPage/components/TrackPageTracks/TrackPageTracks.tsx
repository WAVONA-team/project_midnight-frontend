import React, { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import { TrackInfo } from '@/components/TrackInfo/TrackInfo.tsx';

import { Spinner } from '@/ui/Spinner';

const TrackPageTracks: React.FC = React.memo(() => {
  const {
    user,
    isUserTracksLoading,
    setIsUserTracksLoading,
    userTracks,
    getTracksByUser,
  } = useStore((state) => state);

  const [currentPage, setCurrentPage] = useState('1');

  useEffect(() => {
    getTracksByUser(user!.id, currentPage).then(() =>
      setCurrentPage((prevState) => String(Number(prevState) + 10)),
    );
  }, []);

  const scrollHandler = (e: any) => {
    if (
      e.target.scrollHeight - (e.target!.scrollTop + e.target!.clientHeight) <
      100
    ) {
      setIsUserTracksLoading(true);
    }
  };

  return (
    <div
      onScroll={scrollHandler}
      className={`${userTracks.length >= 10 && 'overflow-y-auto'} h-full lg:h-[800px] mb-8 sm:mb-12 flex flex-col gap-11`}
    >
      {!isUserTracksLoading && !userTracks.length && (
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
      )}

      {isUserTracksLoading && (
        <Spinner
          className="relative"
          backgroundColor="bg-surface-eerie_black"
        />
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
                  handlerPlay={() => {}}
                  handlerModal={() => {}}
                  duration={track.duration}
                  trackIndex={Number(track.id)}
                  provider={track.source}
                  imgUrl={track.imgUrl!}
                  trackIndexPlay={Number(track.id)}
                  isPlay={false}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default TrackPageTracks;
