import React from 'react';

import shuffleIcon from '@/assets/buttons/playerButtons/shuffleIcon.svg';

type Props = {
  title: string;
  className?: string;
  disabled?: boolean;
  handler: React.MouseEventHandler<HTMLButtonElement>;
};

const ShuffleButton: React.FC<Props> = React.memo(
  ({ title, className, disabled = false, handler = () => {} }) => {
    return (
      <div className={className}>
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
          shadow-button-default
          rounded-3xl
          tracking-wider
          bg-primary-poppy
          outline-none
          text-on-primary-anti-flash-white
          hover:bg-primary-fire-brick
          focus:outline-none
          active:shadow-button-active
          active:bg-primary-madder
          disabled:bg-secondary-cadet-gray
          disabled:cursor-not-allowed
          disabled:shadow-button-default
          "
        >
          <div className="flex">
            <img className={title && 'mr-4'} src={shuffleIcon} alt="shuffle" />
            <span>{title}</span>
          </div>
        </button>
      </div>
    );
  },
);

export default ShuffleButton;
