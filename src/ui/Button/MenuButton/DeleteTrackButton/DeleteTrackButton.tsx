import React, { useState } from 'react';
import toast from 'react-hot-toast';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';
import { NotificationMessage } from '@/ui/NotificationMessage';

import deleteIcon from '../../../../../public/buttons/actionButtons/deleteIcon.svg';

type Props = {
  className?: string;
};

const DeleteTrackButton: React.FC<Props> = React.memo(
  React.forwardRef(({ className }, ref) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const deleteTrack = async () => {
      setIsClicked(true);

      toast.custom(() => <NotificationMessage message="Трек удалён" />);
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
