import React, { useState } from 'react';

import { Menu, Transition } from '@headlessui/react';

import { MenuButton, SortButton } from '@/ui/Button';

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
    <Menu as="div" className="relative">
      <Menu.Button className="focus:outline-none">
        <SortButton
          title="По умолчанию"
          handler={() => setIsOpen(!isOpen)}
          isOpen={isOpen}
        />
      </Menu.Button>

      <Transition
        as="div"
        show={isOpen}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="sm:absolute rounded-t-xl sm:right-0 sm:top-8 w-[254px] flex-col m bg-surface-eerie_black h-fit sm:rounded-xl"
      >
        <Menu.Items as="div" static>
          {sortControls.map((controls) => (
            <Menu.Item key={controls.title}>
              <MenuButton
                handler={controls.handler}
                icon={controls.icon}
                title={controls.title}
                className="last:border-b-0 last:rounded-b-xl first:rounded-t-xl first:hover:rounded-t-xl"
              />
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
});

export default TrackPageDropdown;
