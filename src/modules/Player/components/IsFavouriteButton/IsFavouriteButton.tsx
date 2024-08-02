import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import { useStore } from '@/store';

import { createPlayerSlice } from '@/modules/Player/store';

import { NotificationMessage } from '@/ui/NotificationMessage';

export const IsFavouriteButton: React.FC = React.memo(() => {
  const { currentTrack } = createPlayerSlice();

  const {
    updateIsFavourite,
    isFavouriteTracksLoading,
    setIsUserTracksLoading,
    clearUserPlaylist,
    user,
    setIsFavouriteTracksLoading,
  } = useStore(
    ({
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
      setIsFavouriteTracksLoading,
    }) => ({
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
      setIsFavouriteTracksLoading,
    }),
  );

  const [isTrackFavourite, setIsTrackFavourite] = useState(
    currentTrack?.isFavourite,
  );

  useEffect(() => {
    setIsTrackFavourite(currentTrack?.isFavourite);
  }, [currentTrack]);

  const toggleFavourite = () => {
    if (isFavouriteTracksLoading) return;
    setIsFavouriteTracksLoading(true);
    clearUserPlaylist();
    setIsUserTracksLoading(true);
  };

  return (
    <div>
      <button
        type="button"
        className="flex gap-1 w-6 h-6 focus:outline-none focus:border-none"
        onClick={() => {
          updateIsFavourite(
            currentTrack?.id as string,
            user?.id as string,
          ).then(() => {
            setIsTrackFavourite((prev) => !prev);

            if (isTrackFavourite) {
              toast.custom(() => (
                <NotificationMessage message="Удалено из избранного" />
              ));
            } else {
              toast.custom(() => (
                <NotificationMessage
                  message="Добавлено в избранное"
                  handlerText="Перейти в избранное"
                  handler={toggleFavourite}
                />
              ));
            }

            if (isFavouriteTracksLoading) {
              clearUserPlaylist();
              setIsUserTracksLoading(true);
            }
          });
        }}
      >
        <img src={isTrackFavourite ? checked : uncheked} alt="favourite" />
      </button>
    </div>
  );
});
