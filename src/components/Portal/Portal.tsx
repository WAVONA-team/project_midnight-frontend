import { FC, ReactNode, useEffect, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';

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

  return currentElem && openPortal ? createPortal(children, currentElem) : null;
};

export default Portal;
