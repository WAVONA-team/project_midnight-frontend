import React from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion, useAnimate } from 'framer-motion';

import pauseIcon from '../../../../public/buttons/playerButtons/pauseIcon.svg';
import playIcon from '../../../../public/buttons/playerButtons/playIcon.svg';

type Props = {
  className?: string;
};

const PlayButton: React.FC<Props> = React.memo(({ className }) => {
  const [scope, animate] = useAnimate();

  const { playerState, changePlayerState } = useStore(
    ({ playerState, changePlayerState }) => ({
      playerState,
      changePlayerState,
    }),
  );

  const handleClick = async () => {
    changePlayerState(!playerState);

    await animate(
      'img',
      { scale: 0, opacity: 0, rotate: 360 },
      { duration: 0.3 },
    );
    await animate(
      'img',
      { scale: 1, opacity: 1, rotate: 0 },
      { duration: 0.3 },
    );
  };

  return (
    <motion.button
      onClick={handleClick}
      ref={scope}
      className={`
        ${className}
        
        lg:h-[62px]
        lg:w-[62px]
        flex
        justify-center
        items-center
        bg-play-button-small-gradient-default
        shadow-button-default
        outline-none
        rounded-full
        lg:bg-play-button-big-gradient-default
        focus:outline-none
        lg:hover:bg-play-button-big-gradient-hover
      `}
    >
      <AnimatePresence>
        {playerState ? (
          <motion.img
            className="
              w-4
              h-4
              lg:h-6
              lg:w-6
              select-none
              focus:outline-none
            "
            src={pauseIcon}
            alt="pause"
          />
        ) : (
          <motion.img
            className="
              w-4
              h-4
              lg:h-6
              lg:w-6
              select-none
              focus:outline-none
            "
            src={playIcon}
            alt="play"
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
});

export default PlayButton;
