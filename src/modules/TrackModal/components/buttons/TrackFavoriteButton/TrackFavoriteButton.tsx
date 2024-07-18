import React, { useState } from 'react';

import checked from '@/../public/isFavourite/checked.svg';
import uncheked from '@/../public/isFavourite/unchecked.svg';
import { useStore } from '@/store';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

type Props = {
  className: string;
  selectedTrack: Track;
  closeModal?: () => void;
};

const TrackFavoriteButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      { className, selectedTrack, closeModal = () => {} },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const { updateIsFavourite, user } = useStore(
        ({ updateIsFavourite, user }) => ({
          updateIsFavourite,
          user,
        }),
      );

      const [isFavourite, setIsFavourite] = useState(selectedTrack.isFavourite);

      const handler = () => {
        updateIsFavourite(selectedTrack.id, user?.id!)
          .then(() => {
            setIsFavourite((prev) => !prev);
            closeModal();
          })
          .catch(() => setIsFavourite(false));
      };

      return (
        <MenuButton
          ref={ref}
          className={className}
          title={isFavourite ? 'Удалить из избранного' : 'Добавить в избранное'}
          icon={isFavourite ? checked : uncheked}
          handler={handler}
        />
      );
    },
  ),
);

export default TrackFavoriteButton;
