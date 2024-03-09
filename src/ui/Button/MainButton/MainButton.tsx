import React from 'react';

import classNames from 'classnames';

import Spinner from '../../Spinner';
import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
  disabled?: boolean;
};

const MainButton: React.FC<Props> = React.memo(
  ({
    title,
    handler,
    className = '',
    type = 'button',
    disabled = false,
    isLoading = false,
  }) => {
    const baseClass = classNames({
      [classNamesBase.mainButton]: !isLoading,
      [classNamesBase.mainButtonLoading]: isLoading,
      [className]: true,
    });

    return (
      <button
        disabled={disabled}
        type={type}
        onClick={handler}
        className={baseClass}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded "
            style={{ background: 'inherit' }}
          >
            {title}
          </div>
        )}
      </button>
    );
  },
);

export default MainButton;
