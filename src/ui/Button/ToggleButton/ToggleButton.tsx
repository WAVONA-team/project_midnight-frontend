import React from 'react';

import { useStore } from '@/store';

type Props = {
  leftTitle: string;
  rightTitle: string;
  isFavoriteTracks: boolean;
  setIsFavoriteTracks: React.Dispatch<React.SetStateAction<boolean>>;
};

const ToggleButton: React.FC<Props> = React.memo(
  ({ leftTitle, rightTitle, isFavoriteTracks, setIsFavoriteTracks }) => {
    const { setIsUserTracksLoading, clearUserTracks } = useStore(
      ({ setIsUserTracksLoading, clearUserTracks }) => ({
        setIsUserTracksLoading,
        clearUserTracks,
      }),
    );

    const handleChange = (value: boolean) => {
      if (isFavoriteTracks === value) return;
      setIsFavoriteTracks(value);
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
        <label className="cursor-pointer">
          <button onClick={() => handleChange(false)} />
          <span
            className={`
              transition-all 
              duration-200 
              flex 
              items-center 
              rounded-l
              px-6 
              py-3 
              text-sm 
              font-medium
              ${!isFavoriteTracks ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
              `}
          >
            <p
              className={`
                ${isFavoriteTracks && 'text-secondary-cadet-gray'} 
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
            </p>
          </span>
        </label>

        <label className="cursor-pointer">
          <button onClick={() => handleChange(true)} />
          <span
            className={`
              transition-all 
              duration-200 
              flex 
              items-center
              rounded-r
              px-6 
              py-3 
              text-sm 
              font-medium
              ${isFavoriteTracks ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
              `}
          >
            <p
              className={`
                ${!isFavoriteTracks && 'text-secondary-cadet-gray'} 
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
            </p>
          </span>
        </label>
      </div>
    );
  },
);

export default ToggleButton;
