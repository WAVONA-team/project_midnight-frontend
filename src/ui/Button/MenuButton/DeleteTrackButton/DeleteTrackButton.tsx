import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import deleteIcon from '../../../../../public/buttons/actionButtons/deleteIcon.svg';

type Props = {
  className?: string;
};

const DeleteTrackButton: React.FC<Props> = React.memo(
  React.forwardRef(({ className }, ref) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const deleteTrack = async () => {
      setIsClicked(true);
    };

    return (
      <MenuButton
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        title={isClicked ? 'Удалено!' : 'Удалить'}
        icon={deleteIcon}
        className={`${className}`}
        handler={deleteTrack}
      />
    );
  }),
);

export default DeleteTrackButton;
