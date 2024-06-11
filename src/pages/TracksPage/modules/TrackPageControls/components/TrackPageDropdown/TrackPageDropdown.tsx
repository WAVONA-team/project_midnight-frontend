import React, { useLayoutEffect, useRef, useState } from 'react';

import { Menu } from '@headlessui/react';

import Dropdown from '@/components/Dropdown/Dropdown.tsx';
import Portal from '@/components/Portal/Portal';

import { MenuButton, SortButton } from '@/ui/Button';

import alphaSortIcon from '../../../../../../../public/buttons/actionButtons/alphaSortIcon.svg';
import dateSortIcon from '../../../../../../../public/buttons/actionButtons/dateSortIcon.svg';
import defaultSortIcon from '../../../../../../../public/buttons/actionButtons/defaultSortIcon.svg';
import sourceSortIcon from '../../../../../../../public/buttons/actionButtons/sourceSortIcon.svg';

const TrackPageDropdown: React.FC = React.memo(() => {
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
    <Menu as="div">
      <div
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
      </div>
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
          "
          isOpen={isOpen}
          modalOnCloseHandler={modalOnCloseHandler}
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
