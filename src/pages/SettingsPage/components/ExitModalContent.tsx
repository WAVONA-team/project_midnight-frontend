import React from 'react';

import crossIcon from '../../../../public/cross/cross.svg';

type Props = {
  disableModal: () => void;
  className?: string;
  exitHandler: () => void;
};

const ExitModalContent: React.FC<Props> = React.memo(
  ({ exitHandler, disableModal, className = '' }) => {
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
            className="
              active:outline-none
              focus:outline-none
            "
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
            Вы уверены, что хотите выйти?
          </h1>
        </div>

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
            <span className="text-secondary-satin-sheen-gold">Отменить</span>
          </button>

          <button
            onClick={exitHandler}
            className="
              font-normal
              text-base
              active:outline-none
              focus:outline-none
            "
          >
            Да, выйти
          </button>
        </div>
      </div>
    );
  },
);

export default ExitModalContent;
