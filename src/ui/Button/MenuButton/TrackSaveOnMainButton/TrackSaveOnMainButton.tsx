import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import addToMainIcon from '../../../../../public/buttons/actionButtons/addToMainIcon.svg';

type Props = {
  className?: string;
};

const TrackSaveOnMainButton: React.FC<Props> = React.memo(({ className }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const saveOnMain = async () => {
    setIsClicked(true);
  };

  return (
    <MenuButton
      title={isClicked ? 'Сохранено на главную!' : 'Сохранить на главную'}
      icon={addToMainIcon}
      className={`${className} whitespace-nowrap`}
      handler={saveOnMain}
    />
  );
});

export default TrackSaveOnMainButton;
