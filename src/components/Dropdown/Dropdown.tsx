import React, { MouseEventHandler } from 'react';

import cross from '@/../public/cross/cross.svg';
import { Menu } from '@headlessui/react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type Props = {
  children: React.ReactNode;
  title?: React.ReactNode;
  headerItem?: React.ReactNode;
  className?: string;
  modalOnCloseHandler: () => void;
  width?: string;
};

const Dropdown: React.FC<Props> = React.memo(
  ({ children, title, headerItem, className = '', modalOnCloseHandler }) => {
    const overlayClickHandler: MouseEventHandler<HTMLDivElement> = (e) => {
      if (e.currentTarget === e.target) modalOnCloseHandler();
    };

    return (
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          duration: 0.2,
        }}
        exit={{
          opacity: 0,
        }}
        className={`
            fixed
            sm:static
            z-50
            left-0
            top-0
            w-full
            h-full
          bg-surface-eerie_black/60
    `}
        onClick={overlayClickHandler}
      >
        <motion.div
          className={`${className}
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
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.1,
          }}
          exit={{
            opacity: 0,
          }}
        >
          <Menu.Items
            onMouseDown={(e) => {
              e.preventDefault();
            }}
            as="div"
            static
          >
            <Menu.Item
              as="div"
              className="sm:hidden px-4 mb-3 "
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
                <img src={cross} alt="cross" onClick={modalOnCloseHandler} />
              </div>
              {headerItem}
            </Menu.Item>
            {children}
          </Menu.Items>
        </motion.div>
      </motion.div>
    );
  },
);

export default Dropdown;
