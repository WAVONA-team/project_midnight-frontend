import React from 'react';

import { classNamesBase } from './classNames';

type Props = {
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
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
        <div className="absolute z-10 top-0 right-0 bottom-0 left-0 flex justify-center items-center rounded"> {title}</div>
      </button>
    );
  },
);

export default OutlineButton;
