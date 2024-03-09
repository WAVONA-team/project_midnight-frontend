import React from 'react';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const TextButton: React.FC<Props> = React.memo(
  ({ title, handler, className = '', type = 'button', disabled = false }) => {
    return (
      <button
        onClick={handler}
        disabled={disabled}
        type={type}
        className={`${classNamesBase.textButton} ${className}`}
      >
        {title}
      </button>
    );
  },
);

export default TextButton;
