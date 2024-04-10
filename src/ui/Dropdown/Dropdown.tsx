import React from 'react';

import { Menu, Transition } from '@headlessui/react';

type Props = {
  children: React.ReactNode;
  isOpen: boolean;
};

const Dropdown: React.FC<Props> = React.memo(({ children, isOpen }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <Menu.Items
        static
        className="absolute bottom-0 rounded-t-xl right-0 w-full flex-col bg-surface-eerie_black h-fit min-w-[254px] sm:absolute sm:top-8 sm:rounded-xl"
      >
        {children}
      </Menu.Items>
    </Transition>
  );
});

export default Dropdown;
