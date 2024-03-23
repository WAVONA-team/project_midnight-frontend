import React from 'react';

import logo from '@/assets/logo.svg';

type Props = {
  className?: string;
};

const Logo: React.FC<Props> = React.memo(({ className = '' }) => {
  return (
    <div className={`${className} flex items-center gap-2`}>
      <img src={logo} alt="Logo" className="w-10 lg:w-14" />

      <p className="font-ubuntu text-on-primary-anti-flash-white font-medium text-3xl lg:text-5xl">
        Midnight
      </p>
    </div>
  );
});

export default Logo;
