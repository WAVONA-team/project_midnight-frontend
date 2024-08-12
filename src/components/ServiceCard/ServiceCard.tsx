import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  serviceIcon: ReactNode;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  isConnected?: boolean;
  className?: string;
  supportedTitle?: string;
};

const ServiceCard: React.FC<Props> = React.memo(
  ({
    title,
    serviceIcon,
    handler,
    isConnected = false,
    className = '',
    supportedTitle,
  }) => {
    return (
      <button
        type="button"
        onClick={handler}
        className={classNames(
          `${classNamesBase.serviceCardButton} ${supportedTitle && 'active:bg-none active:shadow-none cursor-default '} `,
          {
            'bg-surface-eerie_black  ': isConnected,
            'bg-secondary-eerie-black-light': !isConnected,
          },
        )}
      >
        <div className={classNamesBase.serviceCardConnectBox}>
          {supportedTitle ? (
            <div
              className={classNames(
                `${classNamesBase.serviceCardConnectTitle} ${className} text-secondary-cadet-gray`,
                {
                  'text-secondary-cadet-gray ': isConnected,
                  'text-on-primary-anti-flash-white ': !isConnected,
                },
              )}
            >
              {supportedTitle}
            </div>
          ) : (
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
          )}
          {serviceIcon}
          <div className={classNamesBase.serviceCardTitle}>{title}</div>
        </div>
      </button>
    );
  },
);

export default ServiceCard;
