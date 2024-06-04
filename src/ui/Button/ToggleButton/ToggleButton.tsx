import React, { useState } from 'react';

type Props = {
  leftTitle: string;
  rightTitle: string;
};

const ToggleButton: React.FC<Props> = React.memo(
  ({ leftTitle, rightTitle }) => {
    const [isCheckedAllTracks, setCheckedAllTracks] = useState(true);
    const [isCheckedFavoriteTracks, setCheckedFavoriteTracks] = useState(false);

    const handleAllTracksChange = () => {
      if (!isCheckedAllTracks) {
        setCheckedAllTracks(true);
        setCheckedFavoriteTracks(false);
      }
    };

    const handleFavoriteTracksChange = () => {
      if (!isCheckedFavoriteTracks) {
        setCheckedFavoriteTracks(true);
        setCheckedAllTracks(false);
      }
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
          <input
            type="checkbox"
            className="sr-only"
            checked={isCheckedAllTracks}
            onChange={handleAllTracksChange}
          />
          <span
            className={`
              transition-all 
              duration-200 
              flex 
              items-center 
              rounded
              px-6 
              py-3 
              text-sm 
              font-medium
              ${isCheckedAllTracks ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
              `}
          >
            <p
              className={`
                ${!isCheckedAllTracks && 'text-secondary-cadet-gray'} 
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
          <input
            type="checkbox"
            className="sr-only"
            checked={isCheckedFavoriteTracks}
            onChange={handleFavoriteTracksChange}
          />
          <span
            className={`
              transition-all 
              duration-200 
              flex 
              items-center
              rounded 
              px-6 
              py-3 
              text-sm 
              font-medium
              ${isCheckedFavoriteTracks ? 'bg-surface-eerie_black sm:bg-primary-madder' : 'bg-[transparent] sm:bg-secondary-eerie-black-light'}
              `}
          >
            <p
              className={`
                ${!isCheckedFavoriteTracks && 'text-secondary-cadet-gray'} 
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
