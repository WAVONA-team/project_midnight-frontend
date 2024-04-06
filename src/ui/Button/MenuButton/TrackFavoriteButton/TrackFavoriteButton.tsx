import React from 'react';

import { MenuButton } from '@/ui/Button';

import favoriteIcon from '@/assets/buttons/actionButtons/favoriteIcon.svg';

const TrackFavoriteButton: React.FC = React.memo(() => {
  return <MenuButton icon={favoriteIcon} title="Нравится" handler={() => {}} />;
});

export default TrackFavoriteButton;
