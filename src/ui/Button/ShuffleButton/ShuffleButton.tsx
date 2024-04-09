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
      <button
        onClick={handler}
        disabled={disabled}
        className={`
          ${className}
          font-rubik
          transition-all
          duration-290
          font-normal
          text-base
          rounded-3xl
          tracking-wider
          outline-none
          text-on-primary-anti-flash-white
          focus:outline-none
          disabled:bg-secondary-cadet-gray
          disabled:cursor-not-allowed
          disabled:shadow-button-default
          `}
      >
        <div className="flex">
          <img className={title && 'mr-4'} src={shuffleIcon} alt="shuffle" />
          <span>{title}</span>
        </div>
      </button>
    );
  },
);

export default ShuffleButton;
