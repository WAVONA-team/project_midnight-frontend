import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';
import { NotificationMessage } from '@/ui/NotificationMessage';

type Props = {
  className: string;
  selectedTrack: Track;
  trackIsFavourite: boolean;
  setGlobalTrackIsFavourite: React.Dispatch<React.SetStateAction<boolean>>;
  closeModal?: () => void;
};

const TrackFavoriteButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      {
        className,
        selectedTrack,
        trackIsFavourite = selectedTrack.isFavourite,
        setGlobalTrackIsFavourite,
        closeModal = () => {},
      },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { t } = useTranslation('translation', {
        keyPrefix: 'trackModalButtons.favourite',
      });

      const navigate = useNavigate();

      const {
        updateIsFavourite,
        user,
        isFavouriteTracksLoading,
        setIsFavouriteTracksLoading,
        clearUserPlaylist,
        setIsUserTracksLoading,
      } = useStore(
        ({
          updateIsFavourite,
          user,
          isFavouriteTracksLoading,
          setIsFavouriteTracksLoading,
          clearUserPlaylist,
          setIsUserTracksLoading,
        }) => ({
          updateIsFavourite,
          user,
          isFavouriteTracksLoading,
          setIsFavouriteTracksLoading,
          clearUserPlaylist,
          setIsUserTracksLoading,
        }),
      );

      const toggleFavourite = () => {
        navigate('/tracks');
        if (isFavouriteTracksLoading) return;
        setIsFavouriteTracksLoading(true);
        clearUserPlaylist();
        setIsUserTracksLoading(true);
      };

      const [isFavourite, setIsFavourite] = useState(trackIsFavourite);

      const handler = () => {
        updateIsFavourite(selectedTrack.id, user!.id)
          .then((res) => {
            setIsFavourite(res);
            closeModal();

            if (res) {
              toast.custom(() => (
                <NotificationMessage
                  message={t('addSuccess')}
                  handlerText={t('goToFavourite')}
                  handler={toggleFavourite}
                />
              ));
            } else {
              setGlobalTrackIsFavourite(false);
              clearUserPlaylist();
              setIsUserTracksLoading(true);

              toast.custom(() => (
                <NotificationMessage message={t('removeSuccess')} />
              ));
            }
          })
          .catch(() => setIsFavourite(false));
      };

      return (
        <MenuButton
          ref={ref}
          className={className}
          title={isFavourite ? t('remove') : t('add')}
          icon={isFavourite ? checked : uncheked}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackFavoriteButton;
