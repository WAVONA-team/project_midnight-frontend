import React from 'react';
import { useNavigate } from 'react-router-dom';

import arrowIcon from '../../../../public/arrows/arrowIcon.svg';

type Props = {
  className?: string;
};

const BackButton: React.FC<Props> = React.memo(({ className = '' }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className={`
        ${className}
        px-1.5
        mr-2
        focus:outline-none
      `}
    >
      <img src={arrowIcon} alt="Arrow Icon" />
    </button>
  );
});

export default BackButton;
