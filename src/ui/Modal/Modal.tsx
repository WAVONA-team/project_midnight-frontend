import React, { useEffect } from 'react';

import { AnimatePresence, useAnimate } from 'framer-motion';

type Props = {
  isActive: boolean;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<Props> = React.memo(
  ({ isActive, setIsActive, children, className = '' }) => {
    const [scope, animate] = useAnimate();

    useEffect(() => {
      if (isActive) {
        animate(scope.current, { opacity: 1, scale: 1 });
        animate('div', { scale: 1, opacity: 1 }, { duration: 0.3 });
        document.body.classList.add('overflow-y-hidden');
      } else {
        animate(scope.current, { opacity: 0, scale: 0 });
        animate('div', { scale: 0, opacity: 0 }, { duration: 0.3 });
        document.body.classList.remove('overflow-y-hidden');
      }
    }, [animate, isActive, scope]);

    return (
      <AnimatePresence>
        <div
          onClick={() => setIsActive(false)}
          ref={scope}
          className={`
            ${className}
            bg-surface-black/60
            w-full
            h-full
            fixed
            top-0
            flex
            left-0
            items-center
            justify-center
            font-rubik
          `}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="
              p-6
              shadow-modal-content
              bg-surface-eerie_black
              min-w-[354px]
              w-fit
              min-h-[182px]
              h-fit
          "
          >
            {children}
          </div>
        </div>
      </AnimatePresence>
    );
  },
);

export default Modal;
