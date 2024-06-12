import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../../../public/logo.svg';

type Props = {
  className?: string;
  logoWidth?: string;
  textSize?: string;
};

const Logo: React.FC<Props> = React.memo(
  ({
    className = '',
    logoWidth = 'w-10 lg:w-14',
    textSize = 'text-3xl lg:text-5xl',
  }) => {
    const location = useLocation();

    const checkPathname = (
      pathname: string,
      event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
      if (pathname === '/') event.preventDefault();
      if (pathname === '/login') event.preventDefault();
      if (pathname === '/register') event.preventDefault();
    };

    return (
      <Link
        onClick={(event) => checkPathname(location.pathname, event)}
        to="/tracks"
        className={`${(location.pathname === '/login' || location.pathname === '/register' || location.pathname === '/') && 'cursor-default'}`}
      >
        <div className={`${className} flex items-center gap-2`}>
          <img src={logo} alt="Logo" className={`${logoWidth}`} />

          <p
            className={`${textSize} font-ubuntu text-on-primary-anti-flash-white font-medium`}
          >
            Midnight
          </p>
        </div>
      </Link>
    );
  },
);

export default Logo;
