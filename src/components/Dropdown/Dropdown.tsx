import React from 'react';

import { Menu, Transition } from '@headlessui/react';
import classNames from 'classnames';

import cross from '@/assets/cross/cross.svg';

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode;
  headerItem?: React.ReactNode;
  className?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Dropdown: React.FC<Props> = React.memo(
  ({ children, title, headerItem, className = '', isOpen, setIsOpen }) => {
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
          className={`
          ${className}
            fixed
            bottom-0
            right-0
            w-full
            rounded-t-xl
            flex-col
          bg-surface-eerie_black

            h-fit
            sm:rounded-xl
        
            z-20
          `}
        >
          <div
            className="sm:hidden px-4 mb-3"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className={classNames(
                'font-rubik text-on-primary-anti-flash-white text-base font-semibold tracking-wide flex justify-end',
                {
                  ['justify-between items-center']: title,
                },
              )}
            >
              {title}
              <img src={cross} alt="cross" onClick={() => setIsOpen(false)} />
            </div>
            {headerItem}
          </div>
          <Menu.Items onClick={() => setIsOpen(false)} as="div" static>
            {children}
          </Menu.Items>
        </Transition>
      </div>
    );
  },
);

export default Dropdown;
