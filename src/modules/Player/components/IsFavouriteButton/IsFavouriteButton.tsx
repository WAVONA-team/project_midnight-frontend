import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import { useStore } from '@/store';

export const IsFavouriteButton: React.FC = React.memo(() => {
  const {
    currentTrack,
    updateIsFavourite,
    isFavouriteTracksLoading,
    setIsUserTracksLoading,
    clearUserPlaylist,
    user,
    setIsFavouriteTracksLoading,
  } = useStore(
    ({
      currentTrack,
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
      setIsFavouriteTracksLoading,
    }) => ({
      currentTrack,
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
                <div className="rounded-xl px-3.5 py-4 bg-surface-eerie_black">
                  <span className="font-rubik font-normal text-base">
                    Удалено из избранного
                  </span>
                </div>
              ));
            } else {
              toast.custom(() => (
                <div className="font-rubik font-normal text-base rounded-xl px-3.5 py-4 bg-surface-eerie_black">
                  <span className="font-rubik font-normal text-base mr-4">
                    Добавлено в избранное
                  </span>
                  <button
                    className="text-sm focus:outline-none text-secondary-satin-sheen-gold"
                    onClick={() => toggleFavourite()}
                  >
                    Перейти в избранное
                  </button>
                </div>
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
