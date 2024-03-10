import React from 'react';
import { useStore } from '../../store/index.ts'

const LoopButton: React.FC = React.memo(({ }) => {

  const changeIsLoop = useStore((state) => state.changeIsLoop)
  const isLoop = useStore((state) => state.isLoop)

  const Loop = () => {
    changeIsLoop(!isLoop)
  };

  return (
    <div>
        <button onClick={Loop}>Loop</button>
    </div>
  );
});


export default LoopButton;
