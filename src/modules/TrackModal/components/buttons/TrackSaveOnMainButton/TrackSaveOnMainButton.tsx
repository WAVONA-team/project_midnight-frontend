import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import saveIcon from '@/../public/buttons/actionButtons/saveIcon.svg';
import saveIconChecked from '@/../public/buttons/actionButtons/saveIconChecked.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';
import { NotificationMessage } from '@/ui/NotificationMessage';

type Props = {
  className: string;
  selectedTrack: Track;
  trackIsSaved: boolean;
  setGlobalTrackIsSaved: React.Dispatch<React.SetStateAction<boolean>>;

  closeModal?: () => void;
};

const TrackSaveOnMainButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      {
        className,
        selectedTrack,
        trackIsSaved,
        setGlobalTrackIsSaved,
        closeModal = () => {},
      },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { t } = useTranslation('translation', {
        keyPrefix: 'trackModalButtons.main',
      });

      const {
        updateIsSaved,
        user,
        clearUserPlaylist,
        clearUserTracks,
        setIsUserTracksLoading,
        isFavouriteTracksLoading,
      } = useStore(
        ({
          updateIsSaved,
          user,
          clearUserPlaylist,
          clearUserTracks,
          setIsUserTracksLoading,
          isFavouriteTracksLoading,
        }) => ({
          updateIsSaved,
          user,
          clearUserPlaylist,
          clearUserTracks,
          setIsUserTracksLoading,
          isFavouriteTracksLoading,
        }),
      );

      const handler = async () => {
        updateIsSaved(selectedTrack.id, user!.id)
          .then((isSaved) => {
            closeModal();
            setGlobalTrackIsSaved(isSaved);

            if (!isFavouriteTracksLoading) {
              clearUserTracks();
              clearUserPlaylist();
              setIsUserTracksLoading(true);
            }

            toast.custom(() => (
              <NotificationMessage
                message={isSaved ? t('addSuccess') : t('removeSuccess')}
              />
            ));
          })
          .catch(() =>
            toast.custom(() => <NotificationMessage message={t('addError')} />),
          );
      };

      return (
        <MenuButton
          ref={ref}
          className={className}
          title={trackIsSaved ? t('remove') : t('add')}
          icon={trackIsSaved ? saveIconChecked : saveIcon}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackSaveOnMainButton;
