import React from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import favoriteIcon from '@/assets/buttons/actionButtons/favoriteicon.svg';

const TrackFavoriteButton: React.FC = React.memo(() => {
  return <MenuButton title="Нравится" icon={favoriteIcon} handler={() => {}} />;
});

export default TrackFavoriteButton;
