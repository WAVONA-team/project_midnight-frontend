import React, { ReactNode } from 'react';

import classNames from 'classnames';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  link: string;
  serviceIcon: ReactNode;
  isConnected: boolean;
  className?: string;
};

const ServiceCardLink: React.FC<Props> = React.memo(
  ({ title, link, serviceIcon, isConnected = false, className = '' }) => {
    return (
      <a
        href={link}
        className={classNames(classNamesBase.serviceCardLink, {
          'bg-surface-eerie_black': isConnected,
          'bg-secondary-eerie-black-light': !isConnected,
        })}
      >
        <div className={classNamesBase.serviceCardConnectBox}>
          <div
            className={classNames(
              `${classNamesBase.serviceCardConnectTitle} ${className}`,
              {
                'text-secondary-cadet-gray': isConnected,
                'text-on-primary-anti-flash-white ': !isConnected,
              },
            )}
          >
            {isConnected ? 'Подключено' : 'Подключить'}
          </div>
          {serviceIcon}
          <div className={classNamesBase.serviceCardTitle}>{title}</div>
        </div>
      </a>
    );
  },
);

export default ServiceCardLink;
