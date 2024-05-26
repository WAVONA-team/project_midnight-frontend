import React from 'react';
import { useNavigate } from 'react-router-dom';

import settingsIcon from '../../../../../../../public/buttons/settingsIcon.svg';
import searchIcon from '../../../../../../../public/inputs/searchIconWhite.svg';

const TrackPageActions: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden flex gap-3 justify-end">
      <button
        onClick={() => {}}
        className="active:outline-none focus:outline-none"
      >
        <img
          src={searchIcon}
          className="stroke-on-primary-anti-flash-white"
          alt="Search"
        />
      </button>

      <button
        onClick={() => navigate('/settings')}
        className="active:outline-none focus:outline-none"
      >
        <img src={settingsIcon} alt="Settings" />
      </button>
    </div>
  );
});

export default TrackPageActions;