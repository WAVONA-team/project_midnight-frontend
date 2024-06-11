import { FC, ReactNode, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { AnimatePresence } from 'framer-motion';

type Props = {
  element: HTMLElement | null;
  children: ReactNode;
  openPortal?: boolean;
};

const Portal: FC<Props> = ({ element, children, openPortal }) => {
  const [currentElem, setCurrentElem] = useState<HTMLElement>();
  const [isOpenPortal, setIsOpenPortal] = useState<boolean | undefined>(false);

  useLayoutEffect(() => {
    if (element) {
      setCurrentElem(element);
    }
  }, [element]);

  useLayoutEffect(() => {
    openPortal ? setIsOpenPortal(true) : setIsOpenPortal(false);
  }, [openPortal]);

  return (
    currentElem === element &&
    currentElem &&
    createPortal(
      <AnimatePresence>{isOpenPortal && children}</AnimatePresence>,
      currentElem,
    )
  );
};

export default Portal;
