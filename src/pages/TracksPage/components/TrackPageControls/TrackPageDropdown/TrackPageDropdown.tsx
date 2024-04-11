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
      handler: () => {
        setCurrentTitle('По умолчанию');
        setIsOpen(false);
      },
    },
    {
      title: 'По дате загрузки',
      icon: dateSortIcon,
      handler: () => {
        setCurrentTitle('По дате загрузки');
        setIsOpen(false);
      },
    },
    {
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: () => {
        setCurrentTitle('По алфавиту');
        setIsOpen(false);
      },
    },
    {
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: () => {
        setCurrentTitle('По источнику');
        setIsOpen(false);
      },
    },
  ];

  return (
    <Menu as="div" className="relative">
      <SortButton
        title={currentTitle}
        handler={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />

      <DropdownMenu isOpen={isOpen}>
        {sortControls.map((controls) => (
          <Menu.Item
            handler={controls.handler}
            icon={controls.icon}
            title={controls.title}
            className="last:border-b-0 last:rounded-b-xl first:rounded-t-xl first:hover:rounded-t-xl"
            as={MenuButton}
            key={controls.title}
          />
        ))}
      </DropdownMenu>
    </Menu>
  );
});

export default TrackPageDropdown;
