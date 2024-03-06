import React from 'react';

import Spinner from '../../Spinner/Spinner';
import { classNames } from '../classNames';

type Props = {
  title: string;
  className?: string;
  type?: 'button' | 'submit';
  isLoading?: boolean;
  disabled?: boolean;
};

const MainButton: React.FC<Props> = React.memo(
  ({ title, className = '', type = 'button', disabled = false, isLoading = false }) => {
    return (
      <button
        disabled={disabled}
        type={type}
        className={classNames.mainButtonBase + className}
        style={{ minWidth: '70px', minHeight: '56px' }}
      >
        {isLoading ? (
          <Spinner />
        ) : (
          <div
            className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center "
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
