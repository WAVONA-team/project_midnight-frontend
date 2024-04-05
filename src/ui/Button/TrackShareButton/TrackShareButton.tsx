import React, { useState } from 'react';

import shareIcon from '@/assets/buttons/actionButtons/shareIcon.svg';

type Props = {
  trackName: string;
  trackUrl: string;
  className?: string;
};

const TIME_DELAY = 20000;

const TrackShareButton: React.FC<Props> = React.memo(
  ({ trackName, trackUrl, className = '' }) => {
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
      <button
        onClick={copyToClipboard}
        className={`
          ${className}
          bg-[inherit]
          w-full
          border-t-0
          border-l-0
          border-r-0
          border-b
          border-secondary-eerie-black-light
          border-solid
          outline-none
          focus:outline-none
          hover:border-secondary-eerie-black-light
        `}
      >
        <div className="flex p-4">
          <img src={shareIcon} alt="Share" />
          <span
            className="
              text-on-primary-anti-flash-white
              ml-4
              font-normal
              text-base
              tracking-widest
            "
          >
            {isClicked ? 'Скопировано!' : 'Поделиться'}
          </span>
        </div>
      </button>
    );
  },
);

export default TrackShareButton;
