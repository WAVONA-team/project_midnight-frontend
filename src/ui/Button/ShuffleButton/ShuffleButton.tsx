import React from 'react';

import ShuffleIcon from '@/assets/buttons/ShuffleIcon.svg';

type Props = {
  disabled?: boolean;
  handler: React.MouseEventHandler<HTMLButtonElement>;
};

const ShuffleButton: React.FC<Props> = React.memo(
  ({ disabled = false, handler = () => {} }) => {
    return (
      <div className="relative">
        <button
          onClick={handler}
          disabled={disabled}
          className="
          font-rubik
          transition-all
          duration-290
          py-1.5
          px-4
          font-normal
          text-base
          shadow-shuffle-button-default
          rounded-3xl
          tracking-wider
          bg-primary-poppy
          outline-none
          text-on-primary-anti-flash-white
          hover:bg-primary-fire-brick
          focus:outline-none
          active:shadow-shuffle-button-active
          active:bg-primary-madder
          disabled:bg-secondary-cadet-gray
          disabled:cursor-not-allowed
          disabled:shadow-shuffle-button-default
          "
        >
          <div className="relative flex">
            <img className="mr-4" src={ShuffleIcon} alt="shuffle" />
            <span>Перемешать</span>
          </div>
        </button>
      </div>
    );
  },
);

export default ShuffleButton;
