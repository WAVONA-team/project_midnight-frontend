import React from 'react';

type Props = {
  children: React.ReactNode;
  trackNumber: number;
  tracks: number;
  setTrackNumber: React.Dispatch<React.SetStateAction<number>>;
};

const SkipButton: React.FC<Props> = React.memo(({ children, trackNumber, tracks, setTrackNumber }) => {
  const NextTrack = () => {
    if (trackNumber == tracks - 1) {
      return trackNumber
    }
    else {
      setTrackNumber(trackNumber + 1)
    }
  };
  const PreviosTrack = () => {
    if (trackNumber == 0) {
      return trackNumber
    }
    else {
      setTrackNumber(trackNumber - 1)
    }
  };
  return (
    <div className=' flex gap-2'>
      <button onClick={NextTrack}>Next</button>
        {children}
      <button onClick={PreviosTrack}>Previos</button>
    </div>
  );
});

export default SkipButton;
