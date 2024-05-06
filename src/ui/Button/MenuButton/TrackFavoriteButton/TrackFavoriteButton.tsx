import React from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import saveIcon from '@/assets/buttons/actionButtons/saveIcon.svg';

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
