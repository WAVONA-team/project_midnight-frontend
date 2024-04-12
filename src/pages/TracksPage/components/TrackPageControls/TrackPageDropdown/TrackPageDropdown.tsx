import React, { useState } from 'react';

import { Menu } from '@headlessui/react';

import { MenuButton, SortButton } from '@/ui/Button';
import DropdownMenu from '@/ui/DropdowMenu/DropdownMenu.tsx';

import alphaSortIcon from '@/assets/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '@/assets/buttons/actionButtons/dateSortIcon.svg';
import defaultSortIcon from '@/assets/buttons/actionButtons/defaultSortIcon.svg';
import sourceSortIcon from '@/assets/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currentTitle, setCurrentTitle] = useState<string>('По умолчанию');

  const sortControls = [
    {
      title: 'По умолчанию',
      icon: defaultSortIcon,
      handler: (title: string) => sortHandler(title),
    },
    {
      title: 'По дате загрузки',
      icon: dateSortIcon,
      handler: (title: string) => sortHandler(title),
    },
    {
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: (title: string) => sortHandler(title),
    },
    {
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: (title: string) => sortHandler(title),
    },
  ];

  const sortHandler = (title: string) => {
    setCurrentTitle(title);
    setIsOpen(!isOpen);
  };

  return (
    <Menu as="div" className="relative">
      <SortButton
        title={currentTitle}
        handler={() => sortHandler(currentTitle)}
        isOpen={isOpen}
      />
      <DropdownMenu isOpen={isOpen} setIsOpen={setIsOpen}>
        {sortControls.map((control) => (
          <Menu.Item
            as={MenuButton}
            key={control.title}
            handler={() => control.handler(control.title)}
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
      </DropdownMenu>
    </Menu>
  );
});

export default TrackPageDropdown;
