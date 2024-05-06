import React, { useState } from 'react';

import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

import { MenuButton, SortButton } from '@/ui/Button';

import alphaSortIcon from '../../../../../../../public/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '../../../../../../../public/buttons/actionButtons/dateSortIcon.svg';
import defaultSortIcon from '../../../../../../../public/buttons/actionButtons/defaultSortIcon.svg';
import sourceSortIcon from '../../../../../../../public/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);

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

  const [currentTitle, setCurrentTitle] = useState<string>(
    sortControls[0].title,
  );

  const sortHandler = (id: number) => {
    const control = sortControls.find((control) => control.id === id);
    setCurrentTitle(control!.title);
    setIsOpen(!isOpen);
  };

  const sortButtonHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    setChildElement(e.currentTarget);
    setIsOpen(!isOpen);
  };

  return (
    <Menu as="div" className="relative">
      <SortButton
        title={currentTitle}
        handler={sortButtonHandler}
        onBlur={() => setIsOpen(false)}
        isOpen={isOpen}
      />
      <Portal openPortal={isOpen} element={childElement}>
        <Dropdown
          className="
          sm:right-0
          sm:top-8
          sm:w-[254px]
          sm:absolute
          py-4
          sm:py-0"
          title="Фильтры"
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
      </Portal>
    </Menu>
  );
});

export default TrackPageDropdown;
