import React, { useEffect, useState } from 'react';

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
  } = useStore(
    ({
      currentTrack,
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
    }) => ({
      currentTrack,
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
    }),
  );

  const [isTrackFavourite, setIsTrackFavourite] = useState(
    currentTrack?.isFavourite,
  );

  useEffect(() => {
    setIsTrackFavourite(currentTrack?.isFavourite);
  }, [currentTrack]);

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
