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
          border-2
          border-solid
          border-background-hight
          focus:outline-none
          focus:border-2
          focus:border-solid
          hover:border-background-hight
          focus:border-background-hight
          md:focus:border-2
          md:focus:border-solid
          md:focus:border-secondary-picton-blue
          md:hover:border-background-hight
          disabled:bg-secondary-cadet-gray
          disabled:cursor-not-allowed
          disabled:shadow-button-default
          sm:bg-primary-poppy
          sm:py-1.5
          sm:px-4
          sm:shadow-button-default
          sm:active:shadow-button-active
          sm:active:bg-primary-madder
          sm:hover:bg-primary-fire-brick
          lg:hover:bg-primary-fire-brick
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
