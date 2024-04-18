import React, { useEffect, useState } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Track } from 'project_midnight';

const TrackPageTracks: React.FC = React.memo(() => {
  const { user, getTracksByUser } = useStore((state) => state);

  const [currentPage, setCurrentPage] = useState<string>('1');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tracks, setTracks] = useState<Track[]>([]);

  useEffect(() => {
    if (isLoading) {
      getTracksByUser(user!.id, currentPage)
        .then((response) => {
          setTracks([...tracks, ...response]);
          setCurrentPage((prevState) => String(Number(prevState) + 10));
        })
        .finally(() => setIsLoading(false));
    }
  }, [isLoading]);

  const scrollHandler = (e: Event & { target: HTMLElement }) => {
    if (
      e.target.scrollHeight - (e.target!.scrollTop + e.target!.clientHeight) <
      100
    ) {
      setIsLoading(true);
    }
  };

  return (
    <div
      onScroll={() => scrollHandler}
      className={`${tracks.length >= 10 && 'overflow-y-auto'} h-full lg:h-[800px] mb-8 sm:mb-12 flex flex-col gap-11`}
    >
      <AnimatePresence>
        {tracks.length ? (
          tracks.map((track) => (
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
          ))
        ) : (
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
      </AnimatePresence>
    </div>
  );
});

export default TrackPageTracks;
