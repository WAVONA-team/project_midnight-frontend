import React from 'react';

import { classNames } from '../classNames';

type Props = {
  title: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const MainButtonText: React.FC<Props> = React.memo(
  ({ title, className = '', type = 'button', disabled = false }) => {
    return (
      <button disabled={disabled} type={type} className={classNames.mainButtonTextBase + className}>
        {title}
      </button>
    );
  },
);

export default MainButtonText;
