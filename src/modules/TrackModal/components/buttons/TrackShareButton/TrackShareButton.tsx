import React, { useState } from 'react';

import shareIcon from '@/../public/buttons/actionButtons/shareIcon.svg';
import { Track } from 'project_midnight';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

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

      const copyToClipboard = async () => {
        if (!navigator.share) {
          await navigator.clipboard.writeText(selectedTrack.url);

          if (timeId) {
            clearTimeout(timeId);
          }

          setIsClicked(true);

          timeId = setTimeout(() => {
            setIsClicked(false);
          }, TIME_DELAY);
        } else {
          const shareData = {
            title: selectedTrack.title,
            url: selectedTrack.url,
          };

          await navigator.share(shareData);
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
