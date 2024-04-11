import React from 'react';

type Props = {
  isModalActive: boolean;
  disableModal: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal: React.FC<Props> = React.memo(
  ({ isModalActive = false, disableModal, children, className = '' }) => {
    return (
      <div
        onClick={disableModal}
        className={`
            ${className}
            ${isModalActive ? 'opacity-1' : 'opacity-0 z-[-100]'}
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
        //box-shadow: -10px 10px 16px 0px #0C0D0B80;
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className={`
            ${isModalActive ? 'scale-100' : 'scale-0'}
            transition-all
            duration-200
            p-6
            drop-shadow-xl
            bg-surface-eerie_black
            min-w-[278px]
            max-w-fit
            min-h-[136px]
            max-h-fit
            sm:min-w-[354px]
            sm:min-h-[182px]
          `}
          style={{ boxShadow: '-10px 10px 16px 0px #0C0D0B80' }}
        >
          {children}
        </div>
      </div>
    );
  },
);

export default Modal;
