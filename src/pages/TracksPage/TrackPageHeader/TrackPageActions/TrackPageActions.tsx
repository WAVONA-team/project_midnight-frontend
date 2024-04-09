import React from 'react';

import settingsIcon from '@/assets/buttons/settingsIcon.svg';

const TrackPageActions: React.FC = React.memo(() => {
  return (
    <div className="flex gap-3">
      <button className="active:outline-none focus:outline-none">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.0415 16.041L20.1665 20.166"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.333 10.083C18.333 5.52666 14.6394 1.83301 10.083 1.83301C5.52666 1.83301 1.83301 5.52666 1.83301 10.083C1.83301 14.6394 5.52666 18.333 10.083 18.333C14.6394 18.333 18.333 14.6394 18.333 10.083Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button className="active:outline-none focus:outline-none">
        <img src={settingsIcon} alt="Settings" />
      </button>
    </div>
  );
});

export default TrackPageActions;
