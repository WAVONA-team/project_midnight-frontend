import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import addToPlaylistIcon from '../../../../../public/buttons/actionButtons/addToPlaylistIcon.svg';

type Props = {
  className?: string;
};

const AddToPlaylistButton: React.FC<Props> = React.memo(
  React.forwardRef(({ className }, ref) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const addToPlaylist = async () => {
      setIsClicked(true);
    };

    return (
      <MenuButton
        ref={ref as React.ForwardedRef<HTMLButtonElement>}
        title={isClicked ? 'Добавлено в плейлист!' : 'Добавить в плейлист'}
        icon={addToPlaylistIcon}
        className={`${className} whitespace-nowrap`}
        handler={addToPlaylist}
      />
    );
  }),
);

export default AddToPlaylistButton;
