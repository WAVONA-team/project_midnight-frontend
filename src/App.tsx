import React, { ChangeEvent, useState } from 'react';
import Player from './components/player/Player';
import './App.css';

const App: React.FC = React.memo(() => {
  const [url, setUrl] = useState('');
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };
  return (
    <>
      <Player url={url}/>
      <input
        type="text"
        className='text-red-500'
        value={url}
        onChange={handleInputChange}
      />
    </>
  );
}
)

export default App;
