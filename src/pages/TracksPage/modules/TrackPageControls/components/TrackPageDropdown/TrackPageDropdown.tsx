import React, { useLayoutEffect, useRef, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';
import { Track } from 'project_midnight';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

import { MenuButton, SortButton } from '@/ui/Button';

import alphaSortIcon from '../../../../../../../public/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '../../../../../../../public/buttons/actionButtons/dateSortIcon.svg';
import sourceSortIcon from '../../../../../../../public/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
  const { setCurrentPage, clearUserTracks } = useStore(
    ({ setCurrentPage, clearUserTracks }) => ({
      setCurrentPage,
      clearUserTracks,
    }),
  );
  const { setOrder, setSortType, setIsFiltering } = tracksSearchPageSlice(
    ({ setOrder, setSortType, setIsFiltering }) => ({
      setOrder,
      setSortType,
      setIsFiltering,
    }),
  );
  const [isOpen, setIsOpen] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (window.innerWidth < 640) {
      if (isOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }

      return () => {
        document.body.classList.remove('overflow-hidden');
      };
    }
  }, [isOpen]);

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
  const reset = () => {
    clearUserTracks();
    setCurrentPage(1);
    setIsFiltering(true);
  };
  const setSortingInfo = (
    title: string,
    sortType: keyof Track,
    order: 'desc' | 'asc',
  ) => {
    setSortType(sortType);
    setOrder(order);
    setCurrentTitle(title);
    setIsOpen(!isOpen);
    reset();
  };

  const handlerModal = ({
    currentTarget,
  }: React.MouseEvent<HTMLDivElement> & { trackId?: string }) => {
    if (currentTarget === childElement) {
      setIsOpen((state) => !state);
    } else {
      const element = currentTarget as HTMLElement;

      setChildElement(element);

      setIsOpen((state) => !state);
    }
  };

  const modalOnBlurHandler = () => {
    setIsOpen(false);
  };

  const modalOnCloseHandler = () => {
    setIsOpen(false);
  };

  const handlerButtonFocus = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (ref.current) {
      (ref.current as HTMLDivElement).focus();
    }
  };

  return (
    <Menu
      as="div"
      className="relative"
      ref={ref}
      onClick={handlerModal}
      onBlur={modalOnBlurHandler}
      tabIndex={0}
    >
      <SortButton
        title={currentTitle}
        isOpen={isOpen}
        onMouseDown={handlerButtonFocus}
      />

      <Portal openPortal={isOpen} element={childElement}>
        <Dropdown
          className="
          sm:right-0
          sm:top-8
          sm:w-[254px]
          sm:absolute
          py-4
          sm:py-0
          shadow-[16px_-16px_16px_0px_#0C0D0B80]
          overflow-hidden
          "
          modalOnCloseHandler={modalOnCloseHandler}
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
      </Portal>
    </Menu>
  );
});

export default TrackPageDropdown;
