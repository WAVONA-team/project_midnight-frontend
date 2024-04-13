import React, { useState } from 'react';

import { Menu } from '@headlessui/react';

import { MenuButton, SortButton } from '@/ui/Button';
import Dropdown from '@/ui/Dropdown/Dropdown.tsx';

import alphaSortIcon from '@/assets/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '@/assets/buttons/actionButtons/dateSortIcon.svg';
import defaultSortIcon from '@/assets/buttons/actionButtons/defaultSortIcon.svg';
import sourceSortIcon from '@/assets/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>('По умолчанию');

  const sortControls = [
    {
      id: 1,
      title: 'По умолчанию',
      icon: defaultSortIcon,
      handler: (id: number) => sortHandler(id),
    },
    {
      id: 2,
      title: 'По дате загрузки',
      icon: dateSortIcon,
      handler: (id: number) => sortHandler(id),
    },
    {
      id: 3,
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: (id: number) => sortHandler(id),
    },
    {
      id: 4,
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: (id: number) => sortHandler(id),
    },
  ];

  const sortHandler = (id: number) => {
    const control = sortControls.find((control) => control.id === id);
    setCurrentTitle(control!.title);
    setIsOpen(!isOpen);
  };

  return (
    <Menu as="div" className="relative">
      <SortButton
        title={currentTitle}
        handler={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
      <Dropdown
        className="
          sm:right-0
          sm:top-8
          sm:w-[254px]
          sm:absolute"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {sortControls.map((control) => (
          <Menu.Item
            as={MenuButton}
            key={control.title}
            handler={() => control.handler(control.id)}
            icon={control.icon}
            title={control.title}
            className="
              last:border-b-0
              last:rounded-b-xl
              first:rounded-t-xl
              first:hover:rounded-t-xl
            "
          />
        ))}
      </Dropdown>
    </Menu>
  );
});

export default TrackPageDropdown;
