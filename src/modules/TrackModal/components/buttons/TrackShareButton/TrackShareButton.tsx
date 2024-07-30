import React, { useState } from 'react';
import toast from 'react-hot-toast';

import shareIcon from '@/../public/buttons/actionButtons/shareIcon.svg';
import copy from 'copy-to-clipboard';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';
import { NotificationMessage } from '@/ui/NotificationMessage';

type Props = {
  className?: string;
  selectedTrack: Track;
};

const TIME_DELAY = 2000;

const TrackShareButton: React.FC<Props> = React.memo(
  React.forwardRef(
    (
      { className, selectedTrack },
      ref: React.ForwardedRef<HTMLButtonElement>,
    ) => {
      const [isClicked, setIsClicked] = useState<boolean>(false);

      let timeId: NodeJS.Timeout | null;

      const copyToClipboard = () => {
        if (selectedTrack.url) {
          copy(selectedTrack.url);
          if (timeId) {
            clearTimeout(timeId);
          }

          setIsClicked(true);

          timeId = setTimeout(() => {
            setIsClicked(false);
          }, TIME_DELAY);

          toast.custom(() => (
            <NotificationMessage message="Ссылка скопирована" />
          ));
        }
      };

      return (
        <MenuButton
          ref={ref}
          title={isClicked ? 'Скопировано!' : 'Поделиться'}
          icon={shareIcon}
          handler={copyToClipboard}
          className={className}
        />
      );
    },
  ),
);

export default TrackShareButton;
