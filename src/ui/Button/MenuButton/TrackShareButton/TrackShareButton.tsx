import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

import shareIcon from '../../../../../public/buttons/actionButtons/shareIcon.svg';

type Props = {
  trackName: string;
  trackUrl: string;
  className?: string;
};

const TIME_DELAY = 20000;

const TrackShareButton: React.FC<Props> = React.memo(
  ({ trackName, trackUrl, className }) => {
    const [isClicked, setIsClicked] = useState<boolean>(false);
    let timeId: NodeJS.Timeout | null;

    const copyToClipboard = async () => {
      if (!navigator.share) {
        await navigator.clipboard.writeText(trackUrl);

        if (timeId) {
          clearTimeout(timeId);
        }

        setIsClicked(true);

        timeId = setTimeout(() => {
          setIsClicked(false);
        }, TIME_DELAY);
      } else {
        const shareData = {
          title: trackName,
          url: trackUrl,
        };
        await navigator.share(shareData);
      }
    };

    return (
      <MenuButton
        title={isClicked ? 'Скопировано!' : 'Поделиться'}
        icon={shareIcon}
        className={`${className}`}
        handler={copyToClipboard}
        className={className}
      />
    );
  },
);

export default TrackShareButton;
