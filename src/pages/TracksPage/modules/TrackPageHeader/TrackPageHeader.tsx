import React, { useCallback, useState } from 'react';

import { useStore } from '@/store';
import { AnimatePresence, motion } from 'framer-motion';
import debounce from 'lodash.debounce';

import TracksPageHeaderMobile from '@/pages/TracksPage/modules/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import { Container } from '@/ui/Container';
import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const [value, setValue] = useState<string>('');

  const { user, getTracksByUser, currentPage, setTracks, clearUserTracks } =
    useStore(
      ({ user, getTracksByUser, currentPage, setTracks, clearUserTracks }) => ({
        user,
        getTracksByUser,
        currentPage,
        setTracks,
        clearUserTracks,
      }),
    );

  const getTracksByUserWrapper = useCallback((query: string) => {
    clearUserTracks();

    getTracksByUser(user!.id, currentPage, { query }).then((tracks) =>
      setTracks(tracks),
    );
  }, []);

  const debouncedGet = useCallback(debounce(getTracksByUserWrapper, 500), [
    getTracksByUserWrapper,
  ]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    debouncedGet(e.target.value);
  };

  const clearValueHandler = () => {
    setValue('');
    clearUserTracks();

    getTracksByUser(user!.id, currentPage).then((tracks) =>
      setTracks(tracks),
    );
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
