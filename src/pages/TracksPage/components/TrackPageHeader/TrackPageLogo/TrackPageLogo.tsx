import React from 'react';

import logo from '@/assets/logo.svg';

const TrackPageLogo: React.FC = React.memo(() => {
  return (
    <div className="flex items-center">
      <img
        className="
              max-w-[24px]
              max-h-[28px]
            "
        src={logo}
        alt="logo"
      />
      <span className="ml-1 font-ubuntu font-medium text-base">Midnight</span>
    </div>
  );
});

export default TrackPageLogo;
