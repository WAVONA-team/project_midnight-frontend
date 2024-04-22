import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import addToPlaylistIcon from '@/assets/buttons/actionButtons/addToPlaylistIcon.svg';

type Props = {
  className?: string;
};

const AddToPlaylistButton: React.FC<Props> = React.memo(({ className }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const addToPlaylist = async () => {
    setIsClicked(true);
  };

  return (
    <MenuButton
      title={isClicked ? 'Добавлено в плейлист!' : 'Добавить в плейлист'}
      icon={addToPlaylistIcon}
      className={`${className}`}
      handler={addToPlaylist}
    />
  );
});

export default AddToPlaylistButton;
