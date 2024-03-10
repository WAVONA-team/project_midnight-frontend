import React from 'react';
import { useStore } from '../../store/index.ts'

type Props = {
  children: React.ReactNode;
  tracks: number;
};

const SkipButton: React.FC<Props> = React.memo(({ children, tracks}) => {

  const changeTrackNumber = useStore((state) => state.changeTrackNumber)
  var trackNumber = useStore((state) => state.trackNumber)

  const NextTrack = () => {
    if (trackNumber === tracks - 1) {
      return changeTrackNumber(trackNumber = 0)
    }
    else {
      changeTrackNumber(trackNumber + 1)
    }
  };

  const PreviosTrack = () => {
    if (trackNumber === 0) {
      return changeTrackNumber(trackNumber)
    }
    else {
      changeTrackNumber(trackNumber - 1)
    }
  };

  return (
    <div className='flex gap-2'>
      <button type='button' onClick={NextTrack}>Next</button>
        {children}
      <button type='button' onClick={PreviosTrack}>Previos</button>
    </div>
  );
});

export default SkipButton;
