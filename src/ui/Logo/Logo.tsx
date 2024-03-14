import React from 'react';

import logo from '@/assets/logo.svg';

const Logo: React.FC = React.memo(() => {
  return (
    <div className="flex items-center gap-2">
      <img src={logo} alt="Logo" className="w-10 md:w-14" />

      <p className="font-ubuntu text-on-primary-anti-flash-white font-medium text-3xl md:text-5xl">
        Midnight
      </p>
    </div>
  );
});

export default Logo;
