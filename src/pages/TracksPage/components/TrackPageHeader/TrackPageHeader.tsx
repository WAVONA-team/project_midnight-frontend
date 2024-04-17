import React, { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import TracksPageHeaderMobile from '@/pages/TracksPage/components/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deviceSize, changeDeviceSize] = useState(window.innerWidth);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValueHandler = () => {
    setValue('');
  };

  useEffect(() => {
    window.addEventListener('resize', () =>
      changeDeviceSize(window.innerWidth),
    );

    if (deviceSize >= 1024) {
      setIsOpen(true);
    }
  }, [isOpen, deviceSize]);

  return (
    <div className="mb-8 md:mb-12">
      <TracksPageHeaderMobile handler={() => setIsOpen(!isOpen)} />
      <AnimatePresence initial={false}>
        {isOpen && (
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
        )}
      </AnimatePresence>
    </div>
  );
});

export default TrackPageHeader;
