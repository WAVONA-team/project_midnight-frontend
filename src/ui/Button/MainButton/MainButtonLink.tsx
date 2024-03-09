import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import Spinner from '../../Spinner';
import { classNamesBase } from './classNames';

type Props = {
  path: string;
  title: string;
  handler?: React.MouseEventHandler<HTMLAnchorElement>;
  className?: string;
  isLoading?: boolean;
  disabled?: boolean;
};

const MainButtonLink: React.FC<Props> = React.memo(
  ({
    path,
    title,
    handler,
    className = '',
    disabled = false,
    isLoading = false,
  }) => {
    const baseClass = classNames({
      [classNamesBase.mainButtonLink]: !isLoading,
      [classNamesBase.mainButtonLinkDisabled]: disabled,
      [classNamesBase.mainButtonLoading]: isLoading,
      [className]: true,
    });

    return (
      <Link to={path} className={baseClass} onClick={handler}>
        {isLoading ? (
          <Spinner />
        ) : (
          <div className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded bg-sub-colors-inherit ">
            {title}
          </div>
        )}
      </Link>
    );
  },
);

export default MainButtonLink;
