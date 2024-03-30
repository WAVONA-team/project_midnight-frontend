import React from 'react';

import { Spinner } from '@/ui/Spinner';

import crossIcon from '@/assets/cross/cross.svg';

type Props = {
  title: string | undefined;
  isLoading: boolean;
  isError: string;
  handler: (key: boolean) => void;
  className?: string;
};

const ServiceModalContent: React.FC<Props> = React.memo(
  ({ title, isLoading, isError, handler, className = '' }) => {
    return (
      <div className={`${className} flex flex-col`}>
        <div className="flex justify-end mb-6">
          <button
            className={`${isLoading && 'hidden'} "active:outline-none focus:outline-none`}
            onClick={() => handler(false)}
          >
            <img src={crossIcon} alt="Close Modal" />
          </button>
        </div>
        <div>
          <h1 className="select-none font-semibold text-xl text-center">
            {isLoading ? 'Отключаем, подождите...' : `Отключить ${title}?`}
          </h1>
        </div>
        {isError ? <span className="text-primary-poppy">{isError}</span> : null}
        {isLoading ? (
          <Spinner className="mt-8" />
        ) : (
          <div className="flex mt-8 justify-between">
            <button
              onClick={() => handler(false)}
              className="font-semibold text-base active:outline-none focus:outline-none"
            >
              Отмена
            </button>
            <button
              onClick={() => handler(true)}
              className="font-normal text-base active:outline-none focus:outline-none"
            >
              Да, отключить
            </button>
          </div>
        )}
      </div>
    );
  },
);

export default ServiceModalContent;
