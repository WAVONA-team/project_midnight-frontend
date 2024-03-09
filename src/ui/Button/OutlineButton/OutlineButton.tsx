import React from 'react';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const OutlineButton: React.FC<Props> = React.memo(
  ({ title, handler, className = '', type = 'button', disabled = false }) => {
    return (
      <button
        onClick={handler}
        disabled={disabled}
        type={type}
        className={`${classNamesBase.outlineButton} ${className}`}
      >
        {title}
      </button>
    );
  },
);

export default OutlineButton;
