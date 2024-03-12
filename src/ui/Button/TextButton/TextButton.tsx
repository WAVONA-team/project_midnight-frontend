import React from 'react';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  withArrow?: boolean;
};

const TextButton: React.FC<Props> = React.memo(
  ({
    title,
    handler,
    className = '',
    type = 'button',
    disabled = false,
    withArrow = false,
  }) => {
    return (
      <button
        onClick={handler}
        disabled={disabled}
        type={type}
        className={`${classNamesBase.textButton} ${className}`}
      >
        {title}
        {withArrow && (
          <div className="ml-2">
            <svg
              width="14"
              height="8"
              viewBox="0 0 14 8"
              xmlns="http://www.w3.org/2000/svg"
              className="fill-[transparent]"
            >
              <path
                d="M13 1.00005C13 1.00005 8.58107 6.99999 6.99995 7C5.41884 7.00001 1 1 1 1"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}
      </button>
    );
  },
);

export default TextButton;
