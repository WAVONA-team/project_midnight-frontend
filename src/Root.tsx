import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import {
  AddNewTrackPage,
  ConfirmationRegisterPage,
  ConfirmationResetPasswordPage, ConnectedAppsSettings,
  HomePage,
  LoginPage, PlaylistPage, PlaylistsPage,
  RegistrationPage,
  RequireAuthPage,
  ResetPasswordPage, SettingsPage,
  TestPage, TrackQueuePage,
  UpdateResetPasswordPage
} from '@/pages';

import App from './App';
import { PreloaderPage } from '@/pages/PreloaderPage/PreloaderPage.tsx';
import { TrackPage } from '@/pages/TrackPage/TrackPage.tsx';

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

            <Route path="new-track" element={<AddNewTrackPage />} />

            <Route path="connected-apps" element={<ConnectedAppsSettings />} />

            <Route path="playlist" element={<PlaylistPage />} />

            <Route path="playlists" element={<PlaylistsPage />} />

            <Route path="preload" element={<PreloaderPage />} />

            <Route path="settings" element={<SettingsPage />} />

            <Route path="track" element={<TrackPage />} />

            <Route path="track-queue" element={<TrackQueuePage />} />

            <Route path="test" element={<TestPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
});
