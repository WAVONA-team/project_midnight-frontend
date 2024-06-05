import React from 'react';

import favoriteIcon from '@/../public/buttons/actionButtons/favoriteicon.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

type Props = {
  className: string;
  selectedTrack: Track;
};

const TrackFavoriteButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      { className, selectedTrack },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { saveTrack, user } = useStore(({ saveTrack, user }) => ({
        saveTrack,
        user,
      }));

      const handler = async () => {
        if (user?.id) {
          saveTrack(selectedTrack, user.id)
            .then(() => console.log('Трек добавлен'))
            .catch(() => console.log('Трек НЕ добален'));
        }
      };

      return (
        <MenuButton
          ref={ref}
          className={className}
          title="Добавить в избранное"
          icon={favoriteIcon}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackFavoriteButton;
