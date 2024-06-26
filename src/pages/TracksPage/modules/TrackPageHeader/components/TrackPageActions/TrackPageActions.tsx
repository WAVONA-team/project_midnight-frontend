import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

import settingsIcon from '../../../../../../../public/buttons/settingsIcon.svg';
import searchIcon from '../../../../../../../public/inputs/searchIconWhite.svg';

const TrackPageActions: React.FC = React.memo(() => {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden flex gap-3 justify-end">
      <Link
        to="/tracks/search"
        className="active:outline-none focus:outline-none flex"
      >
        <img
          src={searchIcon}
          className="stroke-on-primary-anti-flash-white"
          alt="Search"
        />
      </Link>

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
