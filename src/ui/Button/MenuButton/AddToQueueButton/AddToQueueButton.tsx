import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import addToQueueIcon from '../../../../../public/buttons/actionButtons/addTrackIcon.svg';

type Props = {
  className?: string;
};

const AddToQueueButton: React.FC<Props> = React.memo(
  React.forwardRef(({ className }, ref) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const addToQueue = async () => {
      setIsClicked(true);
    };

    return (
      <MenuButton
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        title={isClicked ? 'Добавлено в очередь!' : 'Добавить в очередь'}
        icon={addToQueueIcon}
        className={`${className}`}
        handler={addToQueue}
      />
    );
  }),
);

export default AddToQueueButton;
