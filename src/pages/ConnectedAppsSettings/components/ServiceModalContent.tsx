import React from 'react';

import { Spinner } from '@/ui/Spinner';

import crossIcon from '../../../../public/cross/cross.svg';

type Props = {
  title: string | undefined;
  isLoading: boolean;
  isError: string;
  disableModal: () => void;
  disableService: () => void;
  className?: string;
};

const ServiceModalContent: React.FC<Props> = React.memo(
  ({
    title,
    isLoading = false,
    isError,
    disableModal,
    disableService,
    className = '',
  }) => {
    return (
      <div className={`${className} flex flex-col`}>
        <div
          className="
            flex
            justify-end
            mb-6
          "
        >
          <button
            className={`
            ${isLoading && 'hidden'}
              "active:outline-none
              focus:outline-none
            `}
            onClick={disableModal}
          >
            <img src={crossIcon} alt="Close Modal" />
          </button>
        </div>

        <div>
          <h1
            className="
              select-none
              font-semibold
              text-xl
              text-center
            "
          >
            Отключить {title}?
          </h1>
        </div>

        {isError ? <span className="text-primary-poppy">{isError}</span> : null}

        {isLoading ? (
          <Spinner className="mt-8" backgroundColor="bg-surface-eerie_black" />
        ) : (
          <div
            className="
              flex
              mt-8
              justify-between
            "
          >
            <button
              onClick={disableModal}
              className="
                font-semibold
                text-base
                active:outline-none
                focus:outline-none
              "
            >
              Отмена
            </button>

            {!isError && (
              <button
                onClick={disableService}
                className="
                  font-normal
                  text-base
                  active:outline-none
                  focus:outline-none
                "
              >
                Да, отключить
              </button>
            )}
          </div>
        )}
      </div>
    );
  },
);

export default ServiceModalContent;
