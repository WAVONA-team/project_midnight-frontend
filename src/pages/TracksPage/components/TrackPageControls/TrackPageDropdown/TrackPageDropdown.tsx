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

  const sortControls = [
    {
      title: 'По умолчанию',
      icon: defaultSortIcon,
      handler: () => {},
    },
    {
      title: 'По дате загрузки',
      icon: dateSortIcon,
      handler: () => {},
    },
    {
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: () => {},
    },
    {
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: () => {},
    },
  ];

  return (
    <Menu as="div" className="sm:relative">
      <SortButton
        title="По умолчанию"
        handler={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />

      {isOpen && (
        <Dropdown>
          {/*<div className="p-4 flex w-full h-full justify-between sm:hidden">*/}
          {/*  <h3 className="font-semibold">Фильтры</h3>*/}
          {/*  <button onClick={() => setIsOpen(false)}>*/}
          {/*    <img src={cross} alt="Cross" />*/}
          {/*  </button>*/}
          {/*</div>*/}
          {sortControls.map((controls) => (
            <MenuButton
              key={controls.title}
              handler={controls.handler}
              icon={controls.icon}
              title={controls.title}
              className="last:border-b-0 last:rounded-b-xl first:rounded-t-xl first:hover:rounded-t-xl"
            />
          ))}
        </Dropdown>
      )}
    </Menu>
  );
});

export default TrackPageDropdown;
