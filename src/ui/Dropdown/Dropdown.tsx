import React from 'react';

import { Menu } from '@headlessui/react';

type Props = {
  children: React.ReactNode;
};

const Dropdown: React.FC<Props> = React.memo(({ children }) => {
  return (
    <Menu.Items
      static
      className="fixed bottom-0 rounded-t-xl right-0 w-full flex-col bg-surface-eerie_black h-fit min-w-[254px] sm:absolute sm:top-8 sm:rounded-xl"
    >
      {children}
    </Menu.Items>
  );
});

export default Dropdown;
