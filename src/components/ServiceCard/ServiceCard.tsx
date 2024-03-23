import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  serviceIcon: ReactNode;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  isConnected: boolean;
  className?: string;
};

const ServiceCard: React.FC<Props> = React.memo(
  ({ title, serviceIcon, handler, isConnected = false, className = '' }) => {
    return (
      <button
        type="button"
        onClick={handler}
        className={classNames(classNamesBase.serviceCardButton, {
          'bg-surface-eerie_black  ': isConnected,
          'bg-secondary-eerie-black-light': !isConnected,
        })}
      >
        <div className={classNamesBase.serviceCardConnectBox}>
          <div
            className={classNames(
              `${classNamesBase.serviceCardConnectTitle} ${className}`,
              {
                'text-secondary-cadet-gray ': isConnected,
                'text-on-primary-anti-flash-white ': !isConnected,
              },
            )}
          >
            {isConnected ? 'Отключить' : 'Подключить'}
          </div>
          {serviceIcon}
          <div className={classNamesBase.serviceCardTitle}>{title}</div>
        </div>
      </button>
    );
  },
);

export default ServiceCard;
