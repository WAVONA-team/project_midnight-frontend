import React, { useLayoutEffect, useRef, useState } from 'react';

import { useStore } from '@/store';
import { Menu } from '@headlessui/react';

import { tracksSearchPageSlice } from '@/pages/TrackSearchPage/store';
import { SortType } from '@/pages/TrackSearchPage/store/types';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

import { MenuButton, SortButton } from '@/ui/Button';

import alphaSortIcon from '../../../../../../../public/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '../../../../../../../public/buttons/actionButtons/dateSortIcon.svg';
import sourceSortIcon from '../../../../../../../public/buttons/actionButtons/sourceSortIcon.svg';

export const TrackPageDropdown: React.FC = React.memo(() => {
  const { setCurrentPage, clearUserTracks } = useStore(
    ({ setCurrentPage, clearUserTracks }) => ({
      setCurrentPage,
      clearUserTracks,
    }),
  );
  const { sortType, setOrder, setSortType, setIsFiltering } =
    tracksSearchPageSlice(
      ({ sortType, setOrder, setSortType, setIsFiltering }) => ({
        sortType,
        setOrder,
        setSortType,
        setIsFiltering,
      }),
    );
  const [isOpen, setIsOpen] = useState(false);
  const [childElement, setChildElement] = useState<HTMLElement | null>(null);
  const ref = useRef(null);

  const { userTracks } = useStore(({ userTracks }) => ({
    userTracks,
  }));

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
      handler: (title: string) =>
        setSortingInfo({ name: title, type: 'createdAt' }, 'desc'),
    },
    {
      id: 2,
      title: 'По алфавиту',
      icon: alphaSortIcon,
      handler: (title: string) =>
        setSortingInfo({ name: title, type: 'title' }, 'asc'),
    },
    {
      id: 3,
      title: 'По источнику',
      icon: sourceSortIcon,
      handler: (title: string) =>
        setSortingInfo({ name: title, type: 'source' }, 'desc'),
    },
  ];

  const reset = () => {
    clearUserTracks();
    setCurrentPage(1);
    setIsFiltering(true);
  };

  const setSortingInfo = (sortType: SortType, order: 'desc' | 'asc') => {
    setSortType(sortType);
    setOrder(order);
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
      className="relative outline-none"
      ref={ref}
      onClick={handlerModal}
      onBlur={modalOnBlurHandler}
      tabIndex={0}
    >
      <SortButton
        title={sortType.name}
        isOpen={isOpen}
        disabled={!userTracks.length}
        onMouseDown={handlerButtonFocus}
      />

      <Portal openPortal={isOpen} element={childElement}>
        <Dropdown
          className="
            sm:right-0
            sm:top-8
            sm:w-[254px]
            sm:absolute
            bottom-[54px]
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
              handler={() =>
                control.handler(control.title || 'По дате загрузки')
              }
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
