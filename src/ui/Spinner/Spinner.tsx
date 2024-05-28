import React from 'react';

import SpinnerImg from '@/../public/loader/loader.gif';

type Props = {
  width?: string;
  height?: string;
  className?: string;
};

const Spinner: React.FC<Props> = React.memo(
  ({ width = 'w-7', height = 'h-7', className = '' }) => {
    return (
      <div className={`${className} ${width} ${height}`}>
        <img src={SpinnerImg} alt="Загрузка..." />
      </div>
    );
  },
);

export default Spinner;
