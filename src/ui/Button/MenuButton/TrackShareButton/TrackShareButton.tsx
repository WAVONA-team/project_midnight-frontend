import React, { useState } from 'react';

import MenuButton from '@/ui/Button/MenuButton/MenuButton.tsx';

<<<<<<< HEAD
// import { classNames } from '@/ui/Input/classNames';
import shareIcon from '@/assets/buttons/actionButtons/shareIcon.svg';
=======
import shareIcon from '../../../../../public/buttons/actionButtons/shareIcon.svg';
>>>>>>> 5ba3934a2c7d46eff3733a6fb31ebc951013fc14

type Props = {
  trackName: string;
  trackUrl: string;
<<<<<<< HEAD
  className: string;
=======
  className?: string;
>>>>>>> 5ba3934a2c7d46eff3733a6fb31ebc951013fc14
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
