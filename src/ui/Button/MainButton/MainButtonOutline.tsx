import React from 'react';

import { classNames } from '../classNames';

type Props = {
  title: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const MainButtonOutline: React.FC<Props> = React.memo(
  ({ title, className = '', type = 'button', disabled = false }) => {
    return (
      <button
        disabled={disabled}
        type={type}
        className={classNames.mainButtonOutlineBase + className}
      >
        {title}
      </button>
    );
  },
);

export default MainButtonOutline;
