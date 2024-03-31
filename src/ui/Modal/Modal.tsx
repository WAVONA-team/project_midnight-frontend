import React from 'react';

type Props = {
  isActive: boolean;
  disableModal: (key: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<Props> = React.memo(
  ({ isActive = false, disableModal, children, className = '' }) => {
    return (
      <div
        onClick={() => disableModal(false)}
        className={`
            ${className}
            ${isActive ? 'opacity-1' : 'opacity-0 z-[-100]'}
            transition-all
            duration-100
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
          className={`
            ${isActive ? 'scale-100' : 'scale-0'}
              transition-all
              duration-200
              p-6
              shadow-modal-content
              bg-surface-eerie_black
              min-w-[354px]
              max-w-fit
              min-h-[182px]
              max-h-fit
          `}
        >
          {children}
        </div>
      </div>
    );
  },
);

export default Modal;
