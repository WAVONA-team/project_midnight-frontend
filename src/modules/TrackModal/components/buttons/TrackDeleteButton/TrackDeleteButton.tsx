import React from 'react';

import deleteIcon from '@/../public/buttons/actionButtons/deleteIcon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

type Props = {
  className: string;
  selectedTrack: Track;
};

const TrackDeleteButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      { className, selectedTrack },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { deleteTrack, user, clearUserPlaylist, setIsUserTracksLoading } =
        useStore(
          ({
            deleteTrack,
            user,
            clearUserPlaylist,
            setIsUserTracksLoading,
          }) => ({
            deleteTrack,
            user,
            clearUserPlaylist,
            setIsUserTracksLoading,
          }),
        );

      const handler = async () => {
        deleteTrack(selectedTrack.id, user!.id)
          .then(() => {
            clearUserPlaylist();
            setIsUserTracksLoading(true);
          })
          .catch(() => console.log('Не удалось удалить трек'));
      };
      return (
        <MenuButton
          ref={ref}
          className={className}
          title="Удалить"
          icon={deleteIcon}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackDeleteButton;
