import React from 'react';
import { useNavigate } from 'react-router-dom';

import arrowIcon from '@/assets/arrows/arrowIcon.svg';

type Props = {
  className?: string;
};

const BackButton: React.FC<Props> = React.memo((className) => {
  const navigate = useNavigate();

  return (
    <div className="mr-2">
      <button
        onClick={() => navigate(-1)}
        className={`
        ${className}
        px-1.5
        focus:outline-none
        sm:hidden
      `}
      >
        <img src={arrowIcon} alt="Arrow Icon" />
      </button>
    </div>
  );
});

export default BackButton;
