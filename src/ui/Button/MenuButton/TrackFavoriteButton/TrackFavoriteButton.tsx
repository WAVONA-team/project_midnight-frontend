import React from 'react';

import saveIcon from '@/../public/buttons/actionButtons/saveIcon.svg';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

type Props = {
  className: string;
};

const TrackFavoriteButton: React.FC<Props> = React.memo(({ className }) => {
  return (
    <MenuButton
      className={className}
      title="Сохранить"
      icon={saveIcon}
      handler={() => {}}
    />
  );
});

export default TrackFavoriteButton;
