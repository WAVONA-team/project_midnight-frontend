import React from 'react';

import ShuffleIcon from '../../assets/buttons/ShuffleIcon.svg';

type Props = {
  title?: string;
  disabled?: boolean;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
}

const ShuffleButton: React.FC<Props> = React.memo(({title, disabled, handler}) => {
  return (
    <div className="relative">
      <button onClick={handler} disabled={disabled} className="font-rubik
      py-1.5
      px-4
      font-normal
      text-base
      shadow-shuffle-button-lite
      rounded-3xl
      tracking-wider
      bg-primary-poppy
      outline-none
      transition-all
      text-primary-madder
      hover:bg-primary-fire-brick
      focus:outline-none
      active:blur-sm
      active:shadow-shuffle-button-hard
      active:bg-primary-madder
      disabled:bg-secondary-cadet-gray
      disabled:cursor-not-allowed
      disabled:blur-none
      disabled:shadow-none
      duration-290">
        <div className="relative flex">
          <img className={title && 'mr-4'} src={ShuffleIcon} alt="shuffle" />
          {title}
        </div>
      </button>

      <div className="font-rubik
      pointer-events-none
      flex
      absolute
      left-0
      top-0
      font-normal
      text-base
      tracking-wider
      text-on-primary-anti-flash-white
      py-1.5
      px-4">
        <img className={title && 'mr-4'} src={ShuffleIcon} alt="shuffle" />
        {title}
      </div>
    </div>
  )
  ;
});

export default ShuffleButton;
