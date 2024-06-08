import React from 'react';

import { useStore } from '@/store';

type Props = {
  leftTitle: string;
  rightTitle: string;
  isFavouriteTracksLoading: boolean;
  setIsFavouriteTracksLoading: (state: boolean) => void;
};

const ToggleButton: React.FC<Props> = React.memo(
  ({
    leftTitle,
    rightTitle,
    isFavouriteTracksLoading,
    setIsFavouriteTracksLoading,
  }) => {
    const { setIsUserTracksLoading, clearUserTracks } = useStore(
      ({ setIsUserTracksLoading, clearUserTracks }) => ({
        setIsUserTracksLoading,
        clearUserTracks,
      }),
    );

    const handleChange = (value: boolean) => {
      if (isFavouriteTracksLoading === value) return;
      setIsFavouriteTracksLoading(value);
      clearUserTracks();
      setIsUserTracksLoading(true);
    };

    return (
      <div
        className="
          flex
          items-center
          max-w-[245px]
          text-nowrap
        "
      >
        <button
          className={`
            transition-all 
            duration-200 
            flex 
            outline-none
            items-center 
            rounded-l
            px-6 
            py-3 
            text-sm 
            font-medium
            focus:outline-none
            ${!isFavouriteTracksLoading ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
          `}
          onClick={() => handleChange(false)}
        >
          <span
            className={`
              ${isFavouriteTracksLoading && 'text-secondary-cadet-gray'} 
              transition-all 
              duration-200 
              text-on-primary-lavender-blush 
              font-rubik 
              font-normal 
              text-sm 
              tracking-wide
            `}
          >
            {leftTitle}
          </span>
        </button>

        <button
          className={`
            transition-all 
            duration-200 
            flex 
            outline-none
            items-center
            rounded-r
            px-6 
            py-3 
            text-sm 
            font-medium
            focus:outline-none
            ${isFavouriteTracksLoading ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
          `}
          onClick={() => handleChange(true)}
        >
          <span
            className={`
              ${!isFavouriteTracksLoading && 'text-secondary-cadet-gray'} 
              transition-all 
              duration-200 
              text-on-primary-lavender-blush 
              font-rubik 
              font-normal 
              text-sm 
              tracking-wide
            `}
          >
            {rightTitle}
          </span>
        </button>
      </div>
    );
  },
);

export default ToggleButton;
