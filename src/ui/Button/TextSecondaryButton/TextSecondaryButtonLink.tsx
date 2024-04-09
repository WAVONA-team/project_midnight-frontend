import React from 'react';
import { Link } from 'react-router-dom';

import { textSecondaryClassNames } from '@/ui/Button/TextSecondaryButton/classNames';

type Props = {
  title: string;
  path: string;
  className?: string;
};

const TextSecondaryButton: React.FC<Props> = React.memo(
  ({ title, path, className }) => {
    return (
      <Link className={`${className} ${textSecondaryClassNames.button}`} to={path}>
        {title}
      </Link>
    );
  },
);

export default TextSecondaryButton;
