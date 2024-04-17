import React, { useState } from 'react';

import { useAnimate } from 'framer-motion';

import TracksPageHeaderMobile from '@/pages/TracksPage/components/TracksPageHeaderMobile/TracksPageHeaderMobile.tsx';

import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [scope, animate] = useAnimate();

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValueHandler = () => {
    setValue('');
  };

  const handleClick = async () => {
    await animate('label', { height: 0 }, { duration: 0.1 });
    setIsOpen(!isOpen);
    await animate('label', { height: 60 }, { duration: 0.1 });
  };

  return (
    <div ref={scope} className="mb-12">
      <TracksPageHeaderMobile handler={handleClick} />
      <SearchInput
        className={`${!isOpen && 'hidden'} lg:block lg:max-w-[398px] col-span-3`}
        clearValue={clearValueHandler}
        placeholder="Название, исполнитель..."
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
});

export default TrackPageHeader;
