import React from 'react';

import dots from '@/assets/buttons/playerButtons/dots.svg';

export const Dots: React.FC = React.memo(() => {
  const LoopHandler = () => {
    console.log('ok');
  };

  return (
    <div>
      <button type="button" onClick={LoopHandler}>
        <img src={dots} alt="" />
      </button>
    </div>
  );
});
