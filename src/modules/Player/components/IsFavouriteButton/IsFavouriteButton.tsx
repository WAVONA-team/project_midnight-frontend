import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import { useStore } from '@/store';

import { createPlayerSlice } from '@/modules/Player/store';

import { NotificationMessage } from '@/ui/NotificationMessage';

export const IsFavouriteButton: React.FC = React.memo(() => {
  const navigate = useNavigate();
  const { currentTrack } = createPlayerSlice();

  const {
    updateIsFavourite,
    isFavouriteTracksLoading,
    setIsUserTracksLoading,
    clearUserPlaylist,
    user,
    setIsFavouriteTracksLoading,
    isUpdated,
  } = useStore(
    ({
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
      setIsFavouriteTracksLoading,
      isUpdated,
    }) => ({
      updateIsFavourite,
      isFavouriteTracksLoading,
      setIsUserTracksLoading,
      clearUserPlaylist,
      user,
      setIsFavouriteTracksLoading,
      isUpdated,
    }),
  );

  const toggleFavourite = () => {
    navigate('/tracks');
    if (isFavouriteTracksLoading) return;
    setIsFavouriteTracksLoading(true);
    clearUserPlaylist();
    setIsUserTracksLoading(true);
  };

  const [isFavourite, setIsFavourite] = useState(currentTrack?.isFavourite);

  useEffect(() => {
    setIsFavourite(currentTrack?.isFavourite);
  }, [currentTrack]);

  useEffect(() => {
    setIsFavourite(isUpdated.split(':')[1] === 'true');
  }, [isUpdated]);

  return (
    <div>
      <button
        type="button"
        className="flex gap-1 w-6 h-6 focus:outline-none focus:border-none"
        onClick={() => {
          updateIsFavourite(currentTrack!.id, user!.id).then(() => {
            if (isFavourite) {
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
        <img src={isFavourite ? checked : uncheked} alt="favourite" />
      </button>
    </div>
  );
});
