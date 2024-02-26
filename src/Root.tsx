import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  ConfirmationRegisterPage,
  ConfirmationResetPasswordPage,
  HomePage,
  LoginPage,
  RegistrationPage,
  RequireAuthPage,
  ResetPasswordPage,
  TestPage,
  UpdateResetPasswordPage,
} from '@/pages';

import App from './App';

export const Root: React.FC = React.memo(() => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="register" element={<RegistrationPage />} />

          <Route path="verify" element={<ConfirmationRegisterPage />} />

          <Route path="login" element={<LoginPage />} />

          <Route path="reset" element={<ResetPasswordPage />} />

          <Route
            path="reset-verify"
            element={<ConfirmationResetPasswordPage />}
          />

          <Route path="reset-update" element={<UpdateResetPasswordPage />} />

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
