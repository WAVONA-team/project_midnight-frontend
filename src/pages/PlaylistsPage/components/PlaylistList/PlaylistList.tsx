import React, { useCallback, useEffect } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import { Playlist } from 'project_midnight';

import { CreatePlaylist } from '@/pages/PlaylistsPage/components/CreatePlaylist/CreatePlaylist';
import { PlaylistCard } from '@/pages/PlaylistsPage/components/Playlist/PlaylistCard';

import { Container } from '@/ui/Container';
import { Spinner } from '@/ui/Spinner';

import playlistThumbnail from '../../../../../public/playlistThumbnail.jpg';

type Props = {
  playlists: Playlist[];
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  totalPlaylists: number;
};

export const PlaylistList: React.FC<Props> = React.memo(
  ({ playlists, isLoading, setIsLoading, totalPlaylists }) => {
    const scrollHandler = useCallback(() => {
      if (
        document.documentElement.scrollHeight -
          (document.documentElement.scrollTop + window.innerHeight) <
          100 &&
        playlists.length < totalPlaylists
      ) {
        setIsLoading(true);
      }
    }, [playlists.length, totalPlaylists, setIsLoading]);

    const { playlistSearchQuery } = useStore(({ playlistSearchQuery }) => ({
      playlistSearchQuery,
    }));

    useEffect(() => {
      document.addEventListener('scroll', scrollHandler);
      document.addEventListener('resize', scrollHandler);

      return () => {
        document.removeEventListener('scroll', scrollHandler);
        document.removeEventListener('resize', scrollHandler);
      };
    }, [scrollHandler]);

    return (
      <div>
        {isLoading && (
          <Container className="flex justify-center">
            <Spinner />
          </Container>
        )}

        {!isLoading && !playlists.length && !!playlistSearchQuery.length && (
          <div className="text-on-primary-anti-flash-white">
            <p className="text-xl">
              Плейлист не найден. Попробуйте изменить поисковый запрос
            </p>
          </div>
        )}

        <AnimatePresence>
          {!isLoading && (
            <div className="grid md:grid-cols-4 mt-6 md:mt-12 gap-5">
              {!playlistSearchQuery.length && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:order-last"
                >
                  <CreatePlaylist />
                </motion.div>
              )}

              {playlists.map((playlist) => (
                <motion.div
                  key={playlist.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <PlaylistCard
                    id={playlist.id}
                    image={
                      playlist.tracks![0]
                        ? playlist.tracks![0].imgUrl!
                        : playlistThumbnail
                    }
                    name={playlist.name}
                    count={playlist.tracks!.length}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  },
);
