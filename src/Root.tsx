import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import App from './App';
import ConfirmationCheckPage from './pages/ConfirmationCheckPage/ConfirmationCheckPage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegistrationPage from './pages/RegistrationPage/RegistrationPage';
import RequireAuthPage from './pages/RequireAuthPage/RequireAuthPage';
import TestPage from './pages/Test/Test';

export const Root: React.FC = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="register" element={<RegistrationPage />} />

          <Route path="verify" element={<ConfirmationCheckPage />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="/" element={<RequireAuthPage />}>
            <Route index element={<HomePage />} />

            <Route path="home" element={<Navigate to="/" replace />} />

            <Route path="test" element={<TestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
