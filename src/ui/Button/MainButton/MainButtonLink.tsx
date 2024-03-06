import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { classNames } from '../classNames';

type Props = {
  children: ReactNode;
  path: string;
  disabled?: boolean;
};

const MainButtonLink: React.FC<Props> = React.memo(({ children, path, disabled = false }) => {
  return (
    <Link
      to={path}
      className={classNames.mainButtonLinkBase + (disabled ? ' pointer-events-none' : '')}
    >
      {children}
    </Link>
  );
});

export default MainButtonLink;
