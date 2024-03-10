import React from 'react';

import VolumeChanger from '../../Components/VolumeChanger';
import PlayButton from '../../Components/PlayButton';
import SkipButton from '../../Components/SkipButton';
import LoopButton from '../../Components/LoopButton'
import TimeRange from '../../Components/TimeRange';
import TrackInfo from '../../Components/TrackInfo';

type Props = {
  tracks: string[];
};

const PlayerControls: React.FC<Props> = React.memo(({tracks}) => {

  return (
    <div className='bg-red-200 flex gap-3'>
      <VolumeChanger/>
      <SkipButton tracks={tracks.length}>
        <PlayButton/>
      </SkipButton>
      <TimeRange/>
      <TrackInfo name='The Zephyr song' artist='Red Hot Chili Peppers' provider='YouTube'/>
      <LoopButton/>
    </div>
  );
});

export default PlayerControls;
