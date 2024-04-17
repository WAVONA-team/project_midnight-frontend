import React from 'react';
import { useNavigate } from 'react-router-dom';

import settingsIcon from '@/assets/buttons/settingsIcon.svg';
import searchIcon from '@/assets/inputs/searchIconWhite.svg';

type Props = {
  handler: () => void;
};

const TrackPageActions: React.FC<Props> = React.memo(({ handler }) => {
  const navigate = useNavigate();

  return (
    <div className="lg:hidden flex gap-3 justify-end">
      <button
        onClick={handler}
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
