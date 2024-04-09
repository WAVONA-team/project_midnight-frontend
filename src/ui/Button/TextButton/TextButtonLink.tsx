import React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';

import { textButtonClassNames } from '@/ui/Button/TextButton/classNames';

type Props = {
  title: string;
  path: string;
  className?: string;
  disabled?: boolean;
};

const TextButton: React.FC<Props> = React.memo(
  ({ title, path, className, disabled = false }) => {
    return (
      <Link
        className={classNames(`${className} ${textButtonClassNames.button}`, {
          'pointer-events-none text-secondary-cadet-gray': disabled,
          'pointer-events-auto text-secondary-satin-sheen-gold': !disabled,
        })}
        to={path}
      >
        {title}
      </Link>
    );
  },
);

export default TextButton;
