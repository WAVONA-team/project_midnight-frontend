import React from 'react';

import crossIcon from '@/assets/cross/cross.svg';

type Props = {
  title: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
};

const ServiceModalContent: React.FC<Props> = React.memo(
  ({ title, setIsActive, handler, className = '' }) => {
    return (
      <div className={`${className} flex flex-col`}>
        <div className="flex justify-end mb-6">
          <button
            className="active:outline-none focus:outline-none"
            onClick={() => setIsActive(false)}
          >
            <img src={crossIcon} alt="Close Modal" />
          </button>
        </div>
        <div>
          <h1 className="select-none font-semibold text-xl text-center">
            Отключить {title}?
          </h1>
        </div>
        <div className="flex mt-8 justify-between">
          <button
            onClick={() => setIsActive(false)}
            className="font-semibold text-base active:outline-none focus:outline-none"
          >
            Отмена
          </button>
          <button
            onClick={handler}
            className="font-normal text-base active:outline-none focus:outline-none"
          >
            Да, отключить
          </button>
        </div>
      </div>
    );
  },
);

export default ServiceModalContent;
