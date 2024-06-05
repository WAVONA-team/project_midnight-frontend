import React from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import TrackPageDropdown from '@/pages/TracksPage/modules/TrackPageControls/components/TrackPageDropdown/TrackPageDropdown.tsx';

import { ShuffleButton } from '@/ui/Button';
import { Container } from '@/ui/Container';

type Props = {
  title: string;
};

const TrackPageControls: React.FC<Props> = React.memo(({ title }) => {
  return (
    <Container
      className="
        flex
        flex-col
        mb-12
        lg:flex-row
      "
    >
      <AnimatePresence>
        <motion.div
          className="mr-5 xl:mr-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h1
            className="
            font-rubik
            font-semibold
            text-2xl
            tracking-wide
            whitespace-nowrap
            lg:font-openSans
            lg:font-normal
            lg:font-3xl
          "
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h1>
        </motion.div>
      </AnimatePresence>

      <div
        className="
          mt-4
          lg:mt-0
          flex
          justify-between
          sm:w-full
          items-center
        "
      >
        <ShuffleButton handler={() => {}} title="Перемешать" />
        <TrackPageDropdown />
      </div>
    </Container>
  );
});

export default TrackPageControls;
