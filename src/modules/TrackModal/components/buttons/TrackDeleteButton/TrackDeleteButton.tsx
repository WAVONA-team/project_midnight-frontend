import React from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

import deleteIcon from '@/../public/buttons/actionButtons/deleteIcon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';
import { NotificationMessage } from '@/ui/NotificationMessage';

type Props = {
  className: string;
  selectedTrack: Track;

  closeModal?: () => void;
};

const TrackDeleteButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      { className, selectedTrack, closeModal = () => {} },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { t } = useTranslation('translation', {
        keyPrefix: 'trackModalButtons.delete',
      });

      const {
        deleteTrack,
        user,
        clearUserPlaylist,
        clearUserTracks,
        setIsUserTracksLoading,
      } = useStore(
        ({
          deleteTrack,
          user,
          clearUserPlaylist,
          clearUserTracks,
          setIsUserTracksLoading,
        }) => ({
          deleteTrack,
          user,
          clearUserPlaylist,
          clearUserTracks,
          setIsUserTracksLoading,
        }),
      );

      const handler = async () => {
        deleteTrack(selectedTrack.id, user!.id)
          .then(() => {
            clearUserPlaylist();
            clearUserTracks();
            closeModal();
            setIsUserTracksLoading(true);

            toast.custom(() => (
              <NotificationMessage message={t('deleteSuccess')} />
            ));
          })
          .catch(() =>
            toast.custom(() => (
              <NotificationMessage message={t('deleteError')} />
            )),
          );
      };

      return (
        <MenuButton
          ref={ref}
          className={className}
          title={t('delete')}
          icon={deleteIcon}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackDeleteButton;
