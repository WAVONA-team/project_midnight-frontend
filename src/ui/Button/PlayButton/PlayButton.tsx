import React from 'react';

import { AnimatePresence, motion, useAnimationControls } from 'framer-motion';

import pauseIcon from '@/assets/buttons/playerButtons/pauseIcon.svg';
import playIcon from '@/assets/buttons/playerButtons/playIcon.svg';

type Props = {
  isPlay: boolean;
  toggle: (state: boolean) => void;
};

const PlayButton: React.FC<Props> = React.memo(({ toggle, isPlay = false }) => {
  const controls = useAnimationControls();

  const imageVariants = {
    initial: {
      scale: 1,
      opacity: 1,
      rotate: 0,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
    animate: {
      scale: 0,
      opacity: 0,
      rotate: 360,
      transition: {
        ease: 'easeInOut',
        duration: 0.3,
      },
    },
  };

  const handleClick = async () => {
    await controls.start('animate');
    toggle(!isPlay);
    controls.set('initial');
  };

  return (
    <motion.button
      onClick={handleClick}
      className="
        w-8
        h-8
        lg:h-16
        lg:w-16
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
            variants={imageVariants}
            initial="initial"
            animate={controls}
            className="
              w-4
              h-4
              lg:h-8
              lg:w-8
              select-none
              focus:outline-none
            "
            src={pauseIcon}
            alt="pause"
          />
        ) : (
          <motion.img
            variants={imageVariants}
            initial="initial"
            animate={controls}
            className="
              w-4
              h-4
              lg:h-8
              lg:w-8
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
