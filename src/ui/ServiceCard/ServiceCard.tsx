import React, { ReactNode } from 'react';

import classNames from 'classnames';

type Props = {
  title: string;
  children: ReactNode;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  state: boolean;
  className?: string;
};

const ServiceCard: React.FC<Props> = React.memo(
  ({ title, children, handler, state = false, className = '' }) => {
    return (
      <button
        type="button"
        onClick={handler}
        className={classNames(
          'font-rubik py-20 px-16  relative rounded-lg focus:outline-none cursor-pointer ',
          {
            'bg-surface-eerie_black': state,
            'bg-secondary-eerie-black-light': !state,
          },
        )}
      >
        <div className="absolute top-0 left-0 bottom-0 right-0  flex flex-col justify-evenly items-center rounded-lg">
          <div
            className={classNames(
              `text-[11px] font-normal tracking-wider ${className}`,
              {
                'text-secondary-cadet-gray': state,
                'text-on-primary-anti-flash-white ': !state,
              },
            )}
          >
            {state ? 'Подключено' : 'Подключить'}
          </div>
          {children}
          <div className="text-base font-normal text-on-primary-anti-flash-white">
            {title}
          </div>
        </div>
      </button>
    );
  },
);

export default ServiceCard;
