import React from 'react';

import './App.css';
import { OutlineButton } from './ui/Button';

const App: React.FC = React.memo(() => {
  return <OutlineButton title='ewew' handler={() => console.log('')} />;
});

export default App;
