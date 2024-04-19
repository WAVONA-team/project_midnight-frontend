import React from 'react';

import { textButtonClassNames } from '@/ui/Button/TextButton/classNames';

type Props = {
  title: string;
  handler: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const TextButton: React.FC<Props> = React.memo(
  ({ title, handler, className, type = 'button', disabled = false }) => {
    return (
      <button
        className={`${className} ${textButtonClassNames.button} text-secondary-satin-sheen-gold`}
        disabled={disabled}
        type={type}
        onClick={handler}
      >
        {title}
      </button>
    );
  },
);

export default TextButton;
