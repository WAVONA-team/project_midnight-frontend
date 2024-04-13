import React, { useState } from 'react';

import TrackPageActions from '@/pages/TracksPage/components/TrackPageHeader/TrackPageActions/TrackPageActions.tsx';
import TrackPageLogo from '@/pages/TracksPage/components/TrackPageHeader/TrackPageLogo/TrackPageLogo.tsx';

import { SearchInput } from '@/ui/Input';

const TrackPageHeader: React.FC = React.memo(() => {
  const [value, setValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const clearValueHandler = () => {
    setValue('');
  };

  return (
    <div className="grid grid-cols-2 justify-between mb-8">
      <TrackPageLogo />
      <TrackPageActions isOpen={isOpen} setIsOpen={setIsOpen} />
      <SearchInput
        className={`${!isOpen && 'hidden'} lg:block md:max-w-[398px] col-span-3`}
        clearValue={clearValueHandler}
        placeholder="Название, исполнитель..."
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
});

export default TrackPageHeader;
