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

  useLayoutEffect(() => {
    if (element) {
      setCurrentElem(element);
    }
  }, [element]);

  return (
    currentElem &&
    createPortal(
      <AnimatePresence>{openPortal && children}</AnimatePresence>,
      currentElem,
    )
  );
};

export default Portal;
