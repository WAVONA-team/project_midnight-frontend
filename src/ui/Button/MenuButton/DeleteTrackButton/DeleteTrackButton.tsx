import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import deleteIcon from '../../../../../public/buttons/actionButtons/deleteIcon.svg';

type Props = {
  className?: string;
};

const DeleteTrackButton: React.FC<Props> = React.memo(({ className }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const deleteTrack = async () => {
    setIsClicked(true);
  };

  return (
    <MenuButton
      title={isClicked ? 'Удалено!' : 'Удалить'}
      icon={deleteIcon}
      className={`${className}`}
      handler={deleteTrack}
    />
  );
});

export default DeleteTrackButton;
