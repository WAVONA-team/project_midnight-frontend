import React from 'react';

import { textSecondaryClassNames } from '@/ui/Button/TextSecondaryButton/classNames';

type Props = {
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const TextSecondaryButton: React.FC<Props> = React.memo(
  ({ title, handler, className, type = 'button', disabled = false }) => {
    return (
      <button
        className={`${className} ${textSecondaryClassNames.button}`}
        disabled={disabled}
        type={type}
        onClick={handler}
      >
        {title}
      </button>
    );
  },
);

export default TextSecondaryButton;
