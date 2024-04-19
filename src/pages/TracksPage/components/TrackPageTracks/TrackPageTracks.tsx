import React, { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';

import { Spinner } from '@/ui/Spinner';

const TrackPageTracks: React.FC = React.memo(() => {
  const {
    user,
    isUserTracksLoading,
    setIsUserTracksLoading,
    userTracks,
    getTracksByUser,
  } = useStore((state) => state);

  const [currentPage, setCurrentPage] = useState<string>('1');

  useEffect(() => {
    if (isUserTracksLoading) {
      getTracksByUser(user!.id, currentPage)
        .then(() => {
          setCurrentPage((prevState) => String(Number(prevState) + 1));
        })
        .finally(() => setIsUserTracksLoading(false));
    }
  }, [isUserTracksLoading]);

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
      {userTracks.length <= 0 && (
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

      <AnimatePresence>
        {userTracks.map((track) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-secondary-dark-goldenrod w-full h-[65px]"
            key={track.id}
          >
            <img src={track.imgUrl!} alt="Image" />
            <h3>{track.author}</h3>
          </motion.div>
        ))}

        {isUserTracksLoading && (
          <Spinner
            className="relative"
            backgroundColor="bg-surface-eerie_black"
          />
        )}
      </AnimatePresence>
    </div>
  );
});

export default TrackPageTracks;
