import React from 'react';

import { Menu, Transition } from '@headlessui/react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenu: React.FC<Props> = React.memo(
  ({ children, isOpen, setIsOpen }) => {
    return (
      <div
        onClick={() => setIsOpen(false)}
        className={`${isOpen ? 'fixed opacity-100 sm:static' : 'opacity-0'} 
          z-20 
          transition-all 
          duration-200 
          left-0 
          top-0 
          w-full 
          h-full 
          bg-surface-eerie_black/60
        `}
      >
        <Transition
          as="div"
          show={isOpen}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
          className="
            fixed
            bottom-0
            right-0
            w-full
            rounded-t-xl
            sm:right-0
            sm:top-8
            sm:w-[254px]
            sm:absolute
            flex-col
            bg-surface-eerie_black
            h-fit
            sm:rounded-xl
            z-20
          "
        >
          <Menu.Items as="div" static>
            {children}
          </Menu.Items>
        </Transition>
      </div>
    );
  },
);

export default DropdownMenu;
