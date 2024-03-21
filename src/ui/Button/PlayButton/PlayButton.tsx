import React from 'react';

import { AnimatePresence, motion, useAnimate } from 'framer-motion';

import pauseIcon from '@/assets/buttons/playerButtons/pauseIcon.svg';
import playIcon from '@/assets/buttons/playerButtons/playIcon.svg';

type Props = {
  isPlay: boolean;
  toggle: (state: boolean) => void;
};

const PlayButton: React.FC<Props> = React.memo(({ toggle, isPlay = false }) => {
  const [scope, animate] = useAnimate();

  const handleClick = async () => {
    toggle(!isPlay);
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
      className="
        w-8
        h-8
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
      "
    >
      <AnimatePresence>
        {isPlay ? (
          <motion.img
            initial="initial"
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
            initial="initial"
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
