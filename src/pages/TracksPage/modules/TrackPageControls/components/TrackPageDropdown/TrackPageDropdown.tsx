import React, { useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { Track } from 'project_midnight';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';

import { MenuButton, SortButton } from '@/ui/Button';

import alphaSortIcon from '../../../../../../../public/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '../../../../../../../public/buttons/actionButtons/dateSortIcon.svg';
import sourceSortIcon from '../../../../../../../public/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
  const {
    setCurrentPage,
    setOrder,
    setSortType,
    clearUserTracks,
    setIsUserTracksLoading,
    setIsFiltering,
  } = useStore(
    ({
      setCurrentPage,
      setOrder,
      setSortType,
      clearUserTracks,
      setIsUserTracksLoading,
      setIsFiltering,
    }) => ({
      setCurrentPage,
      setOrder,
      setSortType,
      clearUserTracks,
      setIsUserTracksLoading,
      setIsFiltering,
    }),
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const sortControls = [
    {
      id: 1,
      title: 'По дате загрузки',
      icon: dateSortIcon,
      handler: (title: string) => setSortingInfo(title, 'createdAt', 'desc'),
    },
    {
      id: 2,
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: (titles: string) => setSortingInfo(titles, 'title', 'asc'),
    },
    {
      id: 3,
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: (title: string) => setSortingInfo(title, 'source', 'desc'),
    },
  ];

  const [currentTitle, setCurrentTitle] = useState<string>(
    sortControls[0].title,
  );
  const setSortingInfo = (
    title: string,
    sortType: keyof Track,
    order: 'desc' | 'asc',
  ) => {
    setIsUserTracksLoading(true);
    setIsFiltering(true);
    clearUserTracks();
    setCurrentPage(1);
    setSortType(sortType);
    setOrder(order);
    setCurrentTitle(title);
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
      </Dropdown>
    </Menu>
  );
});

export default TrackPageDropdown;
