import React, { Dispatch, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

import settingsIcon from '@/assets/buttons/settingsIcon.svg';
import searchIcon from '@/assets/inputs/search.svg';

type Props = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

const TrackPageActions: React.FC<Props> = React.memo(
  ({ isOpen, setIsOpen }) => {
    const navigate = useNavigate();

    return (
      <div className="lg:hidden flex gap-3 justify-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="active:outline-none focus:outline-none"
        >
          <img src={searchIcon} alt="search" />
        </button>

        <button
          onClick={() => navigate('/settings')}
          className="active:outline-none focus:outline-none"
        >
          <img src={settingsIcon} alt="Settings" />
        </button>
      </div>
    );
  },
);

export default TrackPageActions;
