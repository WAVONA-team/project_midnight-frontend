import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { Spinner } from '../../Spinner';
import { classNamesBase } from './classNames';

type Props = {
  path: string;
  title: string;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const MainButtonLink: React.FC<Props> = React.memo(
  ({ path, title, className = '', disabled = false, isLoading = false }) => {
    const baseClass = classNames({
      [classNamesBase.mainButtonLink]: !isLoading,
      [classNamesBase.mainButtonLinkDisabled]: disabled,
      [classNamesBase.mainButtonLoading]: isLoading,
      [className]: true,
    });

    return (
      <Link to={path} className={baseClass}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="flex justify-center items-center">
            <span>{title}</span>
          </div>
        )}
      </Link>
    );
  },
);

export default MainButtonLink;
