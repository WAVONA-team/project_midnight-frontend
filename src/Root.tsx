import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';

export const Root: React.FC = React.memo(() => {
  return (
    <BrowserRouter>
      <React.StrictMode>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
          </Route>
        </Routes>
      </React.StrictMode>
    </BrowserRouter>
  );
});
