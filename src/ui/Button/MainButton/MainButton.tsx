import React from 'react';

import classNames from 'classnames';

import { Spinner } from '../../Spinner';
import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
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
            className="flex justify-center items-center"
            style={{ background: 'inherit' }}
          >
            <span className="p-2">{title}</span>
          </div>
        )}
      </button>
    );
  },
);

export default MainButton;
