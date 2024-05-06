import React, { useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import TracksPageHeaderMobile from '@/pages/TracksPage/modules/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const [value, setValue] = useState<string>('');

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValueHandler = () => {
    setValue('');
  };

  return (
    <Container className="mb-8 md:mb-12">
      <div className="lg:hidden">
        <TracksPageHeaderMobile />
      </div>

      <div className="hidden lg:block">
        <AnimatePresence initial={false}>
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SearchInput
              className={'lg:max-w-[398px] col-span-3'}
              clearValue={clearValueHandler}
              placeholder="Название, исполнитель..."
              value={value}
              onChange={onChangeHandler}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
});

export default TrackPageHeader;
