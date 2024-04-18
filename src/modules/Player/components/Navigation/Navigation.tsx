import React from 'react';

import navigation from '@/assets/buttons/playerButtons/navigation.svg';

export const Navigation: React.FC = React.memo(() => {
  const LoopHandler = () => {
    console.log('ok');
  };

  return (
    <div>
      <button type="button" onClick={LoopHandler}>
        <img src={navigation} alt="" />
      </button>
    </div>
  );
});
