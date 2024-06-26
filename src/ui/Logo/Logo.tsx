import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../../public/logo.svg';

type Props = {
  className?: string;
  logoWidth?: string;
  textSize?: string;
  directionPathname?: string;
};

const Logo: React.FC<Props> = React.memo(
  ({
    className = '',
    logoWidth = 'w-10 lg:w-14',
    textSize = 'text-3xl lg:text-5xl',
    directionPathname = '/tracks',
  }) => {
    return (
      <Link to={directionPathname}>
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
